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

export interface SearchRecord {
  search_id: number;
  uid: string;
  created_at: string;
  search_query?: string | null;
  director?: string | null;
  cast_query?: string | null;
  genre?: string | null;
  type?: string | null;
  rating?: string | null;
  country?: string | null;
  release_year?: number | null;
}

export interface Account {
    email:string;
    created_at?: string;
    password:string;
}

export type NewAccount = Omit<Account, 'create_at'>
export type NewSearch = Omit<SearchRecord, 'search_id' | 'created_at'>
export type NewMovie = Omit<Movie, "show_id">;