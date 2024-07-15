// My code
document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todo-input");
    const todoForm = document.getElementById("form-group");
    const renderTodos = document.getElementById("render-todos");
    const addBtn = document.getElementById("add-btn");
    renderSavedTodos();
    const todos = [];
    todoForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (addBtn.textContent === "Save") return;
        const todo = todoInput.value.trim();
        if (!todo) return;
        todos.push(todo);
        todoInput.value = ""
        render(todo);
        localStorage.setItem("todos", JSON.stringify(todos))
    })

    function renderSavedTodos() {
        const todos = JSON.parse(localStorage.getItem("todos"));
        if (!todos) return;
        todos.forEach((todo) => {
            render(todo);
        })
    }

    function render(todo) {
        const todoContainer = document.createElement("div");
        todoContainer.className = "todo-container"
        todoContainer.innerHTML = `
        <p class="todo-content">${todo}</p>
        <button class="edit-btn">Edit todo</button>
        <button class="delete-btn">Delete todo</button>
        `
        renderTodos.appendChild(todoContainer);
    }

    renderTodos.addEventListener("click", function (event) {
        const action = event.target.textContent;
        const parentNode = event.target.parentNode;
        const todos = JSON.parse(localStorage.getItem("todos"));
        if (action === "Edit todo") {
            todoInput.value = parentNode.firstElementChild.textContent;
            addBtn.textContent = "Save"
            if (addBtn.textContent === "Save") {
                addBtn.addEventListener("click", function () {
                    const newTodos = todos.map((ele) => {
                        if (ele === parentNode.firstElementChild.textContent)
                            return todoInput.value
                        else return ele;
                    })
                    console.log(newTodos)
                    localStorage.setItem("todos", JSON.stringify(newTodos));
                    parentNode.firstElementChild.textContent = todoInput.value;
                    addBtn.textContent = "Add Todo"
                    todoInput.value = ""
                })
            }
        } else if (action === "Delete todo") {
            if (!todos) return;
            const newTodos = todos.filter((ele) => ele !== parentNode.firstElementChild.textContent)
            localStorage.setItem("todos", JSON.stringify(newTodos));
            renderTodos.removeChild(parentNode)
        }

    })
})