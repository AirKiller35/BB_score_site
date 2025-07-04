import React from 'react'
import ReactDOM from 'react-dom/client'
import './Home.css'
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  return(
  <div className='homeContainer'>
    <h2>Hello there!</h2>
    <div className="rootBtns">
      <button onClick={() => navigate('/new')}>Start a New Match</button>
      <button onClick={() => navigate('/view')}>View a Match</button>
    </div>
  </div>
  );
}

export default HomePage;
