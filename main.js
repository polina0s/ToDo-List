document.addEventListener("DOMContentLoaded", bootstrap);

let tasks =
  JSON.parse(localStorage.getItem("tasks") ?? JSON.stringify([])) || [];

function makeid() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 20) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function createTask(data) {
  const task = document.createElement("div");
  const id = data.id ?? makeid();

  task.classList.add("task");
  task.id = id;
  task.innerHTML = `<div class="task_checkbox">
        <label class="task_checkbox-custom">
          <input type="checkbox" ${data.checked ? "checked" : ""} />
          <span></span>
        </label>
      </div>
      <input
        type="text"
        class="task_textString"
        data-id="task_textString"
        value="${data.text}"
      />
      <button class="task_deleteButton" data-id="task_deleteButton">
        <image
          src="/public/delete.png"
          alt="delete task"
          class="task_deleteButton-img"
        />
      </button>`;

  const deleteButton = task.querySelector(`[data-id="task_deleteButton"]`);
  const taskString = task.querySelector(`[data-id="task_textString"]`);

  const disableInput = (shouldDisable) => {
    if (shouldDisable) {
      taskString.setAttribute("disabled", "disabled");
    } else {
      taskString.removeAttribute("disabled");
    }
  };

  disableInput(data.checked);

  deleteButton.addEventListener("click", (e) => {
    const newList = tasks.filter((value) => {
      return value.id !== task.id;
    });
    task.remove();
    localStorage.setItem("tasks", JSON.stringify(newList));
    tasks = newList;
  });

  const checkbox = task.querySelector(`input`);
  checkbox.addEventListener("click", (e) => {
    let newState = e.target.checked;

    disableInput(newState);

    const updatedState = tasks.find((value) => value.id === task.id);

    console.log(tasks, task.id);

    if (updatedState) {
      updatedState.checked = newState;

      tasks = tasks.map((value) => {
        if (value.id === task.id) {
          return updatedState;
        } else {
          return value;
        }
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });

  taskString.addEventListener("input", (e) => {
    let newValue = e.target.value;

    const updatedTaskData = tasks.find((value) => value.id === task.id);

    if (updatedTaskData) {
      updatedTaskData.text = newValue;

      tasks = tasks.map((value) => {
        if (value.id === task.id) {
          return updatedTaskData;
        } else {
          return value;
        }
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });

  return task;
}

function bootstrap() {
  const taskInput = document.querySelector("#taskInput_text");
  const buttonAdd = document.querySelector("#taskInput_buttonAdd");
  const tasksList = document.querySelector("#tasksList");

  for (let i = 0; i < tasks.length; i++) {
    const task = createTask(tasks[i]);
    tasksList.append(task);
  }

  function addTask() {
    if (taskInput.value !== "") {
      const task = createTask({ text: taskInput.value, checked: false });
      tasks.push({
        text: taskInput.value,
        checked: false,
        id: task.id,
      });

      tasksList.append(task);

      localStorage.setItem("tasks", JSON.stringify(tasks));

      taskInput.value = "";
    }
  }

  taskInput.addEventListener("input", (e) => console.log(e.target.value));
  buttonAdd.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      addTask();
    }
  });
}
