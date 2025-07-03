import React from 'react'
import ReactDOM from 'react-dom/client'
import './Home.css'

function HomePage() {
    return(
    <div className='homeContainer'>
        <h2>Hello there!</h2>
        <div className="rootBtns">
            <button>Start a New Match</button>
            <button>View a Match</button>
        </div>
    </div>
    );
}

export default HomePage;
