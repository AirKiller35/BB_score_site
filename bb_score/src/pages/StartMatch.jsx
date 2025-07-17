import React from 'react';
import ReactDOM from 'react-dom/client';
import { useLocation } from 'react-router-dom';
import Clock from '../components/clock';
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

  const [scoreA, setScoreA] = React.useState(0);
  const [scoreB, setScoreB] = React.useState(0);

  return (
    <div className="startMatch">
      <div className="teams">
        <div className="matchControl">
          <div className="time">
            <div className="stopWatch">
              <Clock maxTimeMin={quarterTime} maxTimeSec={0}/>
            </div>

            <div className="shotClock">
              <Clock maxTimeMin={0} maxTimeSec={24}/>
            </div>
          </div>
        
        <div className="controls"></div>
      </div>
        <div className="TEAM_A">
        <h3>{teamA}</h3>
        <h1>{scoreA}</h1>
        <br />
        <div className="players">
          {playersA.map((jersey, index) => (
            <div className="playerList" key={index}>
              <li className="player">{jersey}</li>
              <button className="add_2"
                onClick={() => {
                  setScoreA(scoreA+2);
                }}
              >+2</button>
              <button className="add_3"
                onClick={() => {
                  setScoreA(scoreA+3)
                }}
              >+3</button>
            </div>
          ))}
        </div>
        </div>

        <div className="TEAM_B">
        <h3>{teamB}</h3>
        <h1>{scoreB}</h1>
        <br />
        <div className="players">
          {playersB.map((jersey, index) => (
            <div className="playerList" key={index}>
              <li className="player">{jersey}</li>
              <button className="add_2"
                onClick={() => {
                  setScoreB(scoreB+2);
                }}
              >+2</button>
              <button className="add_3"
                onClick={() => {
                  setScoreB(scoreB+3);
                }}
              >+3</button>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}


export default StartMatch; 