'use strict';

var gStartTime;
var gTimerInterval;
var gCurrTime;

var gBestTimes;

///////////////////////////////////////////////////////////////

function checkPBToggle() {
    let elPb = document.querySelector('.pb');
    // let elTimer = document.querySelector('.timer');

    if (gBestTimes[gDifficultyIdx] === Infinity) {//if there isnt a bestTime on this time
        elPb.classList.remove('highlight');
    }
    else {  //If there is  a best time
        elPb.innerText = ' PB : ' + formatTime(gBestTimes[gDifficultyIdx]);
        elPb.classList.add('highlight');

        gCurrTime = Infinity;
    }
}

///////////////////////////////////////////////////////////////

function stopTimer() {
    console.log('--- Stop Timer invoked ---');

    gPrevNum = 0;
    let currBestTime = gBestTimes[gDifficultyIdx];
    //console.log('Stop timer! best date is', currBestTime);
    clearInterval(gTimerInterval);
    if (gCurrTime < currBestTime) { //If new PB is set
        gBestTimes[gDifficultyIdx] = gCurrTime; //Set the Model

        localStorage.setItem(`time-${gDifficultyIdx}`, gBestTimes[gDifficultyIdx].getTime());

        gCurrTime = Infinity;

    }


    checkPBToggle();//set DOM elements

    console.log('formatted currBestTime', gBestTimes[gDifficultyIdx], '\n gCurrTime is', formatTime(gCurrTime));
}

function startTimer() {
    gStartTime = new Date(Date.now());
    gTimerInterval = setInterval(updateTimer, 1);
}

function updateTimer() {
    //let elTimer = document.querySelector('.timer');
    let now = new Date(Date.now());
    gCurrTime = new Date(now - gStartTime);
    renderTimerWrapper();
}

///////////////////////////////////////////////////////////////


function renderTimerWrapper() { //setting DOM elements
    console.log('--renderTimerWrapper invoked--');
    let elTimerWrapper = document.querySelector('.timerWrapper');

    let strHtml = getTimerHTML();

    elTimerWrapper.innerHTML = strHtml;
}

// function renderTimer() {
//     console.log('--renderTimer Invoked--');
//     let elTimer = document.querySelector('.timer');
//     let pbDiv = getPbHTML();
//     let strHtml = pbDiv + formatTime(gCurrTime);
//     elTimer.innerHTML = strHtml;
// }

function getTimerHTML() {
    let pbDiv = getPbHTML();
    let strHtml = `<div class="timer"> ${pbDiv} ${formatTime(gCurrTime)} </div>`;
    return strHtml;
}

function getPbHTML() {
    console.log('--renderPb invoked---')
    let currBestTime = gBestTimes[gDifficultyIdx];

    let innerText = formatTime(currBestTime);
    let pbClassStr = 'pb';
    if (currBestTime < Infinity) {
        pbClassStr += ' highlight'
    }

    let strHtml = `<div class="${pbClassStr}"> PB : ${innerText} </div>`;
    return strHtml;
}

///////////////////////////////////////////////////////////////

function initBestTimes() {//Setting global
    let time = [];
    for (let i = 0; i < constDifficultyNames.length; i++) {
        let currCached = localStorage.getItem(`time-${i}`);
        if (currCached !== null) {
            let currStorageMl = parseInt(currCached);
            console.log('Init time for', currStorageMl, 'at idx', i);
            time[i] = new Date(currStorageMl);
        }
        else { time[i] = Infinity; }

    }
    gBestTimes = time;
}


///////////////////////////////////////////////////////////////
//////////////////////A E S T H E T I C S//////////////////////
///////////////////////////////////////////////////////////////

function formatTime(time) {
    if (time > 0 && time < Infinity) {
        let minute = time.getMinutes();
        let second = time.getSeconds();
        if (second < 10) second = '0' + second;
        let mlSecond = time.getMilliseconds();
        if (mlSecond < 100) mlSecond = '0' + mlSecond;
        if (mlSecond < 10) mlSecond = '0' + mlSecond;
        let str = minute + ':' + second + ':' + mlSecond;
        return str;
    } return '0:00:000';
}