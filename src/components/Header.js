import React from 'react';
import logo from '../themoviedb_logo.png';
import '../App.css';

function Header() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="header-logo" alt="logo" />
          <p className="header-title">Movies</p>
          <button className="header-button">My Account <i class="arrow down"></i></button>
        </header>
      </div>
    );
  }
  
  export default Header;