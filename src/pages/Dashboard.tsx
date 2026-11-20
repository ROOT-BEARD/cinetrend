import { Card, Typography } from "@heroui/react";
import MovieCard from "../componets/MovieCard";
import { useEffect, useState } from "react";
import type { NewMovie, SearchRecord } from "../types/database";
import { searchSerive } from "../services/searchService";
import { useUser } from "../contexts/UserContext";
import { movieService } from "../services/movieService";
import MovieDrawer from "../componets/MovieDrawer";

export default function Dashboard(){
    const {user} = useUser();
    const [searches, setSearches] = useState<SearchRecord[]>([]);
    const [recommendations, setRecommendations] = useState<NewMovie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<NewMovie|null>(null);  

    const getSearches = async() => {
        if(user?.id == null) return;
        const data = await searchSerive.getRecentSearches(5, user.id);
        setSearches(data);
        getRecommendations();
    }

    const getRecommendations = async() => {
        if(user?.id == null || searches.length <= 0) return;
        const data = await movieService.getRecommendations(searches, 18);
        setRecommendations(data);
    }

    useEffect(()=>{
        if(searches.length <= 0) getSearches()
        else getRecommendations();
    },[user?.id, searches]);

    return(
        <div className="w-full h-full flex flex-col overflow-hidden">
            <MovieDrawer
                movie={selectedMovie}
                opened={selectedMovie !== null}
                handleClose={(isOpen) => {
                    if(!isOpen) setSelectedMovie(null);
                }}
            />
            <Card className="h-100 w-full flex justify-center items-center">
                <Typography className="text-accent" type="h1">WELCOME TO CINETREND</Typography>
            </Card>
            <Typography type="h3" className="p-5">RECOMMENDATIONS</Typography>
            <div className="h-full w-full
                    flex flex-wrap pb-8
                    gap-8 justify-center">
                {recommendations.map((m)=>(
                    <MovieCard
                        handleClick={()=>setSelectedMovie(m)}
                        movie={m}
                    />
                ))}
            </div>
        </div>
    );
}