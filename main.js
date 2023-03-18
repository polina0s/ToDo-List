import { TaskList } from "./src/components/task-list";
import { taskStorage } from "./src/lib/task-storage";
import { TaskInput } from "./src/components/task-input";
import { Task } from "./src/components/task";

function bootstrap() {
  const taskList = new TaskList();
  new TaskInput({
    onTaskCreate: taskList.appendTask.bind(taskList),
  });

  renderInitialTasks(taskList);
}

function renderInitialTasks(taskList) {
  const initialTasks = taskStorage.getTasks();

  initialTasks.forEach((taskData) => {
    const task = new Task(taskData);
    taskList.appendTask(task.element);
  });
}

document.addEventListener("DOMContentLoaded", bootstrap);
