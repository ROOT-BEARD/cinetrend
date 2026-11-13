import type { NewMovie } from "../types/database";
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
        async getMoviesByString(input:string, type:string, director:string): Promise<NewMovie[]>{
        let query = supabase
        .from("media_catalog")
        .select("*")
        .ilike('title', `%${input}%`)
        .limit(20);

        if(type != '*'){
            query = query.eq('type', type);
        }
        if(director != ''){
            query = query.ilike('director', `director.ilike.${director.trim()},director.ilike.${clean}, %,director.ilike.%, ${clean},director.ilike.%, ${clean}, %`);
        }

        const {data, error} = await query;
        if(error) console.error("error getting movies " + error.message);

        return data ?? [];
    }
};
