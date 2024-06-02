import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Logo from './components/Navbar/Details/Logo';
import Search from './components/Navbar/Details/Search';
import NumResults from './components/Navbar/Details/NumResults';
import Box from './components/Main/Box';
import MovieList from './components/Main/ListBox/MovieList';
import Movie from './components/Main/ListBox/Movie';
import WatchedSummary from './components/Main/WatchedBox/WatchedSummary';
import WatchedMovieList from './components/Main/WatchedBox/WatchedMovieList';
import MovieDetails from './components/Main/MovieDetails';

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const KEY = 'd818a66c';
export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  /*
  useEffect(() => {
    console.log('After initialization render');
  }, []);

  useEffect(() => {
    console.log('after every render');
  });

  useEffect(() => {
    console.log('D');
  }, [query]);

  console.log('during render');
  */

  function handlerSelectMovie(id) {
    setSelectedId(selectedId => (selectedId === id ? null : id));
    console.log(selectedId);
  }

  function handlerCloseMovie() {
    setSelectedId(null);
  }
  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!res.ok)
          throw new Error('Something went wrong with fetching movies');

        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
        setError('');
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }
    fetchMovies();
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList>
              {movies?.map(movie => (
                <Movie
                  movie={movie}
                  key={movie.imdbID}
                  onSelectMovie={handlerSelectMovie}
                />
              ))}
            </MovieList>
          )}
          {error && <Error message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handlerCloseMovie}
              key={selectedId}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export function Loader() {
  return <p className="loader">Loading ...</p>;
}
function Error({ message }) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}
