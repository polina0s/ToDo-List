document.addEventListener("DOMContentLoaded", bootstrap);

function createTask(text, checked) {
  const task = document.createElement("div");

  task.classList.add("task");
  task.innerHTML = `<div class="task_checkbox">
        <label class="task_checkbox-custom">
          <input type="checkbox" ${checked ? "checked" : ""} />
          <span></span>
        </label>
      </div>
      <input
        type="text"
        class="task_textString"
        data-id="task_textString"
        value="${text}"
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

  deleteButton.addEventListener("click", (e) => {
    task.remove();
  });

  const checkbox = task.querySelector(`input`);
  checkbox.addEventListener("click", (e) => {
    if (checkbox.checked) {
      taskString.setAttribute("disabled", "disabled");
    } else {
      taskString.removeAttribute("disabled");
    }
  });

  // taskString.addEventListener("input", (e) => {
  //   let newValue = e.target.value;
  //   console.log(newValue);
  //   taskString.setAttribute("value", `${newValue}`);
  // });

  return task;
}

function bootstrap() {
  const taskInput = document.querySelector("#taskInput_text");
  const buttonAdd = document.querySelector("#taskInput_buttonAdd");
  const tasksList = document.querySelector("#tasksList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

  for (let i = 0; i < tasks.length; i++) {
    const task = createTask(tasks[i].text, tasks[i].checked);
    tasksList.append(task);
  }

  function addTask() {
    if (taskInput.value !== "") {
      tasks.push({
        text: taskInput.value,
        checked: false,
      });

      const task = createTask(taskInput.value, false);
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

  const taskString = document.querySelector(".task_textString");
  taskString.addEventListener("input", (e) => {
    let newValue = e.target.value;
    console.log(newValue);

    tasks.push({
      text: e.target.value,
      checked: false,
    });

    localStorage.setItem("tasks", JSON.stringify( ));

    taskString.setAttribute("value", `${newValue}`);
  });
}
