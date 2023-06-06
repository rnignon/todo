export default class Project {
    constructor(title) {
        this._tasks = [];
        this._title = title;
    }

    getTitle() {
        return this._title;
    }

    setTitle(value) {
        this._title = value;
    }

    getTasks() {
        return this._tasks;
    }

    setTasks(value) {
        this._tasks = value;
    }

    getTask (name) {
        return this._tasks.find(task => task.getName() == name)
    }

    addTask (todo) {
        this._tasks.push(todo);
    }

    deleteTask (todo) {
        this._tasks = this._tasks.filter(task => task.getName() != todo);
    }
}