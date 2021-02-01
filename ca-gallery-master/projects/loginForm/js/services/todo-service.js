'use strict';

const STORAGE_KEY = 'todosDB';
var gTodos;
var gFilterBy = 'all';
var gSortBy = 'importance';

_createTodos();


function setSort(sortBy) {
    gSortBy = sortBy
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getTodosForDisplay() {
    if (gFilterBy === 'all') return _sortTodos(gTodos);
    var todos = gTodos.filter(function (todo) {
        return (gFilterBy === 'done' && todo.isDone) ||
            (gFilterBy === 'active' && !todo.isDone)
    })
    return _sortTodos(todos)
}

function _sortTodos(todos) {
    return todos.sort(function (todoA, todoB) {
        if (gSortBy === 'importance') return todoB.importance - todoA.importance
        else if (gSortBy === 'date') return todoB.createdAt - todoA.createdAt
        else if (gSortBy === 'txt') return todoA.txt.localeCompare(todoB.txt)//(todoA.txt.toLowerCase() > todoB.txt.toLowerCase()) ? -1 : 1
    });
}



function removeTodo(todoId) {
    console.log('Removing Todo', todoId);
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    console.log('Toggling Todo', todoId);

    var todoToToggle = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todoToToggle.isDone = !todoToToggle.isDone
    _saveTodosToStorage();
}

function addTodo(txt, importance) {
    var todo = _createTodo(txt, importance)
    gTodos.unshift(todo);
    _saveTodosToStorage();
}

function getTodosCount() {
    return gTodos.length
}
function getActiveTodosCount() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}


// Those functions are private for this file only

function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    if (!todos || !todos.length) {
        todos = ['Learn CSS', 'Master HTML'].map(_createTodo);
    }
    gTodos = todos;
    _saveTodosToStorage();
}

function _createTodo(txt, importance = 1) {
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: importance
    }
    console.log(todo)
    return todo
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos);
}
