'use strict'



function onInit() {
    console.log('Initializing')
    renderContent()
    renderLogin()
}

function onLogOut(userName) {
    console.log('Logging out')
    toggleLogin()
    renderLogin()
    renderContent()
    clearUserLocal()
}

function onFormSubmitInput(ev) {
    ev.preventDefault()

    var userName = document.querySelector('input[id="userName-input"]').value
    var password = document.querySelector('input[id="password-input"]').value

    var user = doLogin(userName, password)//function that checks whether a user is confirmed - returns false if not, and the user if he is
    if (user) {
        toggleLogin()
        renderLogin()
        saveUserLocal(user)
        renderContent(userName)
    } else alertNonRegistered()

}

function renderLogin() {
    var elLoginContainer = document.querySelector('.login-container')
    var strHTML = `<h1>Please enter your information</h1>
            <form onsubmit="onFormSubmitInput(event)">
                <label for="userName-input">Username:</label>
                <input type="text" name="text-field" id="userName-input" required>
                <label for="password-input">Password:</label>
                <input type="password" name="text-field" id="password-input" required>
                <input type="submit" value="Log-in">
            </form>`;
    elLoginContainer.innerHTML = strHTML
    if (gIsActive) {
        elLoginContainer.classList.remove('up')
    } else elLoginContainer.classList.add('up')
}

function renderContent(userName = 'Anon') {
    var user = getCurrentUser();
    var isAdmin = (user) ? user.isAdmin : false;
    console.log('curent user is', user)
    var hiddenStr = (isAdmin) ? '' : 'hidden'
    var elContentContainer = document.querySelector('.content')
    var strHTML = `<h1>Welcome back <br><span>${userName}</span></h1>
            <div class="main-content">
                MAIN CONTENT
            </div>
            <div class="footer">
                <form action="admin.html">
                    <button ${hiddenStr} type="submit" action="admin.html" class="admin" onclick="">Admin Panel</button>
                </form>
                <button class="logout" onclick="onLogOut('${userName}')">Log-out</button>
                </div>`
    elContentContainer.innerHTML = strHTML
    // if (!gIsActive) {
    //     elContentContainer.classList.remove('down')
    // } else elContentContainer.classList.add('down')
}

function alertNonRegistered() {
    console.log('User not registered - TO DO!')
}

