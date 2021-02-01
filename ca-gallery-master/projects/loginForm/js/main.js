'use strict';

function onInit() {
    console.log('Hi');
    renderTodos();
}
function renderTodos() {
    var todos = getTodosForDisplay();
    if (!todos.length) {
        var strHTMLs = [`<p> There are no to-do's to display... </p>`]
    } else {
        strHTMLs = todos.map(function (todo) {
            var className = (todo.isDone) ? 'done' : '';
            return `<li class="${className}" onclick="onToggleTodo('${todo.id}')">
                    ${todo.txt}
                    <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
                    <div hidden class="modal-${todo.id}">
                        <span> Are you sure? </span>
                        <button onclick="onConfirmRemove('${todo.id}', event)">v</button>
                        <button onclick="onCancelRemove('${todo.id}', event)">x</button>
                    </div>
                </li>`
        })
    }

    // console.log('strHTMLs', strHTMLs)
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('');
    document.querySelector('.total-todos').innerText = getTodosCount();
    document.querySelector('.active-todos').innerText = getActiveTodosCount();
}

function onConfirmRemove(todoId, ev) {
    ev.stopPropagation();
    removeTodo(todoId);
    renderTodos();
}
function onRemoveTodo(todoId, ev) {
    ev.stopPropagation();
    var elModal = document.querySelector(`.modal-${todoId}`)
    elModal.hidden = false;
}
function onCancelRemove(todoId, ev) {
    ev.stopPropagation();
    var elModal = document.querySelector(`.modal-${todoId}`)
    elModal.hidden = true;
}


function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos();
}

function onAddTodo(ev) {
    ev.preventDefault();

    var elTodoTxt = document.querySelector('input[name=todoTxt]');
    var txt = elTodoTxt.value;
    if (txt) {
        var elTodoImportance = document.querySelector('input[name=importance]');
        var importance = parseInt(elTodoImportance.value);
        console.log('Adding todo:', txt, 'with importance', importance);
        addTodo(txt, importance)
        elTodoTxt.value = ''
        renderTodos();
    }
}

function onSetFilter() {
    var elFilterBy = document.querySelector('select[name=filterBy]');
    var filterBy = elFilterBy.value;
    console.log('Filtering by', filterBy);
    setFilter(filterBy);
    renderTodos();
}

function onSetSort() {
    var elSortBy = document.querySelector('select[name=sortBy]');
    var sortBy = elSortBy.value;
    console.log('sorting by', sortBy);
    setSort(sortBy);
    renderTodos();
}
