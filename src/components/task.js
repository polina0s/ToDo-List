import { makeid } from "../lib/make-id";
import { taskStorage } from "../lib/task-storage";
import deleteImg from "../public/pictures/delete.png";

class Task {
  constructor(data) {
    this.createTaskElement({
      id: data?.id ?? makeid(),
      text: data.text,
      checked: data.checked,
    });

    this.createSelectors();
    this.disableInput(data.checked);
    this.listenEvents();
  }

  listenEvents() {
    this.addEditEvent();
    this.addDeleteEvent();
    this.addCheckEvent();
  }

  createSelectors() {
    this.taskText = this.element.querySelector(`[data-id="taskText"]`);
    this.checkbox = this.element.querySelector(`[data-id="checkbox"]`);
    this.deleteButton = this.element.querySelector(
      `[data-id="task_deleteButton"]`
    );
  }

  filterTasksById() {
    this.tasks = taskStorage.getTasks();
    const newList = this.tasks.filter((value) => {
      return value.id !== this.element.id;
    });
    return newList;
  }

  findTaskInStorageById() {
    this.tasks = taskStorage.getTasks();
    const taskData = this.tasks.find((value) => value.id === this.element.id);
    return taskData;
  }

  updateTaskList(updatedTaskData) {
    this.tasks = this.tasks.map((value) => {
      if (value.id === this.element.id) {
        return updatedTaskData;
      } else {
        return value;
      }
    });

    taskStorage.setTasks(this.tasks);
  }

  createTaskElement({ checked, text, id }) {
    this.element = document.createElement("div");
    this.element.classList.add("task");
    this.element.id = id;
    this.element.innerHTML = `<div class="task_checkbox">
        <label class="task_checkbox-custom">
          <input type="checkbox" data-id="checkbox" ${
            checked ? "checked" : ""
          } />
          <span></span>
        </label>
      </div>
      <input
        type="text"
        class="task_textString"
        data-id="taskText"
        value="${text}"
      />
      <button class="task_deleteButton" data-id="task_deleteButton">
        <image
          src="${deleteImg}"
          alt="delete task"
          class="task_deleteButton-img"
        />
      </button>`;

    return this.element;
  }

  addCheckEvent() {
    this.checkbox.addEventListener("click", (e) =>
      this.checkTask(e.target.checked)
    );
  }

  checkTask(checked) {
    this.disableInput(checked);

    const updatedState = this.findTaskInStorageById();

    if (updatedState) {
      updatedState.checked = checked;

      this.updateTaskList(updatedState);
    }
  }

  disableInput(shouldDisable) {
    if (shouldDisable) {
      this.taskText.setAttribute("disabled", "disabled");
    } else {
      this.taskText.removeAttribute("disabled");
    }
  }

  addEditEvent() {
    this.taskText.addEventListener("input", (e) =>
      this.editTaskText(e.target.value)
    );
  }

  editTaskText(value) {
    const updatedTaskData = this.findTaskInStorageById();

    if (updatedTaskData) {
      updatedTaskData.text = value;

      this.updateTaskList(updatedTaskData);
    }
  }

  addDeleteEvent() {
    this.deleteButton.addEventListener("click", () => this.deleteTask());
  }

  deleteTask() {
    const newList = this.filterTasksById();

    this.element.remove();
    taskStorage.setTasks(newList);
  }
}

export { Task };
