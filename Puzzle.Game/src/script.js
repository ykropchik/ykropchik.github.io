var faucetArray = [[true, true, true, true], [true, true, true, true], [true, true, true, true], [true, true, true, true]];

window.addEventListener('DOMContentLoaded', initialisation());

function initialisation() {
    document.getElementsByClassName('start-button')[0].addEventListener('mouseup', function () {
        startGame();
    })

    document.getElementsByClassName('start-button')[1].addEventListener('mouseup', function () {
        startGame();
    })

    document.getElementById('game-field').addEventListener('mouseup', function (event) {
        if (event.target.id != "game-field") {
            turnRule(event.target.getAttribute('row') - 1, event.target.getAttribute('column') - 1);
        }
    });
}

function turnRule(row, column) {
    let gameField = document.getElementById('game-field');

    console.log('Column: ', column, ' Row: ', row);

    for (let i = 0; i < 4; i++) {
        faucetArray[row][i] = !faucetArray[row][i];
        turnFaucet(gameField.children[row * 4 + i]);
        faucetArray[i][column] = !faucetArray[i][column];
        turnFaucet(gameField.children[i * 4 + column]);
    }
    faucetArray[row][column] = !faucetArray[row][column];
    checkWin();
}

function turnFaucet(target) {
    let angle = getRotationAngle(target);

    if (angle % 90 == 0) {
        target.animate([
            { transform: 'rotate(' + angle + 'deg)' },
            { transform: 'rotate(' + (angle + 90) + 'deg)' }
        ], 200).addEventListener('finish', function () {
            target.style.transform = 'rotate(' + (angle + 90) + 'deg)';
        })
    }
}

function getRotationAngle(target) {
    const obj = window.getComputedStyle(target, null);
    const matrix = obj.getPropertyValue('-webkit-transform') ||
        obj.getPropertyValue('-moz-transform') ||
        obj.getPropertyValue('-ms-transform') ||
        obj.getPropertyValue('-o-transform') ||
        obj.getPropertyValue('transform');

    let angle = 0;

    if (matrix !== 'none') {
        const values = matrix.split('(')[1].split(')')[0].split(',');
        const a = values[0];
        const b = values[1];
        angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }

    return ((angle < 0) ? angle += 360 : angle);
}

function shuffle() {
    for (let i = 0; i < Math.round(Math.random() * Math.floor(20) + 10); i++) {
        let row = Math.round(Math.random() * Math.floor(3));
        let column = Math.round(Math.random() * Math.floor(3));

        for (let j = 0; j < 4; j++) {
            faucetArray[row][j] = !faucetArray[row][j];
            faucetArray[j][column] = !faucetArray[j][column];
        }
    }

    console.log(faucetArray);
}

function setFaucetsPosition() {
    let gameField = document.getElementById('game-field');

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            gameField.children[i * 4 + j].style.transform = faucetArray[i][j] ? 'rotate(90deg)' : 'rotate(0deg)';
        }
    }
}

function checkWin() {
    let arraySumm = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            arraySumm += faucetArray[i][j];
        }
    }

    console.log(arraySumm);

    if (arraySumm == 16) {
        endGame();
    }
}

function startGame() {
    document.getElementById('game-field').classList.remove('hide');
    document.getElementById('start-info').style.display = 'none';
    document.getElementById('end-info').style.display = 'none';

    shuffle();
    setFaucetsPosition();
}

function endGame() {
    document.getElementById('game-field').classList.add('hide');
    document.getElementById('end-info').style.display = 'block';
}