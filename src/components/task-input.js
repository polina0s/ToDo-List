import { Task } from "./task";
import { taskStorage } from "../lib/task-storage";

class TaskInput {
  constructor({ onTaskCreate }) {
    this.onTaskCreate = onTaskCreate;

    this.createSelectors();
    this.addEventListeners();
  }

  addEventListeners() {
    this.btnAdd.addEventListener("click", () => this.addTask(this.input.value));
    this.input.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        this.addTask(e.target.value);
      }
    });
  }

  createSelectors() {
    this.input = document.querySelector("#taskInput_text");
    this.btnAdd = document.querySelector("#taskInput_buttonAdd");
  }

  clearInput() {
    this.input.value = "";
  }

  addTask(value) {
    if (value !== "") {
      const task = new Task({ text: value, checked: false });

      const storageTasks = taskStorage.getTasks();
      storageTasks.push({
        text: value,
        checked: false,
        id: task.id,
      });

      taskStorage.setTasks(storageTasks);

      this.clearInput();
      this?.onTaskCreate(task.element);
    }
  }
}

export { TaskInput };
