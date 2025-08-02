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

  if (!matchData) return (
        <div className="viewMatch">
            <p>Loading...</p>
        </div>
        
    );

  return (
    <div className="viewMatch">
      <div className="matchInfo">

        <div className="quarter">
          <h2>Q-{matchData.quarter}</h2>
        </div>

        

      </div>
      <div className="A">

      </div>
      <div className="B">

      </div>
      
      <h2>Team A: {matchData.teamA}</h2>
      <h1>Score {matchData.teamA}: {matchData.scoreA}</h1>
      <h2>Team B: {matchData.teamB}</h2>
      <h1>Score {matchData.teamB}: {matchData.scoreB}</h1>
      <table className='score-table'>
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
      <h3>Players B</h3>
      <table className='score-table'>
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
  );
}

export default ViewMatch;
