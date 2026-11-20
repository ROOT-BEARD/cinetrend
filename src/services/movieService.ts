import type { NewMovie, NewSearch, SearchRecord } from "../types/database";
import { supabase } from "../supabase-client";

export const movieService = {
    async getFirstMovies(): Promise<NewMovie[]>{
        const {data, error} = await supabase
        .from("media_catalog")
        .select("*")
        .limit(10);

        if(error) console.error("error getting movies " + error.message);

        return data ?? [];
    },
    async getMoviesByString(search:NewSearch, page:number, pageSize:number,
        genreAnd:boolean, countryAnd:boolean, directorAnd:boolean, castAnd:boolean): Promise<NewMovie[]>{
        const startOffset = (page - 1) * pageSize;
        const endOffset = page * pageSize - 1;        
        const directorList:string[] = search.director?.split(",").map((d)=>d.trim()).filter(Boolean) ?? [];
        const castList:string[] = search.cast_query?.split(",").map((d)=>d.trim()).filter(Boolean) ?? [];
        const genreList:string[] = search.genre?.split(",").map((d)=>d.trim()).filter(Boolean) ?? [];
        const countryList:string[] = search.country?.split(",").map((d)=>d.trim()).filter(Boolean) ?? [];
        const ratingList:string[] = search.rating?.split(",").map((d)=>d.trim()).filter(Boolean) ?? [];
        
        const andGroups: string[] = [];

        let query = supabase
        .from("media_catalog")
        .select("*");

        if(search.search_query && search.search_query?.length > 0){
            query = query.filter('title', 'imatch',`\\y${search.search_query}\\y`)
        }
        if(search.type != null){
            query = query.eq('type', search.type);
        }
        if(search.release_year){
            query = query.eq('release_year', search.release_year);
        }

        if(genreList.length > 0){
            if(genreAnd){
                genreList.forEach((g) => (query = query.ilike('listed_in', `%${g}%`)));
            } else {
                const filters = [...new Set(genreList.filter(Boolean))].map((g)=>`listed_in.ilike.%${g}%`);
                andGroups.push(`or(${filters.join(",")})`);
            }
        }
        if(countryList.length > 0){
            if(countryAnd){
                countryList.forEach((c) => (query = query.ilike('country', `%${c}%`)));
            } else {
                const filters = [...new Set(countryList.filter(Boolean))].map((c)=>`country.ilike.%${c}%`);
                andGroups.push(`or(${filters.join(",")})`);
            }
        }
        if(directorList.length > 0){
            if(directorAnd){
                directorList.forEach((d) => (query = query.ilike('director', `%${d}%`)));
            } else {
                const filters = [...new Set(directorList.filter(Boolean))].map((d)=>`director.ilike.%${d}%`);
                andGroups.push(`or(${filters.join(",")})`);
            }
        }
        if(castList.length > 0){
            if(castAnd){
                castList.forEach((c) => (query = query.ilike('cast', `%${c}%`)));
            } else {
                const filters = [...new Set(castList.filter(Boolean))].map((c)=>`cast.ilike.%${c}%`);
                andGroups.push(`or(${filters.join(",")})`);
            }
        }
        if(ratingList.length > 0){
            query = query.in("rating", ratingList);
        }

        query = query
        .order('show_id', { ascending: true })
        .range(startOffset, endOffset);
        
        if(andGroups.length > 0){
            query = query.or(`and(${andGroups.join(',')})`);
        }

        const {data, error} = await query;
        if(error) console.error("error getting movies " + error.message);

        return data ?? [];
    },
    async getRecommendations(searches:SearchRecord[], count:number): Promise<NewMovie[]>{
        const titles = [...new Set(searches.map((s)=>s.search_query).filter(Boolean))];
        const cast = [...new Set(searches.map((c)=>c.cast_query).filter(Boolean))];
        const directors = [...new Set(searches.map((c)=>c.director).filter(Boolean))];
        const release_year = [...new Set(searches.map((r)=>r.release_year).filter(Boolean))];
        const genres = [...new Set(searches.map((s)=>s.genre).filter(Boolean))];

        const orFiltersGroup1 = [
            ...titles.map((t)=> `title.imatch.\\y${t}\\y`),
            ...directors.map((d)=> `director.ilike.%${d}%`),
            ...cast.map((c) => `cast.imatch.\\y${c}\\y`),  
        ];

        const orFiltersGroup2 = [
            ...genres.map((g)=> `listed_in.ilike.%${g}%`),
            ...release_year.map((r)=> `release_year.eq.${r}`),
        ];

        const {data: data1, error: error1} = await supabase
        .from("media_catalog")
        .select("*")
        .or(orFiltersGroup1.join(','))
        .limit(count/2);

        if(error1) console.error("error getting recommendations: ", error1.message);

        const {data: data2, error: error2} = await supabase
        .from("media_catalog")
        .select("*")
        .or(orFiltersGroup2.join(','))
        .limit(count/2);

        if(error2) console.error("error getting recommendations: ", error2.message);
        
        const data = [...(data1 ?? []), ...(data2 ?? [])];

        return data ?? [];
    }
};
