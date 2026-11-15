import { Card, Typography } from "@heroui/react";

export default function MovieCard({title,description,releaseYear,director,cast,handleClick}:
    {title:string, description:string, releaseYear:string, director:string, cast:string,handleClick:()=>void|null}){
    return(
        <Card onClick={handleClick ?? undefined} className='self-center w-sm h-125 gap-6 p-10 hover:scale-[1.01]' variant='tertiary'>
            <div className="w-full h-full flex flex-col items-between">
                <div className="w-full h-full flex flex-col">
                    <Typography type='h1'>
                        {title}
                    </Typography>
                    <div className="pb-5 w-full flex flex-row justify-between">
                        <Typography type='h5'>
                            {director}
                        </Typography>
                        <Typography type='h6'>
                            {releaseYear}
                        </Typography>
                    </div>
                    <Typography type='body'>
                        {description.length <= 200 ? description : description.slice(0, 200) + "..."}
                    </Typography>
                </div>
                <div>
                    <Typography>
                        {cast.length <= 150 ? cast : cast.slice(0, 150) + "..."}
                    </Typography>
                </div>
            </div>
        </Card>
    );
}