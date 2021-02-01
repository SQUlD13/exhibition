'use strict';

function removeHighlights(elements) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('highlight')) {
            elements[i].classList.remove('highlight');
        }
    }
}

// function getNumberMatrix(size) {
//     let mat = [], numbers = getNumbers(size ** 2);
//     for (let i = 0; i < size; i++) {
//         mat[i] = [];
//         for (let j = 0; j < size; j++) {
//             let rndIdx = getRandomInt(0, numbers.length - 1);
//             let number = parseInt(numbers.splice(rndIdx, 1)) + 1;
//             mat[i][j] = number;
//         }
//     }
//     return mat;
// }

function getNumbers(length) {//returns an ordered  [0,..,n-2,n-1] of length n
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(i);
    }
    return arr;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}