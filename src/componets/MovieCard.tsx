import { Card, Typography } from "@heroui/react";
import type { NewMovie } from "../types/database";

export default function MovieCard({movie,handleClick}:{movie:NewMovie,handleClick:()=>void|null}){
    
    const genreList = () => {
        if(!movie?.listed_in) return;
        const tokens:string[] = movie?.listed_in?.split(',');
        if(tokens == null) return;
        return(
            tokens.map((genre)=>(
                <Typography key={genre} type="code"> 
                    {genre}
                </Typography>
            ))
        );
    };

    return(
        <Card
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.00)")}
        onClick={handleClick ?? undefined} className='self-center w-sm h-125 gap-6 p-10' variant='default'>
            <div className="w-full h-full flex flex-col items-between">
                <div className="w-full h-full flex flex-col">
                    <Typography type='h1'>
                        {movie.title}
                    </Typography>
                    <div className="w-full flex flex-row justify-between">
                        <Typography type='h5'>
                            {movie.director}
                        </Typography>
                        <Typography type='h6'>
                            {movie.release_year}
                        </Typography>
                    </div>
                    <div className="gap-1 pb-2 w-full flex flex-wrap">{genreList()}</div>
                    <Typography type='body'>
                        {movie.description.length <= 200 ? movie.description : movie.description.slice(0, 200) + "..."}
                    </Typography>
                </div>
                <div>
                    <Typography>
                        {movie.cast && (
                        movie.cast.length <= 150 ? movie.cast : `${movie.cast.slice(0, 150)}...`
                        )}
                    </Typography>
                </div>
            </div>
        </Card>
    );
}