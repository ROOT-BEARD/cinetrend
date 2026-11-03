import { Card, Typography } from "@heroui/react";

export default function MovieCard({title, description}:{title:string, description:string}){
    return(
        <Card className='min-w-100 h-125 m-20 p-5' variant='tertiary'>
            <Typography type='h2'>
                {title}
            </Typography>
            <Typography type='body'>
                {description}
            </Typography>
        </Card>
    );
}