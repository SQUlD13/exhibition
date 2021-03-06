'use strict';
var gLevel = { SIZE: undefined, MINES: undefined };
var gDifficulties = [{ NAME: 'EASY', SIZE: 4, MINES: 2, SELECTED: false }, { NAME: 'MEDIUM', SIZE: 8, MINES: 12, SELECTED: false }, { NAME: 'EXPERT', SIZE: 12, MINES: 30, SELECTED: false }];

//var gDifficulty = [{ NAME: 'EASY', SIZE: 4, MINES: 2, BEST: 0 }, { NAME: 'MEDIUM', SIZE: 8, MINES: 12, BEST: 0 }, { NAME: 'EXPERT', SIZE: 12, MINES: 30, BEST: 0 }];
//var gSelectedDifficulty = 0


function difficultyClicked(elDifficulty) {

    let clickedDifficultyId = elDifficulty.getAttribute('data-id')
    let currDifficultyId = (getSelectedDifficulty() >= 0) ? getSelectedDifficulty() : 0

    if (clickedDifficultyId !== currDifficultyId) {//If clicking on new difficulty
        //console.log(clickedDifficultyId, 'Difficulty button clicked, gLevel is currently to', gLevel, 'according to gDifficulties', gDifficulties)

        gLevel.MINES = gDifficulties[clickedDifficultyId].MINES
        gLevel.SIZE = gDifficulties[clickedDifficultyId].SIZE

        gDifficulties[currDifficultyId].SELECTED = false;
        gDifficulties[clickedDifficultyId].SELECTED = true;
        //console.log('Difficulty button clicked, gLevel set to', gLevel, 'according to gDifficulties', gDifficulties)
        DIFFICULTYaud.cloneNode(true).play()
        initializeGame()
        init()
    }

}

function renderDifficulties(selector) {
    console.log('--Initializing difficulties division')
    //let selectedDiffIdx = getSelectedDifficulty(gDifficulties)

    let elDifficulty = document.querySelector(`${selector}`)

    //let strHtml = `<h1 class="difficulty"> Please select a difficulty </h1>`
    //console.log('rendering html string for button', gDifficulties[selectedDiffIdx], 'game is', gGame.isOn)
    let strHtml = renderButtonBlockHTML()

    //console.log('returned html is\n', strHtml)
    elDifficulty.innerHTML = strHtml;

    if (gGame.isOn) {
        elDifficulty.classList.remove('shown')
        elDifficulty.classList.add('hidden')
    } else {
        elDifficulty.classList.remove('hidden')
        elDifficulty.classList.add('shown')
    }

}

function renderButtonBlockHTML() {//returns html
    let strHtml = ``;
    for (let i = 0; i < gDifficulties.length; i++) {
        let classStr = (gDifficulties[i].SELECTED) ? `marked` : ``
        strHtml += `<button class="difficulty" ${classStr}" onclick="difficultyClicked(this)" data-id="${i}"> ${gDifficulties[i].NAME} </button>\n`
    }
    //console.log('rendering button block inner HTML,\n passed code is\n', strHtml)
    return strHtml;
}

function getSelectedDifficulty() {
    for (let i = 0; i < gDifficulties.length; i++) {
        //console.log('Selecting difficulty iteration', i, 'for ', gDifficulties)
        if (gDifficulties[i].SELECTED) { return i }
    } return -1;
}

// function renderSelectedButtonHTML() {
//     for (let i = 0; i < gDifficulties.length; i++) {
//         if (gDifficulties[i].SELECTED) {
//             let classStr = (gDifficulties[i].SELECTED) ? `marked` : ''
//             let strHtml = `<button class="difficulty ${classStr}" onclick="difficultyClicked(this)"> ${gDifficulties[i].NAME} <br>\n(${gDifficulties[i].SIZE}x${gDifficulties[i].SIZE})</button>`
//             console.log('rendering button, returning innerHTML\n', strHtml);
//         }
//     }
// }