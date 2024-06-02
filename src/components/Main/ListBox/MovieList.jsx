import React from 'react';

export default function MovieList({ children }) {
  return <ul className="list list-movies">{children}</ul>;
}
