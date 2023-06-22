const submit = document.getElementById("submit");
const items = document.getElementById("items");
const todo = document.getElementById("todo");
let todos;

function renderTodos(todoItem) {
  const li = document.createElement("li");
  li.classList.add("li");
  const spanItem = document.createElement("span");
  const spanCircle = document.createElement("span");
  spanCircle.classList.add("circle");
  spanItem.textContent = todoItem;
  const image = document.createElement("img");
  image.classList.add("delete");
  image.setAttribute("src", "/images/icon-cross.svg");
  li.appendChild(spanCircle);
  li.appendChild(spanItem);
  items.appendChild(li);
  li.appendChild(image);
}

class Todo {
  constructor(isComplete) {
    this.isComplete = isComplete;
  }
  new(todoInput) {
    if (todo.value !== "") {
      renderTodos(todoInput);
      //   store todos in local storag
      if (localStorage.getItem("todos") === null) {
        todos = [];
        todos.push({ todoInput, isComplete: this.isComplete });
        localStorage.setItem("todos", JSON.stringify(todos));
      } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.push({ todoInput, isComplete: this.isComplete });
        localStorage.setItem("todos", JSON.stringify(todos));
      }

      todo.value = "";
    } else {
      alert("Please add a todo");
    }
  }

  render() {
    if (localStorage.getItem("todos") !== null) {
      const allTodos = JSON.parse(localStorage.getItem("todos"));
      allTodos.map(function (item) {
        renderTodos(item.todoInput);
      });
    }
  }
  delete(e){
    e.target.parentElement.remove();

    // Delete from Local Storage
    const allTodos = JSON.parse(localStorage.getItem("todos"));
    const todoContent = e.target.parentElement.textContent;
    let todoElement;
    allTodos.map(function (item) {
      if (todoContent === item.todoInput) {
        todoElement = item;
        const todoIndex = allTodos.indexOf(todoElement);
        allTodos.splice(todoIndex, 1);
        localStorage.setItem("todos", JSON.stringify(allTodos));
      }
    });
  }
}

const myTodo = new Todo(false);

items.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("circle")) {
    e.target.classList.toggle("checked");
  } else if (e.target.classList.contains("delete")) {
    myTodo.delete(e)
    
  }
});

submit.addEventListener("click", function (e) {
  e.preventDefault();
  myTodo.new(todo.value);
});

document.addEventListener("DOMContentLoaded", function () {
  myTodo.render();
});
