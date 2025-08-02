const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

const matches = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/match/:matchId', (req, res) => {
  const { matchId } = req.params;
  const match = matches[matchId];

  if(!match){
    return res.status(404).json({error: 'match not found'});
  }

  res.json(match);
});

app.post('/match/:matchId', (req, res) => {
  const {matchId} = req.params;
  const newData = req.body;
  matches[matchId] = { teamA: 0,
  teamB: 0,
  quarter: 1,
  playersA: [],
  playersB: [],
  scoresA: [],
  scoresB: [],
  timer: 0, 
  ...newData }; 

  res.json({ status: 'created', matchData: matches[matchId] });
});

app.patch('/match/:matchId', (req, res) => {
  const {matchId} = req.params;
  const updates = req.body;

  if(!matches[matchId]){
    return res.status(404).json({error: 'Match not found'});
  }

  matches[matchId] = {
    ...matches[matchId],
    ...updates
  }

  res.json({status: 'updated', matchData: matches[matchId]});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
