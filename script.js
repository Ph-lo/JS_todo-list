
const todoForm = document.getElementById('form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-items');
const checkboxes = document.querySelectorAll('.checkbox');

let todos = [];

getFromLocalStorage();

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value);
});
todoList.addEventListener('click', todoClick);

function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach(function(task) {
        const li = document.createElement('li');
        const checked = task.completed ? 'checked' : null;

        li.setAttribute('class', 'item');
        li.setAttribute('data-key', task.id);

        if(task.completed == true) {
            li.style.textDecoration = 'line-through';
            li.style.color = 'gray';
        }

        li.innerHTML = `
            <input id="${task.id}" class="checkbox" type="checkbox" ${checked}/>
            <label for="${task.id}"><span></span></label>
            <p class="${checked}">${task.task}</p>
            <input class="delete-button" type="image" src="media/icons/trash.png" alt="trash icon" />
        `;
        todoList.append(li);
    })
}

function todoClick(event) {

    if(event.target.type == 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if(event.target.type == 'image') {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
}

function toggle(id) {
    todos.forEach(function(task) {
        if (task.id == id) {
            task.completed = !task.completed;
        }
    });
    saveToLocalStorage(todos);
    renderTodos();
}

function addTodo(task) {
    if(task != '') {
        const now = Date.now();
        const todo = {
            id: now,
            task: task,
            completed: false
        };
        todos.push(todo);
        todoInput.value = '';
    }
    saveToLocalStorage(todos);
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(function(task) {
        return task.id != id;
    })
    saveToLocalStorage(todos);
    renderTodos();
}
function saveToLocalStorage(todos) {
    localStorage.setItem('taskList', JSON.stringify(todos));
}
function getFromLocalStorage() {
    const taskslist = localStorage.getItem('taskList');
    if(taskslist) {
        todos = JSON.parse(taskslist);
        renderTodos();
    }
}

document
    .getElementById('deleteAll-button')
    .addEventListener('click', function() {
        todos = [];
        saveToLocalStorage(todos);
        renderTodos();
    });