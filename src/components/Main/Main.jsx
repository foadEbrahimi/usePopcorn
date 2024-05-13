import React from 'react';
import ListBox from './ListBox/ListBox';
import WatchedBox from './WatchedBox/WatchedBox';

export default function Main({ tempMovieData, tempWatchedData }) {
  return (
    <main className="main">
      <ListBox tempMovieData={tempMovieData} />
      <WatchedBox tempWatchedData={tempWatchedData} />
    </main>
  );
}
