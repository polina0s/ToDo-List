class TaskList {
  constructor() {
    this.taskList = document.querySelector("#tasksList");
  }

  appendTask(element) {
    this.taskList.append(element);
  }
}

export { TaskList };
