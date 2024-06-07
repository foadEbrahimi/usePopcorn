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
  }

  function handlerCloseMovie() {
    setSelectedId(null);
  }

  function handlerAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function hanlderDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbId !== id));
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error('Something went wrong with fetching movies');

        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }
    handlerCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
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
              watchedMovie={watched}
              onCloseMovie={handlerCloseMovie}
              key={selectedId}
              onAddWatched={handlerAddWatched}
              KEY={KEY}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDelete={hanlderDeleteWatched}
              />
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
