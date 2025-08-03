import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './ViewMatch.css';

function ViewMatch() {
  const { matchId } = useParams();

  const [matchData, setMatchData] = useState(null);


  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await fetch(`http://localhost:4000/match/${matchId}`);
        const data = await res.json();
        setMatchData(data);
      } catch (err) {
        console.error("Error fetching match data", err);
      }
    };

    fetchMatch();
    const interval = setInterval(fetchMatch, 500);
    return () => clearInterval(interval);
  }, []);

  function formatTime(totalSec) {
    let min = Math.floor(totalSec/60);
    let sec = totalSec%60;
    return `${min} : ${sec < 10 ? '0'+sec : sec}`
  }

  if (!matchData) return (
        <div className="viewMatch">
            <p>Loading...</p>
        </div>
        
    );

  return (
    <div className="viewMatch">
      <div className="matchInfo">

        <div className="quarter_view">
          <h2>Q-{matchData.quarter}</h2>
        </div>

        <div className={(matchData?.matchClock ? 'active_clock' : 'inactive_clock')}>
          <h5>Match time:</h5>
          {formatTime(matchData?.matchClock)}
        </div>

        <div className={(matchData?.shotClock ? 'active_clock' : 'inactive_clock')}>
          <h5>Shot Clock</h5>
          {formatTime(matchData?.shotClock)}
        </div>
        

      </div>

      <div className="teams">

        <div className="A">
          <h2>Team A: {matchData.teamA.toUpperCase()}</h2>
          <h1>Score : {matchData.scoreA}</h1>
          <table className='score-table-view'>
            <thead>
              <tr>
                <th>Jersey No</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {matchData.playersA.map((jersey, index) => (
                <tr key={index}>
                  <td>{jersey}</td>
                  <td>{matchData.playersAScore[index]}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="B">
          <h2>Team B: {matchData.teamB.toUpperCase()}</h2>
          <h1>Score : {matchData.scoreB}</h1>
          <table className='score-table-view'>
            <thead>
              <tr>
                <th>Jersey No</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {matchData.playersB.map((jersey, index) => (
                <tr key={index}>
                  <td>{jersey}</td>
                  <td>{matchData.playersBScore[index]}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
      </div>
      
    </div>
  );
}

export default ViewMatch;
