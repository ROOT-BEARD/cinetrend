import { Button, Card, Typography } from "@heroui/react";
import MovieCard from "../MovieCard";
import { useState } from "react";
import type { NewSearch, SearchRecord } from "../types/database";
import { searchSerive } from "../services/searchService";

export default function Dashboard(){
    const [searches, setSearches] = useState<SearchRecord[]>([]);

    const getSearches = async() => {
        const data = await searchSerive.getRecentSearches(2);
        setSearches(data);
    }

    return(
        <div className="w-full h-full flex flex-col overflow-hidden">
            <Card className="h-100 w-full">
                <Button onClick={getSearches}/>
                {searches.map((search) =>(
                <Card key={search.created_at}>
                    {search.search_query}
                </Card>
                ))}
            </Card>
            <Typography type="h3" className="p-5">RECOMMENDATIONS</Typography>
            <div className="h-full w-full
                    flex flex-wrap pb-8
                    gap-8 justify-center">
                <MovieCard
                title={"Name"}
                description={"in this movie this is what happens n such"}
                releaseYear={"2006"}
                director={"Alden Wyatt"}
                cast={"bob jack"}/>
                <MovieCard
                title={"Name"}
                description={"in this movie this is what happens n such"}
                releaseYear={"2006"}
                director={"Alden Wyatt"}
                cast={"bob jack"}/>
                <MovieCard
                title={"Name"}
                description={"in this movie this is what happens n such"}
                releaseYear={"2006"}
                director={"Alden Wyatt"}
                cast={"bob jack"}/>
                <MovieCard
                title={"Name"}
                description={"in this movie this is what happens n such"}
                releaseYear={"2006"}
                director={"Alden Wyatt"}
                cast={"bob jack"}/>
            </div>
        </div>
    );
}