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
    async getRecentSearches(count:number, uid:string):Promise<SearchRecord[]>{
        const {data, error} = await supabase
        .from("searches")
        .select("*")
        .eq("uid", uid)
        .limit(count)
        .order('created_at', {ascending:false});

        if(error) console.error("Error getting searches ", error.message);

        return data??[];
    }
}