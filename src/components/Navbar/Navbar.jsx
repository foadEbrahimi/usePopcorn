import React from 'react';
import Logo from './Details/Logo';
import Search from './Details/Search';
import NumResults from './Details/NumResults';
export default function Navbar() {
  return (
    <div className="nav-bar">
      <Logo />
      <Search />
      <NumResults />
    </div>
  );
}
