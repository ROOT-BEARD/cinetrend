import { useState } from 'react'
import MovieCard from '../componets/MovieCard';
import type { NewMovie, NewSearch } from '../types/database';
import { movieService } from '../services/movieService';
import { Button, Card, SearchField, Typography } from '@heroui/react';
import SelecetionBox from '../componets/Input/SelectionBox';
import { searchSerive } from '../services/searchService';
import { useUser } from '../contexts/UserContext';
import MovieDrawer from '../componets/MovieDrawer';
import SearchInputAC from '../componets/Input/SearchInputAC';
import AndSwitch from '../componets/Input/AndSwitch';
import SearchInput from '../componets/Input/SearchInput';

export default function SearchPage() {
  const {user} = useUser();
  // the movie list
  const [movies, setMovies] = useState<NewMovie[]>([]);  
  // the movie currenly selected, used to track what to display in the movie drawer
  const [selectedMovie, setSelectedMovie] = useState<NewMovie|null>(null);  
  // title
  const [title, setTitle] = useState<string>('');
  //the year of relese
  const [realeaseYear, setRealeaseYear] = useState<string>('');
  // media type (TV Show or Movie)
  const [type, setType] = useState<string | null>("All");
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
  //description keyword options
  const [keywords, setKeywords] = useState<string>('');
  
  //Search the database
  const handleSearch = async () => {
    //create a new search, flattening arrays
    const search: NewSearch = {
        uid: user?.id ?? null,
        search_query: title.trim(),
        director: director.trim(),
        cast_query: cast,
        genre: genre.join(","),
        type: type,
        rating: rating.join(","),
        country: country.join(","),
        //if the relase year is an integer is an intenger, and it is between 1900 and 2028, it is valid and add it to the search
        //otherwise make it null
        release_year: Number.isInteger(Number(realeaseYear.trim())) && Number(realeaseYear.trim()) >= 1900 && Number(realeaseYear.trim()) <= 2028 ?
        Number(realeaseYear.trim()) : null
    }
    //set the current search
    setCurrentSearch(search);
    //start page over to 1
    setPage(1);
    // get the movies
    const data = await movieService.getMoviesByString(search, 1, amount, genreAnd, countryAnd, directorAnd, castAnd, keywords);
    setMovies(data);
    // if there is a user save the search
    if(user?.id == null) return;      
    searchSerive.addSearch(search)
  }

  // loads another page
  const loadMore = async () => {
    if(currentSearch == null) return;
    //adds to tge page count
    const data = await movieService.getMoviesByString(currentSearch, page + 1, amount, genreAnd, countryAnd, directorAnd, castAnd, keywords);
    setPage(page + 1);
    //appends the new movies to the current movie list
    setMovies((movies) => [...movies, ...data]);
  }

  // keeps input as a integer
  const handleSetReleaseYear = (input:string) => {
    if(!parseInt(input)){
      setRealeaseYear("");
    }else{
      setRealeaseYear(input);
    }
  }

  // options for selection boxes
  const typeOptions = [
    "All",
    "Movie",
    "TV Show"
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
    //fill the screen, row if large, collum if small for smartphones
    <div className='flex md:flex-row flex-col w-screen h-screen'>
      <MovieDrawer
        //set the selected movie, deslect movie when closed, and open when one is selected
        movie={selectedMovie}
        opened={selectedMovie !== null}

        handleClose={(isOpen) => {
            if(!isOpen) setSelectedMovie(null);
        }}/>
      {/* card to hold the search area */}
      <Card variant='tertiary' className='md:w-md w-full pt-5 flex items-center'>
        <div>
          <Typography type='h3'>SEARCH</Typography>
        </div>
        <SearchInput
          icon={true}
          title='Search'
          value={title}
          setValue={setTitle}
        />
        <SelecetionBox
          selectionOptions={typeOptions}
          value={type}
          setValue={setType}
          title='type'
        />
        <SearchInput
          icon={false}
          title='Release Year'
          value={realeaseYear}
          setValue={(e) => handleSetReleaseYear(e)}
        />
        <SearchInputAC
          onlyOr={true}
          setAndSearch={SetAndSearch}
          andSearch={andSearch}
          value={rating}
          setValue={setRating}
          title='Rating'
          selectionOptions={ratingOptions}
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
          <SearchInput
            icon={false}
            title='Cast'
            value={cast}
            setValue={setCast}
          />
          <AndSwitch
            andSearch={castAnd}
            setAndSearch={setCastAnd}
          />
        </div>
        <div className='flex flex-row w-full items-center gap-3'>
          <SearchInput
            icon={false}
            title='Director'
            value={director}
            setValue={setDirector}
          />
          <AndSwitch
            andSearch={directorAnd}
            setAndSearch={setDirectorAnd}
          />
          
        </div>
        <SearchInput
          icon={false}
          title='Description Keywords'
          value={keywords}
          setValue={setKeywords}
        />
        <Button onClick={() => handleSearch()}>SEARCH<SearchField.SearchIcon /></Button>
      {/* Card to hold the movies/TV shows */}
      </Card>
      <div className='w-full md:overflow-y-auto'>
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