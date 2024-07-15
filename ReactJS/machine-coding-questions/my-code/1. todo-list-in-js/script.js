document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".todo-form");
    const input = document.querySelector("#todo");
    const todoList = document.querySelector("#todo-list");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const textContent = input.value.trim();
        if (textContent) {
            addTodoItem(textContent);
            input.value = "";
        } else {
            alert("Please enter valid text");
        }
    });

    function addTodoItem(todoText) {
        const todoItem = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = todoText;

        const editButton = document.createElement("button");
        editButton.innerText = "✏️";
        editButton.classList.add("edit-btn");

        const removeButton = document.createElement("button");
        removeButton.innerText = "❌";
        removeButton.classList.add("remove-btn");

        todoItem.appendChild(span);
        todoItem.appendChild(editButton);
        todoItem.appendChild(removeButton);
        todoList.appendChild(todoItem);
    }

    todoList.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("remove-btn")) {
            const todoItem = target.parentElement;
            todoList.removeChild(todoItem);
        }

        if (target.classList.contains("edit-btn")) {
            const todoItem = target.parentElement;
            const originalText = todoItem.querySelector("span").textContent;

            const editTodoItem = document.createElement("li");
            const editInput = document.createElement("input");
            editInput.value = originalText;

            const submitButton = document.createElement("button");
            submitButton.innerText = "✔️";

            const discardButton = document.createElement("button");
            discardButton.innerText = "❌";

            editTodoItem.appendChild(editInput);
            editTodoItem.appendChild(submitButton);
            editTodoItem.appendChild(discardButton);

            todoList.replaceChild(editTodoItem, todoItem);

            submitButton.addEventListener("click", function () {
                const newText = editInput.value.trim();
                if (newText) {
                    todoList.removeChild(editTodoItem);
                    addTodoItem(newText);
                } else {
                    alert("Please enter valid text");
                }
            });

            discardButton.addEventListener("click", function () {
                todoList.replaceChild(todoItem, editTodoItem);
            });
        }
    });
});
