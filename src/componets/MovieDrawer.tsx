import { Card, Drawer, Typography } from "@heroui/react";
import type { NewMovie } from "../types/database";

export default function MovieDrawer({opened, handleClose, movie}:{opened:boolean, handleClose:(isOpen:boolean)=>void, movie:NewMovie|null}){

    /*list out all of the genres of a movie in cards, by spliting the listed_in
    list by the commas. */
    const genreList = () => {
        //if not move, or not tokens from splitting the listed_in list, return
        if(!movie?.listed_in) return;
        const tokens:string[] = movie?.listed_in?.split(',');
        if(tokens == null) return;
        return(
            tokens.map((genre)=>(
                <Card key={genre} variant="secondary"> 
                    {genre}
                </Card>
            ))
        );
    };
    //maps the cast to a buanch of cards
    const castList = () => {
        //if not cast, or not tokens from splitting cast, return
        if(!movie?.cast) return;
        const tokens:string[] = movie?.cast?.split(',');
        if(tokens == null) return;
        return(
            tokens.map((cast)=>(
                <Card key={cast} variant="secondary"> 
                    {cast}
                </Card>
            ))
        );
    };
    
    return(
        //isOpen is = to the passed in open varibe, calls handleclose when closed
        <Drawer isOpen={opened} onOpenChange={handleClose}>
            <Drawer.Backdrop>
                <Drawer.Content placement="bottom">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger/>
                        <Drawer.Body className="m-0 md:m-2 pl-10 h-screen w-full justify-center flex flex-row">
                            <div className="h-full w-full overflow-y-auto">
                            <Typography className="pb-3" type="h1">{movie?.title}</Typography>
                            {/* Lists out the type, rating, date_added, release year, duration, and countries of a movie */}
                            <div className="pb-3 w-full flex flex-wrap gap-x-3 gap-y-2">
                                <Typography type="code">
                                    Type: {movie?.type}
                                </Typography>
                                <Typography type="code">
                                    Rating: {movie?.rating}
                                </Typography>
                                <Typography type="code">
                                    Date Added: {movie?.date_added}
                                </Typography>
                                <Typography type="code">
                                    Release Year: {movie?.release_year}
                                </Typography>
                                <Typography type="code">
                                    Duration: {movie?.duration}
                                </Typography>
                                <Typography type="code">
                                    Country: {movie?.country}
                                </Typography>
                            {/* displays the directors, description, genres, and cast of the movie */}
                            </div>
                                <Typography type="h5">
                                    Directed by: {movie?.director != null ? movie.director : "unknown"}
                                </Typography>
                                <Typography className="pt-5">
                                    {movie?.description}
                                </Typography>
                                {movie?.listed_in ? (<Typography type="h5" className="pt-5 pb-2">Genres:</Typography>) : (<></>)}
                                <div className="flex flex-wrap gap-2 overflow-y-auto">
                                    {genreList != null ? genreList() : <></>}
                                </div>
                                {movie?.cast ? (<Typography type="h5" className="pt-5 pb-2">Cast:</Typography>) : (<></>)}
                                <div className="flex flex-wrap gap-2">
                                    {castList != null ? castList() : <></>}
                                </div>
                            </div>
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
}