'use strict'

var gAdminDisplayModeIdx = 0

function setAdminDisplayMode(id) {
    gAdminDisplayModeIdx = id;
}

function getDisplayMode() {
    return gAdminDisplayModeIdx
}

function getToggleButtonHTML(arr, activeIdx) {
    var strHTML = ``
    arr.forEach(function (display, idx) {
        let classStr = (activeIdx === idx) ? 'active' : ''
        strHTML += `<button class="${classStr}" onclick="onToggleDisplayMode(${idx})">${display}</button>`
    });
    return strHTML
}