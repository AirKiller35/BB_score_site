import React from 'react';
import ReactDOM from 'react-dom/client';
import { useLocation } from 'react-router-dom';
import './StartMatch.css';

function StartMatch() {
  const location = useLocation();
  const matchData = JSON.parse(location.state);

  const matchType = matchData?.Match;
  const noOfQuaters = matchData?. Quater;
  const quarterTime = matchData?.TimePerQ;

  const teamA = matchData?.teamA;
  const playersA = matchData?.APlayers;
  const colourA = matchData?.ColourA;
  const teamB = matchData?.teamB;
  const playersB = matchData?.BPlayers;
  const colourB = matchData?.ColourB;

  return (
      <div className="startMatch">
        <div className="TEAM_A">

        </div>

        <div className="TEAM_B">
          
        </div>
      </div>
    );
}


export default StartMatch; 