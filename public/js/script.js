        let frames = [];
        let cumulativeScores = [];

        async function addFrame() {
            const roll1 = parseInt(document.getElementById('roll1').value) || 0;
            const roll2 = parseInt(document.getElementById('roll2').value) || 0;
            const roll3 = parseInt(document.getElementById('roll3').value) || 0;

            const response = await fetch('/add-frame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roll1, roll2, roll3 })
            });
            const data = await response.json();
            if (data.frames) {
                frames = data.frames;
                renderScorecard();
            } else {
                alert(data.error);
            }
        }

        async function calculateScore() {
            const response = await fetch('/calculate-score');
            const data = await response.json();
            document.getElementById('output').innerText = data.score;
            updateCumulativeScores(data.score);
        }

        async function resetGame() {
            const response = await fetch('/reset', { method: 'POST' });
            const data = await response.json();
            frames = [];
            cumulativeScores = [];
            renderScorecard();
            document.getElementById('output').innerText = data.message;
        }

        function renderScorecard() {
            const scorecard = document.getElementById('scorecard');
            scorecard.innerHTML = ''; 
            for (let i = 0; i < 10; i++) {
                const frame = frames[i] || [];
                const roll1 = frame[0] !== undefined ? frame[0] : '';
                const roll2 = frame[1] !== undefined ? frame[1] : '';
                const roll3 = frame[2] !== undefined ? frame[2] : '';
                const cumulativeScore = cumulativeScores[i] || '';

                
                const frameDiv = document.createElement('div');
                frameDiv.classList.add('frame');

                
                const header = document.createElement('div');
                header.classList.add('frame-header');
                header.innerText = `Frame ${i + 1}`;
                frameDiv.appendChild(header);

                
                const rollsDiv = document.createElement('div');
                rollsDiv.classList.add('frame-rolls');
                if (i === 9) {
                    rollsDiv.innerHTML = `<span>${roll1}</span><span>${roll2}</span><span>${roll3}</span>`;
                } else {
                    rollsDiv.innerHTML = `<span>${roll1}</span><span>${roll2}</span>`;
                }
                frameDiv.appendChild(rollsDiv);

                
                const scoreDiv = document.createElement('div');
                scoreDiv.classList.add('frame-score');
                scoreDiv.innerText = cumulativeScore;
                frameDiv.appendChild(scoreDiv);

                scorecard.appendChild(frameDiv);
            }
        }

        function updateCumulativeScores(scoreString) {
            const matches = scoreString.match(/\d+/g); 
            cumulativeScores = matches ? matches.map(Number) : [];
            renderScorecard();
        }