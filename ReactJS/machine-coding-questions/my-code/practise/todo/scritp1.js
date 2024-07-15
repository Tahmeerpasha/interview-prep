// Chatgpt code

document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todo-input");
    const todoForm = document.getElementById("form-group");
    const renderTodos = document.getElementById("render-todos");
    const addBtn = document.getElementById("add-btn");
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let editIndex = null;

    renderSavedTodos();

    todoForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const todo = todoInput.value.trim();
        if (!todo) return;

        if (addBtn.textContent === "Save" && editIndex !== null) {
            todos[editIndex] = todo;
            addBtn.textContent = "Add Todo";
            editIndex = null;
        } else {
            todos.push(todo);
        }

        todoInput.value = "";
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos.innerHTML = '';
        renderSavedTodos();
    });

    function renderSavedTodos() {
        renderTodos.innerHTML = '';
        todos.forEach((todo, index) => {
            render(todo, index);
        });
    }

    function render(todo, index) {
        const todoContainer = document.createElement("div");
        todoContainer.className = "todo-container";
        todoContainer.innerHTML = `
            <p class="todo-content">${todo}</p>
            <button class="edit-btn" data-index="${index}">Edit todo</button>
            <button class="delete-btn" data-index="${index}">Delete todo</button>
        `;
        renderTodos.appendChild(todoContainer);
    }

    renderTodos.addEventListener("click", function (event) {
        const action = event.target.className;
        const index = event.target.getAttribute("data-index");

        if (action === "edit-btn") {
            todoInput.value = todos[index];
            addBtn.textContent = "Save";
            editIndex = index;
        } else if (action === "delete-btn") {
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodos.innerHTML = '';
            renderSavedTodos();
        }
    });
});
