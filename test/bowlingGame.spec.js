import BowlingGame from '../app/BowlingGame';
import { expect } from 'chai';

describe('Bowling Game', function () {

    let rollMany = function (noOfRolls, noOfPinsKnocked) {
        for (let i = 0; i < noOfRolls; i++) {
            this.roll(noOfPinsKnocked);
        }
    };

    let rollSpare = function () {
        this.roll(5);
        this.roll(5);
    };

    let rollStrike = function () {
        this.roll(10);
    };

    beforeEach(function () {
        this.bowlingGame = new BowlingGame();
    })

    describe('Game: Not a single pin knocked', function () {
        it('should score 0', function () {
            rollMany.call(this.bowlingGame, 20, 0);

            const expected = 0;
            const actual = this.bowlingGame.score();

            expect(actual).to.equal(expected);
        });
    });

    describe('Game: Only 1 pin knocked in each roll', function () {
        it('should score 20', function () {
            rollMany.call(this.bowlingGame, 20, 1);

            const expected = 20;
            const actual = this.bowlingGame.score();

            expect(actual).to.equal(expected);
        });
    });

    describe('Game: 1 Spare when rolls, 5,5 | 5, 0', function () {
        it('should score 20 when three rolls knocked down 5 each', function () {
            
            rollSpare.call(this.bowlingGame);
            this.bowlingGame.roll(5);
            rollMany.call(this.bowlingGame, 17, 0)
            
            const expected = 20;
            const actual = this.bowlingGame.score();

            expect(actual).to.equal(expected);
        });
    });

    describe('Game: 1 Strike when rolls, 10 | 5, 3', function () {
        it('should score 26 when given pins knocked down as 10, 5, 3', function () {
            
            rollStrike.call(this.bowlingGame);
            this.bowlingGame.roll(5);
            this.bowlingGame.roll(3);
            rollMany.call(this.bowlingGame, 16, 0)

            const expected = 26;
            const actual = this.bowlingGame.score();

            expect(actual).to.equal(expected);
        });
    });

    describe('Game: only last frame have spare, 5, 5', function () {
        it('should score 10', function () {
            rollMany.call(this.bowlingGame, 18, 0);
            this.bowlingGame.roll(5);
            this.bowlingGame.roll(5);

            const expected = 10;
            const actual = this.bowlingGame.score();

            expect(actual).to.equal(expected);
        });
    });

    describe('Game: when 6th frame has spare and rest of the game is remaining', function () {
        it('should score 10', function () {
            rollMany.call(this.bowlingGame, 10, 0);
            this.bowlingGame.roll(5);
            this.bowlingGame.roll(5);

            const expected = 10;
            const actual = this.bowlingGame.score();

            expect(actual).to.equal(expected);
        });
    });

    describe('Game: when 6th frame has spare and only 1 more roll has been performed, 10 | 0', function () {
        it('should score 10', function () {
            rollMany.call(this.bowlingGame, 10, 0);
            this.bowlingGame.roll(5);
            this.bowlingGame.roll(5);
            this.bowlingGame.roll(5);

            const expected = 20;
            const actual = this.bowlingGame.score();

            expect(actual).to.equal(expected);
        });
    });
    
    describe('Game: when bowler rolls, 10 | 5, 4', function () {
        it('should score 28', function () {
            this.bowlingGame.roll(10);
            this.bowlingGame.roll(5);
            this.bowlingGame.roll(4);

            const expected = 28;
            const actual = this.bowlingGame.score();

            expect(actual).to.equal(expected);
        });
    });

    describe('Game: when string type parameter is provided to rolls() function', function () {
        it('should throw "Expected a number" exception', function () {

            const expected = 'Expected a number';
            const module1 = function () {
                this.bowlingGame.roll('10');
            };

            expect(module1.bind(this)).to.throw(expected);

        });
    });
    
});