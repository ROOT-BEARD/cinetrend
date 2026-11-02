import { Card, Typography } from "@heroui/react";

export default function MovieCard({title}:{title:string}){
    return(
        <Card className='min-w-100 h-125 m-20 p-5' variant='tertiary'>
            <Typography type='h2'>
                {title}
            </Typography>
        </Card>
    );
}