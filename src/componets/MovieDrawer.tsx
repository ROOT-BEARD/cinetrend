import { Card, Drawer, Typography } from "@heroui/react";
import type { NewMovie } from "../types/database";

export default function MovieDrawer({opened, handleClose, movie}:{opened:boolean, handleClose:(isOpen:boolean)=>void, movie:NewMovie|null}){
    
    const genreList = () => {
        if(!movie?.listed_in) return;
        const tokens:string[] = movie?.listed_in?.split(',');
        if(tokens == null) return;
        return(
            tokens.map((genre)=>(
                <Card variant="secondary"> 
                    {genre}
                </Card>
            ))
        );
    };

    const castList = () => {
        if(!movie?.cast) return;
        const tokens:string[] = movie?.cast?.split(',');
        if(tokens == null) return;
        return(
            tokens.map((genre)=>(
                <Card variant="secondary"> 
                    {genre}
                </Card>
            ))
        );
    };
    
    return(
        <Drawer isOpen={opened} onOpenChange={handleClose}>
            <Drawer.Backdrop>
                <Drawer.Content placement="bottom">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger/>
                        <Drawer.Header>
                            <Drawer.Heading><Typography type="h1">{movie?.title}</Typography></Drawer.Heading>
                        </Drawer.Header>
                        <Drawer.Body className="w-full justify-center flex flex-row gap-12 overflow-y-hidden">
                            <div className="h-screen w-full">
                                <Typography type="body-sm">
                                    {movie?.director}
                                </Typography>
                                <Typography className="pt-5">
                                    {movie?.description}
                                </Typography>
                                <Typography type="h5" className="pt-5 pb-2">Genres:</Typography>
                                <div className="flex flex-wrap gap-2">
                                    {genreList != null ? genreList() : <></>}
                                </div>
                                <Typography type="h5" className="pt-5 pb-2">Cast:</Typography>
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