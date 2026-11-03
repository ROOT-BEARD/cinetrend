export interface Movie {
    show_id: string;
    type?: string;
    title:string;
    director?:string;
    cast?:string;
    country:string;
    date_added:string;
    release_year:string;
    rating?:string;
    duration:string;
    listed_in?:string;
    description:string;
}
 
export type NewMovie = Omit<Movie, "show_id">;