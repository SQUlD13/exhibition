'use strict'

function onBodyLoad() {
    console.log('on loading admin', isLoggedIn())
    var user = getCurrentUser();
    var isAdmin = (user) ? user.isAdmin : false
    if (!isAdmin) { clearUserLocal(); window.location.href = "index.html"; return }
    getDataTableHTML()
    renderData()
    renderToggleButton()
}

function onToggleDisplayMode(id) {
    setAdminDisplayMode(id)
    console.log('toggling display mode to', getDisplayMode())
    renderToggleButton()
    renderData()
}

function onBackClick() {
    localStorage.removeItem('userName')
    localStorage.removeItem('userPassword')
    window.location.replace('index.html')
}

function renderToggleButton() {
    var elToggleContainer = document.querySelector('.toggle-btn')
    var strHTML = getToggleButtonHTML(['Grid', 'Cards'], getDisplayMode())
    elToggleContainer.innerHTML = strHTML
}

function renderData() {
    (getDisplayMode() === 0) ? renderDataTable() : renderDataCards()
}

function renderDataCards() {
    var elTable = document.querySelector('.user-container')
    var strHTML = getDataCardHTML()
    elTable.innerHTML = strHTML
}

function renderDataTable() {
    var elTable = document.querySelector('.user-container')
    var strHTML = getDataTableHTML()
    elTable.innerHTML = strHTML
}

function getDataTableHTML() {
    let users = getUsers()
    var strHTML = `<table>\n<tbody>\n<thead>\n<tr>`
    var keys = []
    for (var key in users[0]) {
        keys.push(key)
    }
    keys.forEach(function (key) {
        strHTML += `<th>${key}</th>\n`
    })
    strHTML += `</tr></thead>`
    users.forEach(function (user) {
        strHTML += `<tr>`
        for (var key in user) {
            strHTML += `<td>${user[key]}</td>`
        }
        strHTML += `</tr>`
    })
    strHTML += `</tr>`
    strHTML += `</table>\n</tbody>`
    return strHTML
}

function getDataCardHTML() {
    let users = getUsers()
    let strHTML = ``
    users.forEach(function (user) {
        strHTML += `<div class="user-card">`
        for (var key in user) {
            console.log(user[key])
            strHTML += `<div class="card-content"><h1>${key} : </h1><span>${user[key]}</span></div>`
        }
        strHTML += `</div>`
    })
    return strHTML
}

