const Scorecard = require('./scoreCard.js')

describe('Test scoreCard class', () => {
    it('Will add a new frame with the score', () => {
        const score = new Scorecard()
        score.addFrame(3,4)
        expect(score.calculateScore()).toBe('Score: 7')
    });
    it('Will add a bonus when a strike is made', () => {
        const score = new Scorecard()
        score.addFrame(10)
        score.addFrame(3,4)
        expect(score.calculateScore()).toBe('Score: 24')
    });
    it('Will add a bonus when a spare is made', () => {
        const score = new Scorecard()
        score.addFrame(3,7)
        score.addFrame(3,4)
        expect(score.calculateScore()).toBe('Score: 20')
    });
    it('Will return gutter game when every roll scored 0', () => {
        const score = new Scorecard()
        for(let i=0; i<=10; i++){
            score.addFrame(0,0)
        }     
        expect(score.calculateScore()).toBe('Gutter game, Score: 0')
    });
    it('Will return perfect game when every roll is a strike', () => {
        const score = new Scorecard()
        for(let i=0; i<9; i++){
            score.addFrame(10)
        }
        score.addFrame(10,10,10)
        expect(score.calculateScore()).toBe('Perfect game, Score: 300')
    });

    it('Will calculate the correct score with 1 strike', () => {
        const score = new Scorecard()
        score.addFrame(1,2)
        expect(score.calculateScore()).toBe("Score: 3")
        score.addFrame(6,2)
        expect(score.calculateScore()).toBe("Score: 11")
        score.addFrame(3,2)
        expect(score.calculateScore()).toBe("Score: 16")
        score.addFrame(9,0)
        expect(score.calculateScore()).toBe("Score: 25")
        score.addFrame(10,0)
        score.addFrame(3,3)
        expect(score.calculateScore()).toBe('Score: 47')
        score.addFrame(1,2)
        expect(score.calculateScore()).toBe("Score: 50")
        score.addFrame(6,2)
        expect(score.calculateScore()).toBe("Score: 58")
        score.addFrame(8,1)
        expect(score.calculateScore()).toBe("Score: 67")
        score.addFrame(3,0)
        expect(score.calculateScore()).toBe("Score: 70")
    });

    it('Will calculate the correct score with 1 strike and 1 spare', () => {
        const score = new Scorecard()
        score.addFrame(1,2)
        expect(score.calculateScore()).toBe("Score: 3")
        score.addFrame(6,2)
        expect(score.calculateScore()).toBe("Score: 11")
        score.addFrame(3,2)
        expect(score.calculateScore()).toBe("Score: 16")
        score.addFrame(9,0)
        expect(score.calculateScore()).toBe("Score: 25")
        score.addFrame(10,0)
        score.addFrame(3,3)
        expect(score.calculateScore()).toBe('Score: 47')
        score.addFrame(1,2)
        expect(score.calculateScore()).toBe("Score: 50")
        score.addFrame(6,2)
        expect(score.calculateScore()).toBe("Score: 58")
        score.addFrame(8,2)
        score.addFrame(3,0)
        expect(score.calculateScore()).toBe("Score: 74")
    });

    it('Will calculate the correct score with multiple strikes including on the 10th frame', () => {
        const score = new Scorecard()
        score.addFrame(1,2)
        expect(score.calculateScore()).toBe("Score: 3")
        score.addFrame(6,2)
        expect(score.calculateScore()).toBe("Score: 11")
        score.addFrame(3,2)
        expect(score.calculateScore()).toBe("Score: 16")
        score.addFrame(9,0)
        expect(score.calculateScore()).toBe("Score: 25")
        score.addFrame(10,0)
        score.addFrame(3,3)
        expect(score.calculateScore()).toBe('Score: 47')
        score.addFrame(1,2)
        expect(score.calculateScore()).toBe("Score: 50")
        score.addFrame(6,2)
        expect(score.calculateScore()).toBe("Score: 58")
        score.addFrame(10,0)
        score.addFrame(10,0)
        expect(score.calculateScore()).toBe("Score: 88")
    });
});