import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useLocation, useParams } from 'react-router-dom';
import Clock from '../components/clock';
import './StartMatch.css';

function StartMatch() {
  const { matchId } = useParams();
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
  const [foulA, setFoulA] = React.useState(false);
  const [foulB, setFoulB] = React.useState(false);
  const [freethrowA, setFreethrowA] = React.useState(false);
  const [freethrowB, setFreethrowB] = React.useState(false);


  const handleTimeout = () => {
    setQuarterB(true);
  };

  const resume = () => {
    setQuarter(prev => prev+1)
    setQuarterB(false);
  };
  
  const syncMatchToBackend = async () => {
    const matchSnapshot = {
      teamA, scoreA, 
      teamB, scoreB, 
      playersA, playersB, 
      playersAScore, playersBScore, 
      quarter, 
      matchType, 
      noOfQuaters, 
      quarterTime, 
      quarterBreakTime,
      'matchClock' : quarterTime*60,
      'shotClock' : 24,
      'breakClock' : quarterBreakTime
    };

    try{
      await fetch(`http://localhost:4000/match/${matchId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(matchSnapshot)
      });
    } catch(err) {
      console.error("Failed to sync match to backend: ", err);
    }
  };

  useEffect(() => {
    syncMatchToBackend();
  }, [scoreA, scoreB, playersAScore, playersBScore, quarter]);

  return (
    <div className="startMatch" >
      <div className="teams">
        <div className={quarterB ? 'active_break' : 'inactive_break'}>
          <h2>Break Time left</h2>
          <Clock maxTimeMin={quarterBreakTime} maxTimeSec={0} onTimeout={resume} matchId={matchId} clockType={'breakClock'}/>
        </div>

        <div className="matchControl"
          style={quarterB ? {
            filter:'brightness(50%)',
            transition: 'filter 0.3s ease'
          } : {}}
        >
          <div className="time">
            <div className="stopWatch">
              <Clock maxTimeMin={quarterTime} maxTimeSec={0} onTimeout = {handleTimeout} matchId={matchId} clockType={'matchClock'}/>
            </div>

            <div className="shotClock">
              <Clock maxTimeMin={0} maxTimeSec={24} matchId={matchId} clockType={'shotClock'}/>
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


          <button className='foul'
            onClick={() => {
              setFoulA(true)
            }}
          >Foul by {teamA}</button>

          <div className={foulA ? 'active_foul' : 'inactive_foul'}>
            <h4>Freethow? : </h4> 
            <button className="ft_yes"
              onClick={() => {
                setFreethrowB(true);
                setFoulA(false);
              }}
            ><i className='fa-solid fa-check'></i></button>
            <button className="ft_no"
             onClick={() => {
                setFoulA(false);
              }}
            ><i className='fa-solid fa-x'></i></button>
          </div>
          <div className={freethrowA ? 'active_fr' : 'inactive_fr'}>
            <button 
              onClick={() => {
                setScoreA(scoreA +1);
              }}
            >+1</button>
            <button
              onClick={() => {
                setFreethrowA(false)
              }}
            >Close</button>
          </div>

          
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

        <button className='foul'
          onClick={() => {
            setFoulB(true)
          }}
        >Foul by {teamB}</button>

        <div className={foulB ? 'active_foul' : 'inactive_foul'}>
          <h4>Freethow? : </h4> 
          <button className="ft_yes"
            onClick={() => {
              setFreethrowA(true);
              setFoulB(false);
            }}
          ><i className='fa-solid fa-check'></i></button>
          <button className="ft_no"
            onClick={() => {
              setFoulB(false);
            }}
          ><i className='fa-solid fa-x'></i></button>
        </div>
        <div className={freethrowB ? 'active_fr' : 'inactive_fr'}>
          <button 
            onClick={() => {
              setScoreB(scoreB +1);
            }}
          >+1</button>
          <button
            onClick={() => {
              setFreethrowB(false)
            }}
          >Close</button>
        </div>

        
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