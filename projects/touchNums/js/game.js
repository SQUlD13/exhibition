'use strict';

const constDifficultyNames = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];

var gBoard;
var gDifficulties;
var gDifficultyIdx;

var gPrevNum;

function init() {
    gCurrTime = Infinity;
    gDifficultyIdx = 0;
    gPrevNum = 0;

    initBestTimes();

    gDifficulties = getDifficulties();
    gBoard = getBoard();

    renderDifficulty();
    renderTimerWrapper();
    renderBoard();
}

///////////////////////////////////////////////////////////////

function checkNumber(elBtn) {
    let thisValue = elBtn.getAttribute('data-value');
    let currDifficulty = gDifficulties[gDifficultyIdx];

    console.log('gPrevNum', gPrevNum);
    if (thisValue == (gPrevNum + 1)) {//If the correct nubmer is clicked
        elBtn.classList.add('highlight');
        elBtn.setAttribute('data-highlight', true);
        if (gPrevNum === 0) {//If first move
            startTimer();
        }
        gPrevNum++;
        if (thisValue == (currDifficulty.value ** 2)) {//If the last digit is clicked
            gPrevNum = 0;
            let elGame = document.querySelector('.game');
            let elButtons = elGame.querySelectorAll('td');;
            removeHighlights(elButtons);
            stopTimer();
        }
    }///////////////////////////////////////////////////////////////

}

function toggleDifficulty(elBtn) {
    let btnIdx = elBtn.getAttribute('data-idx');

    if (gDifficultyIdx != btnIdx) {//If the button clicked is not the current difficulty;
        //I Wonder why != works and not !==
        gDifficultyIdx = btnIdx;
        console.log('--Difficulty toggled--');

        let buttons = document.querySelectorAll('button');
        removeHighlights(buttons);

        stopTimer();

        gDifficultyIdx = btnIdx;
        gBoard = getBoard();
        renderBoard();
    }

    console.log('gBestTimes', gBestTimes);
    elBtn.classList.add('highlight');
}


///////////////////////////////////////////////////////////////
//DOM

function renderBoard() {
    console.log('--renderBoard Invoked--');
    let elGame = document.querySelector('.game');
    let currDifficulty = gDifficulties[gDifficultyIdx];
    let boardSize = currDifficulty.value;
    let strHtml = '<table>';
    for (let i = 0; i < boardSize; i++) {
        strHtml += `<tr>`;
        for (let j = 0; j < boardSize; j++) {
            let num = gBoard[i][j];
            //console.log('i', i, 'j', j, 'num', num)

            strHtml += `<td onclick="checkNumber(this)" 
            data-value=${num}> ${num} </td>`;
        }
        strHtml += `</tr>`
    }
    strHtml += `</table>`;

    elGame.innerHTML = strHtml;
}

function renderDifficulty() {
    console.log('--renderDifficulty Invoked--');
    console.log('gDifficulties', gDifficulties);
    let elDifficulty = document.querySelector('.difficulty');
    let strHtml = '';

    for (let i = 0; i < constDifficultyNames.length; i++) {
        let currDifficulty = gDifficulties[i];
        let currText = gDifficulties[i].text;
        let breakIndex = currText.indexOf('('); // When rendering the button i want to drop the text before the (
        let str = currText.substring(0, breakIndex) + '<br>' + currText.substring(breakIndex, currText.length);
        let highlighted = (currDifficulty.highlighted) ? 'highlight' : ''; //checks for highlight data;
        strHtml += `<button class="${highlighted}" onclick="toggleDifficulty(this)" data-idx=${i}>${str}</button>`;
    }

    elDifficulty.innerHTML = strHtml;
}


///////////////////////////////////////////////////////////////
//

function getBoard() {
    let currDifficulty = gDifficulties[gDifficultyIdx];
    console.log('---getBoard Invoked---');
    let board = [], numbers = getNumbers(currDifficulty.value ** 2);
    //console.log('numbers is', numbers);
    for (let i = 0; i < currDifficulty.value; i++) {
        board[i] = [];
        for (let j = 0; j < currDifficulty.value; j++) {
            let rnd = getRandomInt(0, numbers.length - 1);
            let value = parseInt(numbers.splice(rnd, 1)) + 1;
            //console.log('value', value, 'rnd', rnd, 'maxLength', numbers.length);
            board[i][j] = value;
        }
    }
    console.log('board is', board);
    return board;
}

function getDifficulties() {
    console.log('---getDifficulties invoked---')
    let difficulties = [];
    let minDifficulty = 3;

    for (let i = 0; i < constDifficultyNames.length; i++) {
        let value = minDifficulty + i;
        let text = constDifficultyNames[i];
        text += ` (${value}x${value})`;
        let highlight = (i === gDifficultyIdx) ? true : false;  //If there is a best time on this difficulty add highlight
        difficulties[i] =
        {
            idx: i,
            text: text,
            value: i + minDifficulty,
            highlighted: highlight
        }
    }
    return difficulties;
}

///////////////////////////////////////////////////////////////