const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

let matchData = {
  teamA: 0,
  teamB: 0,
  quarter: 1,
  playersA: [],
  playersB: [],
  scoresA: [],
  scoresB: [],
  timer: 0
};

app.use(cors());
app.use(bodyParser.json());

app.get('/match', (req, res) => {
  res.json(matchData);
});

app.post('/match', (req, res) => {
  const newData = req.body;
  matchData = { ...matchData, ...newData }; 
  res.json({ status: 'ok', matchData });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
