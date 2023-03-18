import { Task } from "./task";
import { taskStorage } from "../lib/task-storage";

class TaskInput {
  constructor({ onTaskCreate }) {
    this.input = document.querySelector("#taskInput_text");
    this.btnAdd = document.querySelector("#taskInput_buttonAdd");
    this.onTaskCreate = onTaskCreate;

    this.tasks = taskStorage.getTasks();

    // переделать листенеры чтобы передавать значение инпута
    this.btnAdd.addEventListener("click", () => this.addTask(this.input.value));
    this.input.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        this.addTask(e.target.value);
      }
    });
  }

  // вместо того чтобы смотреть на значение инпута напрямую - использовать значение в аргументах (не забыть обнулить инпут)
  addTask(value) {
    if (value !== "") {
      const task = new Task({ text: value, checked: false });

      this.tasks.push({
        text: value,
        checked: false,
        id: task.id,
      });
      taskStorage.setTasks(this.tasks);
      this.input.value = "";

      this?.onTaskCreate(task.element);
    }
  }
}

export { TaskInput };
