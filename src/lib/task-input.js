import { Task } from "./src/components/task";
import { taskStorage } from "./task-storage";

class TaskInput {
  constructor() {
    this.input = document.querySelector("#taskInput_text");
    this.btnAdd = document.querySelector("#taskInput_buttonAdd");
    this.taskList = document.querySelector("#tasksList");
  }

  appendTasks() {
    for (let i = 0; i < tasks.length; i++) {
      const task = new Task(tasks[i]);
      tasksList.append(task.task);
    }
  }

  addTask() {
    if (taskInput.value !== "") {
      const task = new Task({ text: taskInput.value, checked: false });

      const newTaskList = [...taskStorage.getTasks(), task];

      tasksList.append(task.task);

      taskStorage.setTasks(newTaskList);

      taskInput.value = "";
    }
  }
}
