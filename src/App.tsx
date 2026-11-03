import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './MovieCard'
import type { NewMovie } from './types/database';
import { movieService } from './services/movieService';
import { Button, Card, Label, ListBox, SearchField, Select } from '@heroui/react';


function App() {
  const [movies, setMovies] = useState<NewMovie[]>([]);
  const [search, setSearch] = useState<string>('');
  const [type, setType] = useState<string>('*');

  const handleSearch = async() => {
    const data = await movieService.getMoviesByString(search, type);
    setMovies(data);
  }

  return (
    <div className='flex w-full h-screen'>
      <Card variant='tertiary' className='w-1/3 p-10 flex items-center'>
        <SearchField className='w-128' name='search'>
          <SearchField.Group>
            <SearchField.SearchIcon/>
            <SearchField.Input placeholder='Search...' value={search} onChange={(e)=> {setSearch(e.target.value)}}/>
            <SearchField.ClearButton onClick={e=>setSearch('')}/>
          </SearchField.Group>
        </SearchField>
        <Select value={type} onChange={(e) => {setType(e as string)}}>
          <Label>Type: </Label>
          <Select.Trigger>
            <Select.Value/>
            <Select.Indicator/>
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="*" textValue='Both'>
                All
                <ListBox.ItemIndicator/>
              </ListBox.Item>
              <ListBox.Item id="Movie" textValue='Movie'>
                Movies
                <ListBox.ItemIndicator/>
              </ListBox.Item>
              <ListBox.Item id="TV Show" textValue='TV Show'>
                TV Shows
                <ListBox.ItemIndicator/>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
        <Button onClick={()=>handleSearch()}>SEARCH</Button>
      </Card>
      <div className='w-2/3 h-full self-end grid grid-cols-2 overflow-y-auto'>
          {movies.map((v) => (
            <MovieCard title={v.title} description={v.description}/>
          ))}
      </div>
    </div>
  )
}

export default App
