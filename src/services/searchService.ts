import { supabase } from "../supabase-client";
import type { NewSearch, SearchData, SearchRecord } from "../types/database";

// adds a search to the database
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
    // Gets the most recent searches with a limit of count, and with the users userid 
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
    /*gets the 'amount' most searched for actors within the past 'timeRange' months*/
    async getMostSearchedActors(amount:number, timeRange:number):Promise<SearchData[]>{
        //gets the current date
        const endDate: Date = new Date();
        //sets the date to the current month minus the passed in month count
        endDate.setMonth(endDate.getMonth() - timeRange);
        
        //gets the cast_query rows from searches where created at is greater then the endDate
        const {data, error} = await supabase
        .from("searches")
        .select("cast_query")
        .gte("created_at", endDate.toISOString());
        
        // display error if fecthing data failed
        if(error){
            console.log("error getting actors:", error.message);
        }

        //hashmap to count amount of time actors were searched for
        const counts = new Map<string, number>();

        //loops for each row from the data
        for(const row of data??[]){
            //spits the actors into an array, splititng at ',', triming, and only adding splits which contain chartacters
            const actors = row.cast_query.split(",").map((a : string) => a.trim()).filter(Boolean) ?? [];
            // for each actor in the new array
            for(const actor of actors){
                //get the lowercase name
                const lower = actor.toLowerCase();
                //add count to hashmap for the lowercase name of the actor
                counts.set(lower, (counts.get(actor) ?? 0) + 1);
            }
        }
        /*creates and returns a new array from
        the hashmap count, sorting by the count, and then
        splicing it from 0 to amount, to the the top 'amount'
        of searched for actors */
        return Array.from(counts.entries())
        .sort((a, b)=>b[1]-a[1])
        .map(([name, count]) => ({name:name, searches:count})).splice(0,amount);
    },
    //refer to getMostSearchedActors for understanding
    async getMostSearchedGenres(amount:number, timeRange:number):Promise<SearchData[]>{
        const endDate: Date = new Date();
        endDate.setMonth(endDate.getMonth() - timeRange);

        const {data, error} = await supabase
        .from("searches")
        .select("genre")
        .gte("created_at", endDate.toISOString());

        if(error){
            console.log("error getting genres:", error.message);
        }
        
        const counts = new Map<string, number>();

        for(const row of data??[]){
            const genres = row.genre.split(",").map((a : string) => a.trim()).filter(Boolean) ?? [];

            for(const genre of genres){
                counts.set(genre, (counts.get(genre) ?? 0) + 1);
            }
        }

        return Array.from(counts.entries())
        .sort((a, b)=>b[1]-a[1])
        .map(([genre, count]) => ({name:genre, searches:count})).splice(0, amount);        
    },
    //refer to getMostSearchedActors for understanding
    async getMostSearchedDirectors(amount:number, timeRange:number):Promise<SearchData[]>{
        const endDate: Date = new Date();
        endDate.setMonth(endDate.getMonth() - timeRange);

        const {data, error} = await supabase
        .from("searches")
        .select("director")
        .gte("created_at", endDate.toISOString());
        
        if(error){
            console.log("error getting directors:", error.message);
        }

        const counts = new Map<string, number>();

        for(const row of data??[]){
            const directors = row.director.split(",").map((a : string) => a.trim()).filter(Boolean) ?? [];

            for(const director of directors){
                const lower = director.toLowerCase();
                counts.set(lower, (counts.get(lower) ?? 0) + 1);
            }
        }

        return Array.from(counts.entries())
        .sort((a, b)=>b[1]-a[1])
        .map(([director, count]) => ({name:director, searches:count})).splice(0, amount);        
    }
}