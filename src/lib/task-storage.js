class TaskStorage {
  constructor() {
    this.getTasks();
  }

  getTasks() {
    this.tasks =
      JSON.parse(localStorage.getItem("tasks") ?? JSON.stringify([])) || [];
    return this.tasks;
  }

  setTasks(arr) {
    this.tasks = arr;
    return localStorage.setItem("tasks", JSON.stringify(arr));
  }
}

const taskStorage = new TaskStorage();

export { taskStorage };
