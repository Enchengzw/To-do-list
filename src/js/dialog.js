import {
  create_element_with_class,
  create_task_dom,
  setDeleteTask,
} from "./dom.js";
import { Task } from "./index.js";
import { setDragandDrop } from "./drag_drop.js";

function display_task_dialog() {
  let dialog = create_element_with_class("dialog", "dialog_box");

  let title = create_element_with_class("div", "dialog_title");
  title.innerHTML = "Title";

  let title_input = create_element_with_class("textarea", "dialog_title_body");
  title_input.placeholder = "Please write the title here";

  let description = create_element_with_class("div", "dialog_description");
  description.innerHTML = "Description";

  let description_input = create_element_with_class(
    "textarea",
    "dialog_description_body"
  );
  description_input.placeholder = "Please write the details here";

  var submit = create_element_with_class("input", "dialog_close");
  submit.type = "submit";

  dialog.append(title, title_input, description, description_input, submit);
  return dialog;
}

function new_to_do_dialog() {
  let dialog = create_element_with_class("dialog", "to_do_dialog");

  let title = create_element_with_class("input", "to_do_title");

  var submit = create_element_with_class("input", "dialog_close");
  submit.type = "submit";
  dialog.append(title, submit);
  return dialog;
}

function display_task(
  to_do,
  task_dom,
  to_do_array,
  tasks_data,
  data_identifier
) {
  let dialog = display_task_dialog();
  let document_body = document.body;
  document_body.appendChild(dialog);

  let title = dialog.querySelector(".dialog_title_body");
  let description = dialog.querySelector(".dialog_description_body");
  let submit = dialog.querySelector(".dialog_close");

  title.value = to_do[task_dom.getAttribute("index")].title;
  description.value = to_do[task_dom.getAttribute("index")].description;
  submit.addEventListener("click", () => {
    modify_task(to_do, dialog, task_dom);
    tasks_data = JSON.stringify(to_do_array);
    localStorage.setItem(data_identifier, tasks_data);
  });
  dialog.showModal();
}

function modify_task(task_array, dialog, dom_task) {
  let task = get_task(dialog);
  task_array.splice(dom_task.getAttribute("index"), 1, task);
  let title = dom_task.querySelector("div.task_item");
  title.innerHTML = task.title;
  dialog.remove();
}

function add_new_task(task_array, list_dom, dialog, to_do_array, tasks_data) {
  let task = get_task(dialog);
  task_array.push(task);
  let dom_task = create_task_dom(task);
  dom_task.setAttribute("index", task_array.length);
  setDragandDrop(dom_task, to_do_array, tasks_data);
  dom_task.addEventListener("click", () => {
    display_task(task_array, dom_task, to_do_array, tasks_data);
  });
  let delete_button = dom_task.querySelector(".delete");
  delete_button.addEventListener("click", (event) => {
    event.stopPropagation();
    setDeleteTask(dom_task, task_array, list_dom, to_do_array, tasks_data);
  });
  list_dom.appendChild(dom_task);
  dialog.remove();
}

function get_task(dialog) {
  let title = dialog.querySelector(".dialog_title_body");
  let description = dialog.querySelector(".dialog_description_body");
  let new_task = Task(title.value, description.value);
  return new_task;
}

export {
  display_task_dialog,
  new_to_do_dialog,
  display_task,
  get_task,
  modify_task,
  add_new_task,
};
