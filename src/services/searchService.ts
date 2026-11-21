import { supabase } from "../supabase-client";
import type { NewSearch, SearchData, SearchRecord } from "../types/database";

export const searchSerive = {
    async addSearch(search:NewSearch):Promise<SearchRecord>{
        const {data, error} = await supabase
        .from("searches")
        .insert(search)
        .select()
        .single()

        if(error) console.error("Error adding search", error.message)

        return data;
    },
    async getRecentSearches(count:number, uid:string):Promise<SearchRecord[]>{
        const {data, error} = await supabase
        .from("searches")
        .select("*")
        .eq("uid", uid)
        .limit(count)
        .order('created_at', {ascending:false});

        if(error) console.error("Error getting searches ", error.message);

        return data??[];
    },
    async getMostSearchedActors():Promise<SearchData[]>{
        const {data, error} = await supabase
        .from("searches")
        .select("cast_query");
        
        const counts = new Map<string, number>();

        for(const row of data??[]){
            const actors = row.cast_query.split(",").map((a : string) => a.trim()).filter(Boolean) ?? [];

            for(const actor of actors){
                const lower = actor.toLowerCase();
                counts.set(lower, (counts.get(actor) ?? 0) + 1);
            }
        }

        counts.forEach((count,key) => {
            console.log(`${key}: ${count}`);
        });

        return Array.from(counts.entries())
        .sort((a, b)=>b[1]-a[1])
        .map(([name, count]) => ({name:name, searches:count})).splice(0,5);
    },
    async getMostSearchedGenres():Promise<SearchData[]>{
        const {data, error} = await supabase
        .from("searches")
        .select("genre");
        
        const counts = new Map<string, number>();

        for(const row of data??[]){
            const genres = row.genre.split(",").map((a : string) => a.trim()).filter(Boolean) ?? [];

            for(const actor of genres){
                counts.set(actor, (counts.get(actor) ?? 0) + 1);
            }
        }

        counts.forEach((count,key) => {
            console.log(`${key}: ${count}`);
        });

        return Array.from(counts.entries())
        .sort((a, b)=>b[1]-a[1])
        .map(([genre, count]) => ({name:genre, searches:count})).splice(0, 5);        
    }
}