import { supabase } from "../supabase-client";
import type { NewSearch, SearchRecord } from "../types/database";

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
    async getRecentSearches(count:number):Promise<SearchRecord[]>{
        const {data, error} = await supabase
        .from("searches")
        .select("*")
        .limit(count);
        //add a user id eq to check for only a certain users searches

        if(error) console.error("Error getting searches ", error.message);

        return data??[];
    }
}