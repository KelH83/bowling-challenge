class Scorecard {
    constructor() {
        this.frames = []; 
    }

    addFrame(roll1, roll2 = 0, roll3 = 0){
        if(this.frames.length === 9){
            if(roll1 === 10 || roll1 + roll2 === 10){
                this.frames.push([roll1, roll2, roll3])
            }
            else{
                this.frames.push([roll1, roll2, roll3])
            }
        }
        else if(this.frames.length < 9){
            this.frames.push([roll1, roll2])
        }

        else{
            this.endGame()
        }
    }

    calculateScore(){
        let totalStrikes = 0;
        for (let i = 0; i < this.frames.length; i++) {
            const frame = this.frames[i];
            for(let j=0; j<frame.length; j++){
                if (frame[j] === 10) {
                    totalStrikes++;
                }

            }
        }

        if (totalStrikes === 12) {
            return 'Perfect game, Score: 300'
        }

        let totalScore = 0;
        for(let i=0; i<this.frames.length; i++){
            const frame = this.frames[i]
            const roll1 = frame[0]
            const roll2 = frame[1]
            let scoreToAdd =  roll1 + roll2
            
            if(i === 9){
                const roll3 = frame[2]
                scoreToAdd += roll3
                totalScore += scoreToAdd
                continue;
            }

            totalScore += scoreToAdd

            if(roll1 === 10 && i < 9){
                const nextFrame = this.frames[i +1]
                const nextRoll1 = nextFrame[0] 
                const nextRoll2 = nextFrame[1]
                const bonusToAdd = nextRoll1 + nextRoll2
                totalScore += bonusToAdd
            }

            else if(roll1 + roll2 === 10 && i < 9){
                const nextFrame = this.frames[i +1]
                const nextRoll = nextFrame[0]
                totalScore += nextRoll
            }
        }

        if(totalScore === 0){
            return `Gutter game, Score: ${totalScore}`
        }
        else{
            return `Score: ${totalScore}`
        }
    }

    endGame(){
        const finalScore = this.calculateScore()
        return finalScore  
    }
}

module.exports = Scorecard