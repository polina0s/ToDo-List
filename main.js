document.addEventListener("DOMContentLoaded", bootstrap);

function bootstrap() {
  const taskInput = document.querySelector("#taskInput_text");
  const buttonAdd = document.querySelector("#taskInput_buttonAdd");
  const tasksList = document.querySelector("#tasksList");

  let tasks = [];

  taskInput.addEventListener("input", (e) => console.log(e.target.value));
  buttonAdd.addEventListener("click", (e) => {
    if (taskInput.value !== "") {
      tasks.push(taskInput.value);

      const task = document.createElement("div"); // <div></div>
      task.classList.add("task"); // <div class="task"></div>
      task.innerHTML = `<div class="task_checkbox">
          <input
            type="checkbox"
            class="task_checkbox-custom"
            id="checkboxCustom"
          />
          <label for="checkboxCustom"></label>
        </div>
        <div class="task_text">
          <p class="task_textString">${taskInput.value}</p>
        </div>
        <button class="task_deleteButton">
          <image
            src="/public/delete.png"
            alt="delete task"
            class="task_deleteButton-img"
          />
        </button>
        <button class="task_editButton">
          <image
            src="/public/edit.png"
            alt="edit task"
            class="task_editButton-img"
          />
        </button>`; // <div class="task"> <p>${taskInput.value}</p> </div>
      tasksList.append(task); //<div class="taskList" id="taskList">  <div class="task"> <p>${taskInput.value}</p> </div> </div>

      taskInput.value = "";
    }
  });
}
