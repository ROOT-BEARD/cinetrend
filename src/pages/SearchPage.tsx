import { useState } from 'react'
import MovieCard from '../componets/MovieCard';
import type { NewMovie, NewSearch } from '../types/database';
import { movieService } from '../services/movieService';
import { Button, Card, SearchField } from '@heroui/react';
import SelecetionBox from '../componets/SelectionBox';
import { searchSerive } from '../services/searchService';
import { useUser } from '../contexts/UserContext';
import MovieDrawer from '../componets/MovieDrawer';
import SearchInputAC from '../componets/SearchInputAC';
import AndSwitch from '../componets/AndSwitch';

export default function SearchPage() {
  const {user} = useUser();
  const [movies, setMovies] = useState<NewMovie[]>([]);  
  const [selectedMovie, setSelectedMovie] = useState<NewMovie|null>(null);  
  const [title, setTitle] = useState<string>('');
  const [realeaseYear, setRealeaseYear] = useState<string>('');
  const [type, setType] = useState<string | null>(null);

  //current search
  const [currentSearch, setCurrentSearch] = useState<NewSearch|null>(null);

  //the page managment variables
  const [page, setPage] = useState<number>(1);
  const amount:number = 10;
  //country options
  const [countryAnd, setCountryAnd] = useState<boolean>(true);
  const [country, setCountry] = useState<string[]>([]);
  //rating options
  const [andSearch, SetAndSearch] = useState<boolean>(true);
  const [rating, setRating] = useState<string[]>([]);
  //genre options
  const [genreAnd, SetGenreAnd] = useState<boolean>(true);
  const [genre, setGenre] = useState<string[]>([]);
  //director options
  const [directorAnd, setDirectorAnd] = useState<boolean>(false);
  const [director, setDirector] = useState<string>('');
  //cast options
  const [castAnd, setCastAnd] = useState<boolean>(false);
  const [cast, setCast] = useState<string>('');
  
  const handleSearch = async () => {
    const search: NewSearch = {
        uid: user?.id ?? null,
        search_query: title.trim(),
        director: director.trim(),
        cast_query: cast,
        genre: genre.join(","),
        type: type,
        rating: rating.join(","),
        country: country.join(","),
        release_year: realeaseYear.trim() ? Number(realeaseYear.trim()) : null
    }
    setCurrentSearch(search);
    setPage(1);
    const data = await movieService.getMoviesByString(search, 1, amount, genreAnd, countryAnd, directorAnd, castAnd);
    setMovies(data);
    if(user?.id == null) return;      
    searchSerive.addSearch(search)
  }

  const loadMore = async () => {
    if(currentSearch == null) return;
    const data = await movieService.getMoviesByString(currentSearch, page + 1, amount, genreAnd, countryAnd, directorAnd, castAnd);
    setPage(page + 1);
    setMovies((movies) => [...movies, ...data]);
  }

  const typeOptions = [
    "All",
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
        <div className='flex flex-row w-full items-center gap-3'>
          <SearchField className='w-full' name='director'>
            <SearchField.Group>
              <SearchField.Input placeholder='Director...' value={director} onChange={(e) => { setDirector(e.target.value) }} />
            </SearchField.Group>
          </SearchField>
          <AndSwitch
            andSearch={directorAnd}
            setAndSearch={setDirectorAnd}
          />
        </div>
        <SearchField className='w-[10rem]' name='realeaseYear'>
          <SearchField.Group>
            <SearchField.Input type='number' placeholder='Release Year...' value={realeaseYear} onChange={(e) => { setRealeaseYear(e.target.value) }} />
          </SearchField.Group>
        </SearchField>
        <SearchInputAC
          onlyOr={true}
          setAndSearch={SetAndSearch}
          andSearch={andSearch}
          value={rating}
          setValue={setRating}
          title='Rating'
          selectionOptions={ratingOptions}
        />
        <SelecetionBox
          selectionOptions={typeOptions}
          value={type}
          setValue={setType}
          title='type'
        />
        <SearchInputAC
          onlyOr={false}
          setAndSearch={setCountryAnd}
          andSearch={countryAnd}
          value={country}
          setValue={setCountry}
          title='Country'
          selectionOptions={countryOptions}
        />
        <SearchInputAC
          onlyOr={false}
          setAndSearch={SetGenreAnd}
          andSearch={genreAnd}
          value={genre}
          setValue={setGenre}
          title='Genre'
          selectionOptions={genreOptions}
        />
        <div className='flex flex-row w-full items-center gap-3'>
          <SearchField className='w-full' name='director'>
            <SearchField.Group>
              <SearchField.Input placeholder='Cast...' value={cast} onChange={(e) => { setCast(e.target.value) }} />
            </SearchField.Group>
          </SearchField>
          <AndSwitch
            andSearch={castAnd}
            setAndSearch={setCastAnd}
          />
        </div>
        <Button onClick={() => handleSearch()}>SEARCH<SearchField.SearchIcon /></Button>
      </Card>
      <div className='w-full overflow-y-auto
        overflow-x-hidden'>
        <div>
          <div className='w-full h-full flex justify-center flex-wrap pl-5 pr-5 pt-5 gap-5'>
            {movies.map((v) => (
              <MovieCard
                handleClick={()=>setSelectedMovie(v)}
                movie={v} />
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