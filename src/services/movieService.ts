import type { NewMovie, SearchRecord } from "../types/database";
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
    async getMoviesByString(title:string, type:string, director:string, rating:string,
            genre:string, country:string, releaseYear:string, page:number, pageSize:number): Promise<NewMovie[]>{
        
        const startOffset = (page - 1) * pageSize;
        const endOffset = page * pageSize - 1;

        let query = supabase
        .from("media_catalog")
        .select("*");

        if(title.length > 0){
            query = query.filter('title', 'imatch',`\\y${title}\\y`)
        }
        if(type != null){
            query = query.eq('type', type);
        }
        if(director.length > 0){
            query = query.ilike('director', `%${director.trim()}%`);
        }
        if(rating != null){
            query = query.eq('rating', rating);
        }
        if(genre != null){
            query = query.ilike('listed_in', `%${genre}%`);
        }
        if(country != null){
            query = query.eq('country', country);
        }
        if(releaseYear.length > 0){
            query = query.eq('release_year', releaseYear);
        }

        query = query
        .order('show_id', { ascending: true })
        .range(startOffset, endOffset);

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

        //if(orFiltersGroup1.length === 0) return [];

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
