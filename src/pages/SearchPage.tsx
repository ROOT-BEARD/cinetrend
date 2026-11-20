import { useEffect, useState } from 'react'
import MovieCard from '../componets/MovieCard';
import type { NewMovie, NewSearch } from '../types/database';
import { movieService } from '../services/movieService';
import { Button, Card, SearchField, TextArea } from '@heroui/react';
import SelecetionBox from '../componets/SelectionBox';
import { searchSerive } from '../services/searchService';
import { useUser } from '../contexts/UserContext';
import MovieDrawer from '../componets/MovieDrawer';

export default function SearchPage() {
  const {user} = useUser();
  const [movies, setMovies] = useState<NewMovie[]>([]);  
  const [selectedMovie, setSelectedMovie] = useState<NewMovie|null>(null);  
  const [overviewOpen, setOverviewOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [director, setDirector] = useState<string>('');
  const [realeaseYear, setRealeaseYear] = useState<string>('');
  const [type, setType] = useState<string | null>(null);
  const [rating, setRating] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const amount:number = 10;
  
  const handleSearch = async () => {
    setPage(1);
    const data = await movieService.getMoviesByString(title, type, director, rating, genre, country, realeaseYear, 1, amount);
    setMovies(data);
    if(user?.id == null) return;
    const search: NewSearch = {
        uid: user.id,
        search_query: title.trim(),
        director: director.trim(),
        cast_query: null,
        genre: genre,
        type: type,
        rating: rating,
        country: country,
        release_year: realeaseYear.trim() ? Number(realeaseYear.trim()) : null
    }
    searchSerive.addSearch(search)
  }

  const loadMore = async () => {
    const data = await movieService.getMoviesByString(title, type, director, rating, genre, country, realeaseYear, page + 1, amount);
    setPage(page + 1);
    setMovies((movies) => [...movies, ...data]);
  }

  const typeOptions = [
    "Movies",
    "TV Shows"
  ];

  const ratingOptions = [
    "G",
    "PG",
    "PG-13",
    "R",
    "TV-Y",
    "TV-Y7",
    "TV-PG",
    "TV-14",
    "TV-MA",
  ];

  const genreOptions = [
    "Action & Adventure",
    "Anime Features",
    "Anime Series",
    "British TV Shows",
    "Children & Family Movies",
    "Classic & Cult TV",
    "Classic Movies",
    "Comedies",
    "Crime TV Shows",
    "Cult Movies",
    "Documentaries",
    "Docuseries",
    "Dramas",
    "Faith & Spirituality",
    "Horror Movies",
    "Independent Movies",
    "International Movies",
    "International TV Shows",
    "Kids' TV",
    "Korean TV Shows",
    "LGBTQ Movies",
    "Movies",
    "Music & Musicals",
    "Reality TV",
    "Romantic Movies",
    "Romantic TV Shows",
    "Sci-Fi & Fantasy",
    "Science & Nature TV",
    "Spanish-Language TV Shows",
    "Sports Movies",
    "Stand-Up Comedy",
    "Stand-Up Comedy & Talk Shows",
    "TV Action & Adventure",
    "TV Comedies",
    "TV Dramas",
    "TV Horror",
    "TV Mysteries",
    "TV Sci-Fi & Fantasy",
    "TV Shows",
    "TV Thrillers",
    "Teen TV Shows",
    "Thrillers",
  ];

  const countryOptions = [
    "All",
    "Algeria",
    "Argentina",
    "Australia",
    "Austria",
    "Belgium",
    "Brazil",
    "Bulgaria",
    "Burkina Faso",
    "Canada",
    "China",
    "Colombia",
    "Czech Republic",
    "Denmark",
    "Egypt",
    "Ethiopia",
    "Finland",
    "France",
    "Germany",
    "Ghana",
    "Greece",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Jordan",
    "Kuwait",
    "Lebanon",
    "Malaysia",
    "Mauritius",
    "Mexico",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Philippines",
    "Poland",
    "Qatar",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Singapore",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Thailand",
    "Turkey",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Venezuela",
    "Vietnam",
  ];

  return (
    <div className='flex md:flex-row flex-col w-screen h-screen'>
      <MovieDrawer
        movie={selectedMovie}
        opened={selectedMovie !== null}
        handleClose={(isOpen) => {
            if(!isOpen) setSelectedMovie(null);
        }}/>
      <Card variant='tertiary' className='md:w-sm w-full pt-10 flex items-center'>
        <SearchField className='w-[20rem]' name='search'>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder='Search...' value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <SearchField.ClearButton onClick={e => setTitle('')} />
          </SearchField.Group>
        </SearchField>
        <div className='flex flex-row gap-2'>
          <SearchField className='w-[10rem]' name='director'>
            <SearchField.Group>
              <SearchField.Input placeholder='Director...' value={director} onChange={(e) => { setDirector(e.target.value) }} />
            </SearchField.Group>
          </SearchField>
          <SearchField className='w-[10rem]' name='realeaseYear'>
            <SearchField.Group>
              <SearchField.Input type='number' placeholder='Release Year...' value={realeaseYear} onChange={(e) => { setRealeaseYear(e.target.value) }} />
            </SearchField.Group>
          </SearchField>
        </div>
        <div className='flex flex-row gap-2'>
          <SelecetionBox
            selectionOptions={typeOptions}
            value={type}
            setValue={setType}
            title='type'
          />
          <SelecetionBox
            selectionOptions={ratingOptions}
            value={rating}
            setValue={setRating}
            title='rating'
          />
          <SelecetionBox
            selectionOptions={countryOptions}
            value={country}
            setValue={setCountry}
            title='country'
          />
        </div>
        <SelecetionBox
          selectionOptions={genreOptions}
          value={genre}
          setValue={setGenre}
          title='genre'
        />
        <Button variant='ghost' onClick={()=>{setAdvancedSearch(!advancedSearch)}}>ADVANCED SEARCH</Button>
        {advancedSearch?
        <TextArea className='w-full'>
        
        </TextArea> :<></>}
        <Button onClick={() => handleSearch()}>SEARCH<SearchField.SearchIcon /></Button>
      </Card>
      <div className='w-full overflow-y-auto
        overflow-x-hidden'>
        <div>
          <div className='w-full h-full flex justify-center flex-wrap pl-5 pr-5 pt-5 gap-5'>
            {movies.map((v) => (
              <MovieCard
                handleClick={()=>setSelectedMovie(v)}
                title={v.title}
                description={v.description}
                releaseYear={v.release_year}
                director={v.director ? v.director : ""}
                cast={v.cast ? v.cast : ""} />
            ))}
          </div>
          <div className='pt-5 pb-5 w-full flex justify-center'>
            {movies.length > 0 && movies.length % amount == 0 ? <Button onClick={loadMore}>LOAD MORE</Button> : <></>}
          </div>
        </div>
      </div>
    </div>
  )
}