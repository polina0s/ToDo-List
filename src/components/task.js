import { makeid } from "../lib/make-id";
import { taskStorage } from "../lib/task-storage";

class Task {
  constructor(data) {
    this.id = data?.id ?? makeid();
    this.text = data.text;
    this.checked = data.checked;
    this.task = document.createElement("div");

    this.createTask();

    this.taskString = this.task.querySelector(`[data-id="task_textString"]`);

    this.disableInput(this.checked);
    this.editTaskText();
    this.deleteTask();
    this.checkbox();
  }

  createTask() {
    this.task.classList.add("task");
    this.task.id = this.id;
    this.task.innerHTML = `<div class="task_checkbox">
        <label class="task_checkbox-custom">
          <input type="checkbox" ${this.checked ? "checked" : ""} />
          <span></span>
        </label>
      </div>
      <input
        type="text"
        class="task_textString"
        data-id="task_textString"
        value="${this.text}"
      />
      <button class="task_deleteButton" data-id="task_deleteButton">
        <image
          src="/public/delete.png"
          alt="delete task"
          class="task_deleteButton-img"
        />
      </button>`;
  }

  checkbox() {
    const checkbox = this.task.querySelector(`input`);
    checkbox.addEventListener("click", (e) => {
      let newState = e.target.checked;
      this.tasks = taskStorage.getTasks();

      this.disableInput(newState);

      const updatedState = this.tasks.find(
        (value) => value.id === this.task.id
      );

      if (updatedState) {
        updatedState.checked = newState;

        this.tasks = this.tasks.map((value) => {
          if (value.id === this.task.id) {
            return updatedState;
          } else {
            return value;
          }
        });

        taskStorage.setTasks(this.tasks);
      }
    });
  }

  disableInput(shouldDisable) {
    if (shouldDisable) {
      this.taskString.setAttribute("disabled", "disabled");
    } else {
      this.taskString.removeAttribute("disabled");
    }
  }

  editTaskText() {
    this.taskString.addEventListener("input", (e) => {
      let newValue = e.target.value;
      this.tasks = taskStorage.getTasks();

      const updatedTaskData = this.tasks.find(
        (value) => value.id === this.task.id
      );
      if (updatedTaskData) {
        updatedTaskData.text = newValue;
        this.tasks = this.tasks.map((value) => {
          if (value.id === this.task.id) {
            return updatedTaskData;
          } else {
            return value;
          }
        });
        taskStorage.setTasks(this.tasks);
      }
    });
  }

  deleteTask() {
    const deleteButton = this.task.querySelector(
      `[data-id="task_deleteButton"]`
    );

    deleteButton.addEventListener("click", (e) => {
      this.tasks = taskStorage.getTasks();
      const newList = this.tasks.filter((value) => {
        return value.id !== this.task.id;
      });
      this.task.remove();
      taskStorage.setTasks(newList);
    });
  }
}

export { Task };
