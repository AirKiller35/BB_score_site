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
    const interval = setInterval(fetchMatch, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!matchData) return (
        <div className="viewMatch">
            <p>Loading...</p>
        </div>
        
    );

  return (
    <div className="viewMatch">
      <h1>Quarter: {matchData.quarter}</h1>
      <h2>Team A: {matchData.scoreA}</h2>
      <h2>Team B: {matchData.scoreB}</h2>
      <h3>Players A</h3>
      <ul>
        {matchData.playersA.map((jersey, index) => (
          <li key={index}>
            #{jersey} — {matchData.playersAScore[index]} pts
          </li>
        ))}
      </ul>
      <h3>Players B</h3>
      <ul>
        {matchData.playersB.map((jersey, index) => (
          <li key={index}>
            #{jersey} — {matchData.playersBScore[index]} pts
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewMatch;
