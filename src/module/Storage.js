import Task from "./Task";
import Project from "./Project";
import List from "./List";

export default class Storage {
    static saveList (list) {
        // alert(`save ${list.getProjects().length}`);
        // alert(`save ${list.getProjects()[1].getTitle()} ${list.getProjects()[1].getTasks().length}`);

        localStorage.setItem("list", JSON.stringify(list));
    }
    static getList () {
        const list = Object.assign(new List(), JSON.parse(localStorage.getItem("list")));
        if (list.getProjects().length <= 1) return new List();
        list.setProjects(list.getProjects().map(project => Object.assign(new Project(), project)));
        list.getProjects().forEach(project => project.setTasks(project.getTasks().map(task => Object.assign(new Task(), task))));
        return list;
    }

    static addProject (project) {
        const list = Storage.getList();
        list.addProject(project);
        Storage.saveList(list);
    }
    static deleteProject (project) {
        const list = Storage.getList();
        list.deleteProject(project);
        Storage.saveList(list);
    }
    static addTask (project, task) {
        const list = Storage.getList();
        list.getProject(project).addTask(task);
        Storage.saveList(list);
    }
    static deleteTask (project, task) {
        const list = Storage.getList();
        list.getProject(project).deleteTask(task);
        Storage.saveList(list);
    }
}