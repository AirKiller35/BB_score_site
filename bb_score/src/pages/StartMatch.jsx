import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useLocation } from 'react-router-dom';
import Clock from '../components/clock';
import './StartMatch.css';

function StartMatch() {
  const location = useLocation();
  const matchData = JSON.parse(location.state);

  const matchType = matchData?.Match;
  const noOfQuaters = matchData?.Quater;
  const quarterTime = matchData?.TimePerQ;
  const quarterBreakTime = matchData?.QuarterB

  const teamA = matchData?.teamA;
  const playersA = matchData?.APlayers;
  const colourA = matchData?.ColourA;
  const teamB = matchData?.teamB;
  const playersB = matchData?.BPlayers;
  const colourB = matchData?.ColourB;

  const [scoreA, setScoreA] = React.useState(0);
  const [scoreB, setScoreB] = React.useState(0);
  const [quarter, setQuarter] = React.useState(1);
  const [quarterB, setQuarterB] = React.useState();

  const handleTimeout = () => {
    setQuarterB(true);
  };

  const resume = () => {
    setQuarter(prev => prev+1)
    setQuarterB(false);
  };

  return (
    <div className="startMatch" >
      <div className="teams">
        <div className={quarterB ? 'active' : 'inactive'}>
          <h2>Break Time left</h2>
          <Clock maxTimeMin={quarterBreakTime} maxTimeSec={0} onTimeout={resume}/>
        </div>
        <div className="matchControl"
          style={quarterB ? {
            filter:'brightness(50%)',
            transition: 'filter 0.3s ease'
          } : {}}
        >
          <div className="time">
            <div className="stopWatch">
              <Clock maxTimeMin={quarterTime} maxTimeSec={0} onTimeout = {handleTimeout}/>
            </div>

            <div className="shotClock">
              <Clock maxTimeMin={0} maxTimeSec={24}/>
            </div>

            <div className="quarter">
              <h2>Q{quarter}</h2>
            </div>
          </div>
        </div>
        <div className="TEAM_A"
          style={{
          filter: quarterB ? 'brightness(50%)' : 'none',
          transition: 'filter 0.3s ease'
        }}
        >
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

        <div className="TEAM_B"
          style={{
          filter: quarterB ? 'brightness(50%)' : 'none',
          transition: 'filter 0.3s ease'
        }}
        >
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