import Task from "./task.js";
import List from "./list.js";
import Project from "./project.js";
import Storage from "./Storage";

// let list = new List();

function createPage() {
    let list = Storage.getList();
    let todo = list.getProject("Todo");

    loadNav(list);
    loadSection(todo);
}
function loadNav(list) {
    const nav = document.querySelector("nav");
    nav.innerHTML = "";

    // const projects = list.getProjects();
    const projects = Storage.getList().getProjects();
    for (let project of projects) {
        nav.append(createButton(project));
    }

    const add_project = document.createElement("button");
    add_project.id = "add_button";
    add_project.textContent = "+ ADD PROJECT";
    add_project.addEventListener("click", () => {loadPopup("project")});

    nav.append(add_project);
}
function createButton(project) {
    const button = document.createElement("button");
    button.id = `${project.getTitle()}_button`;
    button.textContent = project.getTitle();
    button.addEventListener("click", () => {loadSection(project)});

    return button;
}

function loadSection (project) {
    const section = document.querySelector("section");
    section.innerHTML = "";
    section.id = `${project.getTitle()}`

    // let tasks = project.getTasks();
    let tasks = Storage.getList().getProject(project.getTitle()).getTasks();
    for (let task of tasks) {
        section.append(createTask(task));
    }

    const add_task = document.createElement("button");
    add_task.id = "add_task";
    add_task.textContent = "+ ADD TASK";
    add_task.addEventListener("click", () => {loadPopup("task")});

    section.append(add_task);
}

function loadPopup (type) {
    const popup = document.querySelector(`.${type}_popup`);
    const form = document.querySelector(`#${type}_form`);
    const background = document.querySelector(`.background`);
    const submit = document.querySelector(`#${type}_button`);
    popup.classList.remove("hidden");
    background.classList.remove("hidden");

    submit.addEventListener("click", e => {
        if (form.name.value != "") {
            e.preventDefault();
            if (type == "project") {
                Storage.addProject(new Project(form.name.value));
                loadNav(Storage.getList());
                // list.addProject(new Project(form.name.value));
                // loadNav(list);
            }
            else {
                let section = document.querySelector("section");
                // Storage.addTask(Storage.getList().getProject(section.id), new Task(form.name.value, form.description.value, form.date.value, section.id));
                Storage.addTask(section.id, new Task(form.name.value, form.description.value, form.date.value, section.id));
                loadSection(Storage.getList().getProject(section.id));
                // list.getProject(section.id).addTask(new Task(form.name.value, form.description.value, form.date.value, section.id));
                // loadSection(list.getProject(section.id));
            }
            closePopup(type);
        }
    });

    document.body.addEventListener("click", (event) => {
        if (event.target.classList == "background") {
            closePopup(type);
        }
    });
}

function closePopup (type) {
    const task_popup = document.querySelector(`.task_popup`);
    const project_popup = document.querySelector(`.project_popup`);
    const background = document.querySelector(".background");
    const form = document.querySelector(`#${type}_form`);

    task_popup.classList.add("hidden");
    project_popup.classList.add("hidden");
    background.classList.add("hidden");
    if (type == "project") {
        form.name.value = "";
    } else {
        form.name.value = "";
        form.description.value = "";
        form.date.value = "";
    }

}

function createTask(task) {
    const card = document.createElement("div");
    const element = document.createElement("div");
    const name = document.createElement("h2");
    const description = document.createElement("p");
    const dueDate = document.createElement("p");
    const check = document.createElement("input");

    card.id = `card_${task.getName().replaceAll(' ', '_')}`;
    element.classList.add("element");
    name.textContent = task.getName();
    description.textContent = task.getDescription();
    dueDate.textContent = task.getDueDate();
    check.type = "radio";
    check.id = `${task.getName().replaceAll(' ', '_')}_check`

    check.addEventListener("click", (e) => {
        let selected_card = document.querySelector(`#card_${task.getName().replaceAll(' ', '_')}`)
        let selected_project = Storage.getList().getProject(selected_card.parentNode.id);
        // let selected_project = list.getProject(selected_card.parentNode.id);

        selected_card.style.transform = "translateX(150%)";
        selected_card.style.transition = "transform 0.4s ease-in-out";
        Storage.deleteTask(selected_project.getTitle(), task.getName());
        // selected_project.deleteTask(task.getName());

        setTimeout(() => {loadSection(selected_project)}, 400);
    });

    element.append(name, description, dueDate);
    card.append(element, check);

    return card;
}

export default createPage;