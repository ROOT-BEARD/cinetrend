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
        async getMoviesByString(input:string): Promise<NewMovie[]>{
        const {data, error} = await supabase
        .from("media_catalog")
        .select("*")
        .ilike('title', `%${input}%`)
        .limit(10);

        if(error) console.error("error getting movies " + error.message);

        return data ?? [];
    }
};
