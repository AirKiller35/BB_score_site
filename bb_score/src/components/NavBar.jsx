import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="navBar">
      <ul>
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/new')}>New Match</li>
        <li onClick={() => navigate('/view')}>View match</li>
        <li onClick={() => navigate('/previous')}>Previous Matches</li>
        <li onClick={() => navigate('/login')}>Login/Logout</li>
      </ul>
    </div>
  );
}

export default NavBar;