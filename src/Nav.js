import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div className='navbar'>
      <div className='logo'>My Dashboard</div>
      <ul className='nav-links'>
        <Link to='/home'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/shop'>Links</Link>
      </ul>
    </div>
  );
}
