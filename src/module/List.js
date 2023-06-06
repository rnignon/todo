import Project from "./Project";

export default class List {
    constructor () {
        this._projects = [];
        this._projects.push(new Project("Todo"));
    }

    getProjects() {
        return this._projects;
    }

    setProjects(value) {
        this._projects = value;
    }

    getProject (title) {
        return this._projects.find(project => project.getTitle() == title)
    }

    addProject (project) {
        this._projects.push(project);
    }

    deleteProject (name) {
        this._projects = this._projects.splice(this._projects.findIndex(project => project.name == name), 1);
    }
}