'use strict'


const STORAGE_KEY = 'usersDB'
const LOCAL_STORAGE_KEY = 'localUser'

var gUsers
var gIsActive = true


_createUsers()


function isLoggedIn() {
    return !gIsActive
}
function toggleLogin() {
    gIsActive = !gIsActive;
}

function doLogin(userName, password) {//function that checks whether a user is confirmed - returns false if not, and the user if he is
    var userIdx = gUsers.findIndex(function (user) { return user.userName === userName && user.password === password })
    if (userIdx >= 0) {
        console.log('matching user found, revaling content for the user');

        gUsers[userIdx].lastLoginTime = Date.now()
        saveUser(userName, password)
        _saveUsers
        return gUsers[userIdx]
    }
    return null;
}

function isUserAdmin(userName) {
    return gUsers.find(function (user) {
        return user.userName === userName && user.isAdmin
    })
}

function getCurrentUser() {
    return loadFromStorage(LOCAL_STORAGE_KEY)
}

function saveUser(userName, password) {
    gUsers.push(_createUser(userName, password))
    _saveUsers()
}

function getUsers() {
    return gUsers
}

function saveUserLocal(user) {
    saveToStorage(LOCAL_STORAGE_KEY, user)
}

function clearUserLocal() {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
}

///////Local Functions

function _saveUsers() {
    saveToStorage(STORAGE_KEY, gUsers)
}


function _createUsers() {
    var users = loadFromStorage(STORAGE_KEY)
    if (!users || !users.length) {
        users = [_createUser('puki', 'password'), _createUser('admin', '1234', true), _createUser('moshe', 'moshe')]
    }
    gUsers = users
    console.log('gUsers', gUsers)
    _saveUsers()
}

function _createUser(userName, userPassword, isAdmin) {
    var adminBool = (!isAdmin) ? false : isAdmin
    return {
        id: makeId(),
        userName: userName,
        password: userPassword,
        lastLoginTime: Date.now(),
        isAdmin: adminBool
    }
}