document.addEventListener("DOMContentLoaded", bootstrap);

function bootstrap() {
  const taskInput = document.querySelector("#taskInput_text");
  const buttonAdd = document.querySelector("#taskInput_buttonAdd");
  const tasksList = document.querySelector("#tasksList");
  let tasks = [];
  function addDelete() {
    if (taskInput.value !== "") {
      tasks.push(taskInput.value);

      const task = document.createElement("div");
      task.classList.add("task");
      task.innerHTML = `<div class="task_checkbox">
        <label class="task_checkbox-custom">
          <input type="checkbox" />
          <span></span>
        </label>
      </div>
      <input
        type="text"
        class="task_textString"
        data-id="task_textString"
        value="${taskInput.value}"
      />
      <button class="task_deleteButton" data-id="task_deleteButton">
        <image
          src="/public/delete.png"
          alt="delete task"
          class="task_deleteButton-img"
        />
      </button>`;
      tasksList.append(task);

      taskInput.value = "";

      const deleteButton = task.querySelector(`[data-id="task_deleteButton"]`);
      const taskString = task.querySelector(`[data-id="task_textString"]`);

      deleteButton.addEventListener("click", (e) => {
        task.remove();
      });

      const checkbox = task.querySelector(`input`);
      checkbox.addEventListener("click", (e) => {
        console.log(11111);
        if (checkbox.checked) {
          taskString.setAttribute("disabled", "disabled");
        } else {
          taskString.removeAttribute("disabled");
        }
      });
    }
  }

  taskInput.addEventListener("input", (e) => console.log(e.target.value));
  buttonAdd.addEventListener("click", addDelete);
  taskInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      addDelete();
    }
  });
}
