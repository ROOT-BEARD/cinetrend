import type { NewMovie, NewSearch, SearchRecord } from "../types/database";
import { supabase } from "../supabase-client";

export const movieService = {
    //gets the movie based on search, and or booleans, page number, and page size
    async getMoviesByString(search:NewSearch, page:number, pageSize:number, genreAnd:boolean,
        countryAnd:boolean, directorAnd:boolean, castAnd:boolean, keywords:string): Promise<NewMovie[]>{
        /* gets the start to search at, whcih is the page - 1, to make it 0 indexed, * the page amount
        for example, page 1 with a pagesize of 8, start at 0, and get an end offest of 8, page 2 will have a
        start of 8 and end of 16 */ 
        const startOffset = (page - 1) * pageSize;
        const endOffset = page * pageSize - 1;
        
        //splits at (','), trim excess spaces, and get rid of empty list with count of 1 for each string, to get arrays
        const directorList:string[] = search.director?.split(",").map((d)=>d.trim()).filter(Boolean) ?? [];
        const castList:string[] = search.cast_query?.split(",").map((d)=>d.trim()).filter(Boolean) ?? [];
        const genreList:string[] = search.genre?.split(",").map((d)=>d.trim()).filter(Boolean) ?? [];
        const countryList:string[] = search.country?.split(",").map((d)=>d.trim()).filter(Boolean) ?? [];
        const ratingList:string[] = search.rating?.split(",").map((d)=>d.trim()).filter(Boolean) ?? [];
        const keywordList:string[] = keywords?.split(",").map((k)=>k.trim()).filter(Boolean) ?? [];
        
        //used to store the or reuqirments that will be added to the query
        const orGroups: string[] = [];
        //create base query, fetching from the media_catalog
        let query = supabase
        .from("media_catalog")
        .select("*");
        //if there is a search_query and it's length is greater then 0
        if(search.search_query && search.search_query?.length > 0){
            //filter the query to have the title that has search_query within it
            query = query.filter('title', 'imatch',`\\y${search.search_query}\\y`)
        }
        //check if type, and if it is not equal to All
        if(search.type && search.type != "All"){
            //make the query look for rows with the search type
            query = query.eq('type', search.type);
        }
        //if there is a realse year entered, filter by the release year
        if(search.release_year){
            query = query.eq('release_year', search.release_year);
        }

        // !!!!GENRELIST!!!!
        //check if the genrelist is greater than 0
        if(genreList.length > 0){
            //if genreAnd, then add each element to the query with ilike
            // ilike will look at substring as will
            if(genreAnd){
                genreList.forEach((g) => (query = query.ilike('listed_in', `%${g}%`)));
            } else {
                //other wise, add ilike.genre for each genre to the or filters
                const filters = [...new Set(genreList.filter(Boolean))].map((g)=>`listed_in.ilike.%${g}%`);
                orGroups.push(`or(${filters.join(",")})`);
            }
        }
        // refer to GENRELIST
        if(countryList.length > 0){
            if(countryAnd){
                countryList.forEach((c) => (query = query.ilike('country', `%${c}%`)));
            } else {
                const filters = [...new Set(countryList.filter(Boolean))].map((c)=>`country.ilike.%${c}%`);
                orGroups.push(`or(${filters.join(",")})`);
            }
        }
        // refer to GENRELIST
        if(directorList.length > 0){
            if(directorAnd){
                directorList.forEach((d) => (query = query.ilike('director', `%${d}%`)));
            } else {
                const filters = [...new Set(directorList.filter(Boolean))].map((d)=>`director.ilike.%${d}%`);
                orGroups.push(`or(${filters.join(",")})`);
            }
        }
        // refer to GENRELIST
        if(castList.length > 0){
            if(castAnd){
                castList.forEach((c) => (query = query.ilike('cast', `%${c}%`)));
            } else {
                const filters = [...new Set(castList.filter(Boolean))].map((c)=>`cast.ilike.%${c}%`);
                orGroups.push(`or(${filters.join(",")})`);
            }
        }
        if(keywordList.length > 0){
            const filters = [...new Set(keywordList.filter(Boolean))].map((k)=>`description.ilike.%${k}%`);
            orGroups.push(`or(${filters.join(",")})`);
        }
        //if the rating is enterd
        if(ratingList.length > 0){
            // then check if the rating is in the query
            query = query.in("rating", ratingList);
        }

        /**order the query by ascending show_id,
         * to ensure non repearing titles when
         * loading new pages, set the range to the
         * proper start and end offset based on the
         * page size
         */
        query = query
        .order('show_id', { ascending: true })
        .range(startOffset, endOffset);
        
        //add the or qurty if the orgroups is greater than 0
        if(orGroups.length > 0){
            /**the query will have each ilike or group joined
             * into one long or filter.
             */
            query = query.or(`and(${orGroups.join(',')})`);
        }
        //gets the data
        const {data, error} = await query;
        //returns an error message if failed
        if(error) console.error("error getting movies " + error.message);
        //return the data, if nothing matchs, an empty array
        return data ?? [];
    },
    //gets 'count' movie reccommendations based on passed in searches
    async getRecommendations(searches:SearchRecord[], count:number): Promise<NewMovie[]>{
        //maps the parameters into arrays
        const titles = [...new Set(searches.map((s)=>s.search_query).filter(Boolean))];
        const cast = [...new Set(searches.map((c)=>c.cast_query).filter(Boolean))];
        const directors = [...new Set(searches.flatMap((c)=>c.director?.split(',')).filter(Boolean))];
        const release_year = [...new Set(searches.map((r)=>r.release_year).filter(Boolean))];
        const genres = [...new Set(searches.flatMap((s)=>s.genre?.split(',')).filter(Boolean))];

        
        /*creates the first group, two groups are used to try
         and keep one paremeter to overpower the rest*/
        const orFiltersGroup1 = [
            ...titles.map((t)=> `title.imatch.\\y${t}\\y`),
            ...genres.map((g)=> `listed_in.ilike.%${g}%`),
            ...cast.map((c) => `cast.imatch.\\y${c}\\y`),  
        ];
        //creates the second group
        const orFiltersGroup2 = [
            ...directors.map((d)=> `director.ilike.%${d}%`),
            ...release_year.map((r)=> `release_year.eq.${r}`),
        ];

        //gets the first half
        const {data: data1, error: error1} = await supabase
        .from("media_catalog")
        .select("*")
        .or(orFiltersGroup1.join(','))
        .limit(count/2);
        //if there is an error displays the error
        if(error1) console.error("error getting recommendations: ", error1.message);
        //gets the second half
        const {data: data2, error: error2} = await supabase
        .from("media_catalog")
        .select("*")
        .or(orFiltersGroup2.join(','))
        .limit(count/2);
        //if there is an error log the error
        if(error2) console.error("error getting recommendations: ", error2.message);
        
        //create the data which equal to data1 + data2
        const data = [...(data1 ?? []), ...(data2 ?? [])];

        // return the data, or empty array if data is not populated
        return data ?? [];
    }
};
