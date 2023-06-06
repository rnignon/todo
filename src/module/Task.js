export default class Task {
    constructor (name, description, dueDate, project) {
        this._name = name;
        this._description = description;
        this._dueDate = dueDate;
        this._project = project;
    }

    getName() {
        return this._name;
    }

    setName(value) {
        this._name = value;
    }

    getDescription() {
        return this._description;
    }

    setDescription(value) {
        this._description = value;
    }

    getDueDate() {
        return this._dueDate;
    }

    setDueDate(value) {
        this._dueDate = value;
    }

    get project() {
        return this._project;
    }

    set project(value) {
        this._project = value;
    }
}