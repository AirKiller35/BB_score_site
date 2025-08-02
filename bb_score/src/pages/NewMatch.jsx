import React from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './NewMatch.css';

function NewMatch() {
  const navigate = useNavigate();
  const matchId = uuidv4()

  const [matchType, setMatchType] = React.useState('');
  const [quarter, setQuater] = React.useState('');
  const [quarterTime, setQuaterTime] = React.useState('');
  const [quarterBreak, setQuarterBreak] = React.useState('');

  const [teamNameA, setTeamNameA] = React.useState('');
  const [teamNameB, setTeamNameB] = React.useState('');
  const [colourA, setColourA] = React.useState('');
  const [colourB, setColourB] = React.useState('');
  const [jerseyA, setJerseyA] = React.useState('');
  const [playersA, setPlayersA] = React.useState([]);
  const [jerseyB, setJerseyB] = React.useState('');
  const [playersB, setPlayersB] = React.useState([]);
  

  const addPlayerA = () => {
    if(jerseyA.trim() === '') return;

    setPlayersA((prev) => [...prev, jerseyA]);
    setJerseyA('');
  }

  const deletePlayerA = (index) => {
    setPlayersA((prev) => prev.filter((_, i) => i !== index))
  }

  const addPlayerB = () => {
    if(jerseyB.trim() === '') return;

    setPlayersB((prev) => [...prev, jerseyB]);
    setJerseyB('');
  }

  const deletePlayerB = (index) => {
    setPlayersB((prev) => prev.filter((_, i) => i !== index))
  }

  const submitted = () => {
    let matchInfo = JSON.stringify({
      Match : matchType,
      MatchID: matchId,
      Quater : quarter,
      TimePerQ : quarterTime,
      QuarterB : quarterBreak,
      teamA: teamNameA,
      APlayers : playersA,
      ColourA : colourA,
      teamB : teamNameB,
      BPlayers : playersB,
      ColourB : colourB
    });

    navigate(`/match/${matchId}/start`, {state: matchInfo});
  }; 

  return(
    <div className="newMatch">
      <div className="basicDetails">
        <label>
          Enter match type: 
          <input 
            type="radio" 
            name="matchType" 
            value="5v5"
            onChange={(e) => setMatchType(e.target.value)}/>5 v 5
          <input 
            type="radio" 
            name="matchType" 
            value="3v3"
             onChange={(e) => setMatchType(e.target.value)}/>3 v 3
        </label>
        <br />
        <label>
          No of quarters:
          <input 
            type="radio" 
            name="quarter" 
            value='4'
            onChange={(e) => setQuater(e.target.value)}/>4
          <input 
            type="radio" 
            name="quarter"
            value='2'
            onChange={(e) => setQuater(e.target.value)}/>2
        </label>
        <br />
        <label>
          Time duration of each quarter:
          <input 
            type="text" 
            placeholder='time duration' 
            id='quarterTime'
            onChange={(e) => setQuaterTime(e.target.value)}/>
        </label>
        <label>
          Time between quarters:
          <input 
            type="text" 
            placeholder='time duration'
            id ='quarterBreak'
            onChange={(e) => setQuarterBreak(e.target.value)}
            />
        </label>
      </div>

      <div className="teamDetails">
        <div id="teamA">
          <label>
            Team name:
            <input 
              type="text" 
              name="teamNameA"
              onChange={(e) => setTeamNameA(e.target.value)}/>
          </label>
          <br />
          <label>
            enter team colour:
            <input 
              type="text" 
              name="teamColourA" 
              id="teamColourA" 
              placeholder='team colour'
              onChange={(e) => setColourA(e.target.value)}/>
          </label>
          <br />
          <label>
            Enter player jersey no:
            <input 
              type="text" 
              value={jerseyA}
              onChange={(e) => setJerseyA(e.target.value)}
              />
            <button onClick={addPlayerA}>
              <i className='fa-solid fa-check'></i>
            </button>
          </label>
          <div className="playersA">
            {playersA.map((jersey, index) => (
              <div className="playerList" key={index}>
                <li className="player">{jersey}</li>
                <button className="delete" onClick={() => deletePlayerA(index)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
          
        </div>

        <div id="teamB">
          <label>
            Team name:
            <input 
              type="text" 
              name="teamNameB"
              onChange={(e) => setTeamNameB(e.target.value)}/>
          </label>
          <br />
          <label>
            enter team colour:
            <input 
              type="text" 
              name="teamColourB" 
              id="teamColourB" 
              placeholder='team colour'
              onChange={(e) => setColourB(e.target.value)}/>
          </label>
          <br />
          <label>
            Enter player jersey no:
            <input 
              type="text" 
              value={jerseyB}
              onChange={(e) => setJerseyB(e.target.value)}
              />
            <button onClick={addPlayerB}>
              <i className='fa-solid fa-check'></i>
            </button>
          </label>
          <div className="playersA">
            {playersB.map((jersey, index) => (
              <div className="playerList" key={index}>
                <li className="player">{jersey}</li>
                <button className="delete" onClick={() => deletePlayerB(index)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      
      <div className="submitContainer">
        <button 
          id='submitBtn' 
          onClick={submitted}>Submit
        </button>
      </div>
      
    </div>
  );
}


export default NewMatch; 