const container = document.querySelector(".list-container");
const input = document.querySelector("#add-task");
const addTaskButton = document.querySelector(".add-btn");

let remainingList;
let todoList;
let completeCount = 0;
let totalCount;

if (localStorage.getItem("list")) {
  todoList = JSON.parse(localStorage.getItem("list"));

  todoList.map((item) => {
    const todoEl = document.createElement("div");
    const checkbox = document.createElement("input");
    const todoText = document.createElement("p");
    const deleteButton = document.createElement("button");

    const totalTask = document.querySelectorAll(".total-count");
    const completeTask = document.querySelector(".complete-count");

    todoEl.classList.add("todo", "flex-item");
    checkbox.setAttribute("type", "checkbox");
    deleteButton.classList.add("delete-btn");

    container.appendChild(todoEl);
    todoEl.appendChild(checkbox);
    todoEl.appendChild(todoText);
    todoEl.appendChild(deleteButton);

    todoText.textContent = item;
    deleteButton.innerHTML = ` <i class="fa-regular fa-trash-can"></i>`;

    totalCount = todoList.length;
    totalTask.forEach((task) => {
      task.textContent = totalCount;
    });

    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        todoText.classList.add("done");
        completeCount++;
        completeTask.textContent = completeCount;

        showPassNotification("Task Completed.");
      } else {
        todoText.classList.remove("done");
        completeCount--;
        completeTask.textContent = completeCount;
        showPassNotification("Task Undo.");
      }
    });

    deleteButton.addEventListener("click", () => {
      todoEl.classList.add("remove");
      setTimeout(() => {
        todoEl.remove();
      }, 250);

      showErrorNotification("Task Deleted.");

      if (checkbox.checked) {
        completeCount--;
        completeTask.textContent = completeCount;
      }

      remainingList = new Set(
        todoList.filter((list) => {
          return list != item;
        })
      );

      todoList = [...remainingList];

      if (localStorage.getItem("list")) {
        localStorage.setItem("list", JSON.stringify(todoList));
      }

      totalCount = todoList.length;
      totalTask.forEach((task) => {
        task.textContent = totalCount;
      });

      console.log(todoList);
    });
  });
} else {
  todoList = [];
}

// localStorage.clear();

addTaskButton.addEventListener("click", () => {
  if (input.value == "") {
    return;
  }

  let todoTask = input.value;
  let filterList = todoList.find((task) => {
    return task == todoTask;
  });

  if (filterList) {
    let content = `"${input.value}" has already been added.`;
    showErrorNotification(content);

    return;
  }

  todoList.push(input.value);

  const todoEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("p");
  const deleteButton = document.createElement("button");

  const totalTask = document.querySelectorAll(".total-count");
  const completeTask = document.querySelector(".complete-count");

  todoEl.classList.add("todo", "flex-item");
  checkbox.setAttribute("type", "checkbox");
  deleteButton.classList.add("delete-btn");

  container.appendChild(todoEl);
  todoEl.appendChild(checkbox);
  todoEl.appendChild(todoText);
  todoEl.appendChild(deleteButton);

  todoText.textContent = input.value;
  deleteButton.innerHTML = ` <i class="fa-regular fa-trash-can"></i>`;

  totalCount = todoList.length;
  totalTask.forEach((task) => {
    task.textContent = totalCount;
  });

  localStorage.setItem("list", JSON.stringify(todoList));
  showPassNotification("Task added.");

  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      todoText.classList.add("done");
      completeCount++;
      completeTask.textContent = completeCount;

      showPassNotification("Task Completed.");
    } else {
      todoText.classList.remove("done");
      completeCount--;
      completeTask.textContent = completeCount;
      showPassNotification("Task Undo.");
    }
  });

  deleteButton.addEventListener("click", () => {
    todoEl.classList.add("remove");
    setTimeout(() => {
      todoEl.remove();
    }, 250);

    showErrorNotification("Task Deleted.");

    totalCount--;
    totalTask.forEach((task) => {
      task.textContent = totalCount;
    });

    if (checkbox.checked) {
      completeCount--;
      completeTask.textContent = completeCount;
    }

    remainingList = new Set(
      todoList.filter((list) => {
        return list != todoTask;
      })
    );

    todoList = [...remainingList];

    localStorage.setItem("list", JSON.stringify(todoList));

    console.log(todoList);
  });

  input.value = "";
});

function showPassNotification(content) {
  const el = document.createElement("div");
  const text = document.createElement("p");
  const icon = document.createElement("i");
  document.querySelector(".notification-container").appendChild(el);
  el.appendChild(icon);
  el.appendChild(text);

  el.classList.add("notification");
  text.textContent = content;
  icon.classList.add("fa-solid", "fa-thumbs-up");
  icon.classList.add("complete-icon");

  setTimeout(() => {
    el.remove();
  }, 5000);
}

function showErrorNotification(content) {
  const el = document.createElement("div");
  const text = document.createElement("p");
  const icon = document.createElement("i");
  document.querySelector(".notification-container").appendChild(el);
  el.appendChild(icon);
  el.appendChild(text);

  el.classList.add("notification");
  text.textContent = content;
  icon.classList.add("fa-solid", "fa-circle-info", "delete-icon");

  setTimeout(() => {
    el.remove();
  }, 5000);
}
