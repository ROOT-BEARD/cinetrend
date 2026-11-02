import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './MovieCard'
import type { NewMovie } from './types/database';
import { movieService } from './services/movieService';
import { SearchField } from '@heroui/react';

function App() {
  const [movies, setMovies] = useState<NewMovie[]>([]);
  const [search, setSearch] = useState<string>('');

  const setMovieList = async() => {
    const data = await movieService.getFirstMovies();
    setMovies(data);
  }

  const handleSearch = async() => {
    const data = await movieService.getMoviesByString(search);
    setMovies(data);
  }

  useEffect(() => {
    setMovieList();
  }, []);

  return (
    <>
      <SearchField className='w-128' name='search'>
        <SearchField.Group>
          <SearchField.SearchIcon/>
          <SearchField.Input placeholder='Search...' value={search} onChange={(e)=> {setSearch(e.target.value),handleSearch()}}/>
          <SearchField.ClearButton/>
        </SearchField.Group>
      </SearchField>
      <div className='w-full h-full grid grid-cols-4'>
          {movies.map((v) => (
            <MovieCard title={v.title}/>
          ))}
      </div>
    </>
  )
}

export default App
