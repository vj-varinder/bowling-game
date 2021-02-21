const chalk = require('chalk');
const clear = require('clear');
const BowlingGame = require('./BowlingGame');

clear();

console.log(
    chalk.inverse.green('Welcome to DIUS Bowling Game')
);

const bowlingGame = new BowlingGame();
bowlingGame.roll(10);
bowlingGame.roll(5);
bowlingGame.roll(4);

for (let index = 0; index < 16; index++) {
    bowlingGame.roll(0);    
}

console.log('Game: Below is the number of pins knocked.');
console.log(bowlingGame.allRolls);
console.log(chalk.blueBright(`Total Scores: ${bowlingGame.score()}`));