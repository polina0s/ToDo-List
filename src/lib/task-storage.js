class TaskStorage {
  constructor() {
    this.getTasks();
    this.name = "tasks";
  }

  getTasks() {
    this.tasks =
      JSON.parse(localStorage.getItem(this.name) ?? JSON.stringify([])) || [];
    return this.tasks;
  }

  setTasks(arr) {
    this.tasks = arr;
    return localStorage.setItem(this.name, JSON.stringify(arr));
  }
}

const taskStorage = new TaskStorage();

export { taskStorage };
