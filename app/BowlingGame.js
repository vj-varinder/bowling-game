// Bowling Game
module.exports = function () {
    // Number of frames in a game
    this.noOfFrames = 10;
    // Number of pins in a game
    this.totalNoOfPins = 10;
    // this.allRolls will have number of pins knocked in all rolls in each game.
    this.allRolls = [];

    // Recording number of pins knocked in each roll
    this.roll = function (noOfPinsKnocked) {
        if (typeof noOfPinsKnocked !== 'number') {
            throw new Error('Expected a number');
        }
        this.allRolls.push(noOfPinsKnocked)
    };

    // Calculated the score
    this.score = function () {
        let score = 0;
        let rollNumber = 0;
        let frameNumber = 0;

        // Calculating scores for each frame till the 9th Frame if rolls exist
        for (frameNumber; frameNumber < this.noOfFrames - 1 && rollNumber + 1 < this.allRolls.length; frameNumber++) {
            // Check for Strike
            if (this.isStrike(rollNumber)) {
                score += this.strikeScore(rollNumber);
                rollNumber++;
                continue;
            } 
            let frameScore = this.allRolls[rollNumber] + this.allRolls[rollNumber + 1]; 
            // Check for Spare
            if (this.isSpare(frameScore)) {
                score += this.spareScore(rollNumber);
            } else {
                score += frameScore;
            }
            rollNumber = rollNumber + 2;
        }

        // Handling Last Frame
        if (rollNumber < this.allRolls.length) {
            score += this.allRolls[rollNumber];
            if (rollNumber + 1 < this.allRolls.length) {
                score += this.allRolls[rollNumber + 1];
            }
        }

        return score;
    };

    this.isSpare = function (frameScore) {
        return frameScore === this.totalNoOfPins;
    };

    this.isStrike = function (rollNumber) {
        return this.allRolls[rollNumber] === this.totalNoOfPins;
    };

    this.spareScore = function (rollNumber) {
        return rollNumber + 2 < this.allRolls.length ? 10 + this.allRolls[rollNumber + 2] : 10;
    };

    this.strikeScore = function (rollNumber) {
        return rollNumber + 2 < this.allRolls.length ? 10 + this.allRolls[rollNumber + 1] + this.allRolls[rollNumber + 2] : 10 + this.allRolls[rollNumber + 1];
    };

}