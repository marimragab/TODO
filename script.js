const theme = document.getElementById("theme");
const newItem = document.getElementById("addItem");
const todoList = document.querySelector(".content ul");
const itemsLeft = document.querySelector(".items-left span");

itemsLeft.innerText = document.querySelectorAll(
  '.list-item input[type="checkbox"]:not(:checked)'
).length;

theme.addEventListener("click", () => {
  document.querySelector("body").classList = theme.checked
    ? "theme-light"
    : "theme-dark";
});

document.querySelector(".add-new-item span").addEventListener("click", () => {
  if (newItem.value.length > 0) {
    createNewTodoItem(newItem.value);
    newItem.value = "";
  }
});

newItem.addEventListener("keypress", (e) => {
  if (e.charCode === 13 && newItem.value.length > 0) {
    createNewTodoItem(newItem.value);
    newItem.value = "";
  }
});

function createNewTodoItem(text) {
  const elem = document.createElement("li");
  elem.classList.add("flex-row");

  elem.innerHTML = `
    <label class="list-item">
        <input type="checkbox" name="todoItem" />
        <span class="checkmark"></span>
        <span class="text">${text}</span>
    </label>
    <span class="remove"></span>`;

  if (
    document.querySelector('.filter input[type="radio"]:checked').id ===
    "completed"
  ) {
    elem.classList.add("hidden");
  }
  todoList.append(elem);
  updateItemsCount(1);
}

function updateItemsCount(number) {
  itemsLeft.innerText = +itemsLeft.innerText + number;
}

function removeTodoItem(item) {
  item.remove();
  updateItemsCount(-1);
}

todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    removeTodoItem(e.target.parentElement);
  }
});

document.querySelector(".clear").addEventListener("click", () => {
  document
    .querySelectorAll('.list-item input[type="checkbox"]:checked')
    .forEach((item) => {
      removeTodoItem(item.closest("li"));
    });
});

document.querySelectorAll(".filter input").forEach((radio) => {
  radio.addEventListener("change", (e) => {
    console.log(e.target.id);
    filterTodoItems(e.target.id);
  });
});

function filterTodoItems(id) {
  const allTodos = todoList.querySelectorAll("li");
  switch (id) {
    case "all":
      allTodos.forEach((item) => {
        item.classList.remove("hidden");
      });
      break;

    case "active":
      allTodos.forEach((item) => {
        const checkbox = item.querySelector("input");
        item.classList.toggle("hidden", checkbox.checked);
      });
      break;

    case "completed":
      allTodos.forEach((item) => {
        const checkbox = item.querySelector("input");
        item.classList.toggle("hidden", !checkbox.checked);
      });
      break;
  }
}
