class TaskStorage {
  constructor() {
    this.tasks = this.getTasks();
  }

  getTasks() {
    return (
      JSON.parse(localStorage.getItem("tasks") ?? JSON.stringify([])) || []
    );
  }

  setTasks(arr) {
    this.tasks = arr;
    return localStorage.setItem("tasks", JSON.stringify(arr));
  }
}

const taskStorage = new TaskStorage();

export { taskStorage };
