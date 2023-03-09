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

      deleteButton.addEventListener("click", (e) => {
        task.remove();
      });

      // TODO: selector на клик лейбла, находить в нем чекбокс и переключать состояние
      const checkbox = task.querySelector(`label`);
      checkbox.addEventListener("click", (e) => {
        console.log(checkbox.querySelector("input"));
      });
    }
  });
}
