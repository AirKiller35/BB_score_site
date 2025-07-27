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

  const [playersAScore, setPlayersAScore] = React.useState(new Array(playersA.length).fill(0));
  const [playersBScore, setPlayersBScore] = React.useState(new Array(playersB.length).fill(0));
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
          <table className='score-table'>
            <thead>
              <tr>
                <th>Jersey No</th>
                <th>Score</th>
                <th>+2</th>
                <th>+3</th>
              </tr>
            </thead>
            <tbody>
              {playersA.map((jersey, index) => (
                <tr key={index}>
                  <td>{jersey}</td>
                  <td>{playersAScore[index]}</td>
                  <td>
                    <button
                      onClick={() => {
                        const updatedScores = [...playersAScore];
                        updatedScores[index] += 2;
                        setPlayersAScore(updatedScores);
                        setScoreA(scoreA + 2);
                      }}
                    >+2</button>
                  </td>
                  <td>
                    <button className="add_3"
                      onClick={() => {
                        let updatedAScores = [...playersAScore]
                        updatedAScores[index] += 3;
                        setPlayersAScore(updatedAScores);
                        setScoreA(scoreA+3)
                      }}
                      >+3</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <table className='score-table'>
            <thead>
              <tr>
                <th>Jersey No</th>
                <th>Score</th>
                <th>+2</th>
                <th>+3</th>
              </tr>
            </thead>
            <tbody>
              {playersB.map((jersey, index) => (
                <tr key={index}>
                  <td>{jersey}</td>
                  <td>{playersBScore[index]}</td>
                  <td>
                    <button
                      onClick={() => {
                        const updatedScores = [...playersBScore];
                        updatedScores[index] += 2;
                        setPlayersBScore(updatedScores);
                        setScoreB(scoreB + 2);
                      }}
                    >+2</button>
                  </td>
                  <td>
                    <button className="add_3"
                      onClick={() => {
                        let updatedScores = [...playersBScore]
                        updatedScores[index] += 3;
                        setPlayersBScore(updatedScores);
                        setScoreB(scoreB+3)
                      }}
                      >+3</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        </div>
        
      </div>
    </div>
  );
}


export default StartMatch; 