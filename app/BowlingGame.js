// Bowling Game
export default function () {
    
    this.noOfFrames = 10;
    this.totalNoOfPins = 10;
    this.allRolls = [];

    this.roll = function (noOfPinsKnocked) {
        if (typeof noOfPinsKnocked !== 'number') {
            throw new Error('Expected a number');
        }
        this.allRolls.push(noOfPinsKnocked)
    };

    this.score = function () {
        let score = 0;
        let rollNumber = 0;
        let frameNumber = 0;

        // Calculating scores for each frame till the 9th Frame
        for (frameNumber; frameNumber < this.noOfFrames - 1 && rollNumber + 1 < this.allRolls.length; frameNumber++) {
            if (this.isStrike(rollNumber)) {
                score += this.strikeScore(rollNumber);
                rollNumber++;
                continue;
            } 
            let frameScore = this.allRolls[rollNumber] + this.allRolls[rollNumber + 1]; 
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