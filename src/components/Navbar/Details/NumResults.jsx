import React from 'react';

export default function NumResults({ movies }) {
  // console.log(movies);
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
