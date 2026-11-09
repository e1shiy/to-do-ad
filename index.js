const defaultTasks = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const templateElement = document.querySelector("#to-do__item-template");

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks === null ? defaultTasks : JSON.parse(savedTasks);
}

function createItem(item) {
  const clone = templateElement.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    saveTasks(getTasksFromDOM());
  });

  duplicateButton.addEventListener("click", () => {
    const newItem = createItem(textElement.textContent);
    listElement.prepend(newItem);
    saveTasks(getTasksFromDOM());
  });

  editButton.addEventListener("click", () => {
    textElement.contentEditable = "true";
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.contentEditable = "false";
    saveTasks(getTasksFromDOM());
  });

  return clone;
}

function getTasksFromDOM() {
  const itemTextElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemTextElements.forEach((element) => {
    tasks.push(element.textContent);
  });
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = inputElement.value.trim();
  if (!task) return;

  listElement.prepend(createItem(task));
  saveTasks(getTasksFromDOM());
  inputElement.value = "";
});

const tasks = loadTasks();
tasks.forEach((task) => {
  listElement.append(createItem(task));
});
