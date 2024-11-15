const express = require('express');
const Scorecard = require('./scoreCard.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


let scorecard = new Scorecard();

const path = require('path');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/add-frame', (req, res) => {
    const { roll1, roll2, roll3 } = req.body;
    try {
        scorecard.addFrame(roll1, roll2, roll3);
        res.status(200).send({ message: "Frame added successfully", frames: scorecard.frames });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


app.get('/calculate-score', (req, res) => {
    try {
        const score = scorecard.calculateScore();
        res.status(200).send({ score });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


app.post('/reset', (req, res) => {
    scorecard = new Scorecard();
    res.status(200).send({ message: "Game reset successfully" });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




