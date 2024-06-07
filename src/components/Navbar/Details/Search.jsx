import React, { useEffect, useRef } from 'react';

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === 'Enter') {
        inputEl.current.focus();
        setQuery('');
      }
    }

    document.addEventListener('keydown', callback);

    return () => document.removeEventListener('keydown', callback);
  }, [setQuery]);

  useEffect(() => {
    // document.querySelector('.search').focus();
    console.log(inputEl.current);
    inputEl.current.focus();
  }, []);

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        ref={inputEl}
      />
    </div>
  );
}
