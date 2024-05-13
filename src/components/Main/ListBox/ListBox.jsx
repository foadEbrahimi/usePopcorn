import React, { useState } from 'react';
import MovieList from './Details/MovieList';

export default function ListBox({ tempMovieData }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen1(open => !open)}>
        {isOpen1 ? '–' : '+'}
      </button>
      {isOpen1 && <MovieList tempMovieData={tempMovieData} />}
    </div>
  );
}
