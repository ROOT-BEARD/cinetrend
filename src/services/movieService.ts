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
            genre:string, country:string, releaseYear:string): Promise<NewMovie[]>{
        let query = supabase
        .from("media_catalog")
        .select("*")
        .limit(20);

        if(title.length > 0){
            query = query.ilike('title', `%${title}%`)
        }
        if(type != 'All'){
            query = query.eq('type', type);
        }
        if(director.length > 0){
            query = query.ilike('director', `%${director.trim()}%`);
        }
        if(rating != 'All'){
            query = query.eq('rating', rating);
        }
        if(genre != 'All'){
            query = query.ilike('listed_in', `%${genre}%`);
        }
        if(country != 'All'){
            query = query.eq    ('country', country);
        }
        if(releaseYear.length > 0){
            query = query.eq('release_year', releaseYear);
        }

        const {data, error} = await query;
        if(error) console.error("error getting movies " + error.message);

        return data ?? [];
    },
    async getRecommendations(searches:SearchRecord[]): Promise<NewMovie[]>{
        const titles = [...new Set(searches.map((s)=>s.search_query).filter(Boolean))];
        const orFilters = [
            ...titles.map((t)=> `title.ilike.%${t}%`),
        ];

        if(orFilters.length === 0) return [];

        let query = supabase
        .from("media_catalog")
        .select("*")
        .or(orFilters.join(','))
        .limit(10);

        const {data, error} = await query;
        if(error) console.error("error getting recommendations: ", error.message);
        
        return data??[];
    }
};
