// import { makeid } from "./src/lib/make-id";
import { taskStorage } from "./src/lib/task-storage";
import { Task } from "./src/components/task";
document.addEventListener("DOMContentLoaded", bootstrap);

let tasks = taskStorage.getTasks();

function bootstrap() {
  const taskInput = document.querySelector("#taskInput_text");
  const buttonAdd = document.querySelector("#taskInput_buttonAdd");
  const tasksList = document.querySelector("#tasksList");

  for (let i = 0; i < tasks.length; i++) {
    const task = new Task(tasks[i]);
    tasksList.append(task.task);
  }

  function addTask() {
    if (taskInput.value !== "") {
      const task = new Task({ text: taskInput.value, checked: false });

      tasks.push({
        text: taskInput.value,
        checked: false,
        id: task.id,
      });

      tasksList.append(task.task);

      taskStorage.setTasks(tasks);

      taskInput.value = "";
    }
  }

  buttonAdd.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      addTask();
    }
  });
}
