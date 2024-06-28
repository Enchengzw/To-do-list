import {Task} from './index.js';
import  Trash from '../trash_bin.svg'

function create_element_with_class(element, classname)
{
    let new_element = document.createElement(element);
    new_element.className = classname;
    return new_element;
}

function create_task_dom(Task) {
    let new_task = create_element_with_class('div', 'task');
    let title =  create_element_with_class('div', 'task_item');
    title.innerHTML = Task.title;;

    let container = create_element_with_class('div', 'button_container');
    let delete_button = create_element_with_class('img', 'delete');
    delete_button.setAttribute('src', Trash);
    let check_button =  create_element_with_class('input', 'task_item');
    check_button.type = 'checkbox';

    container.append(check_button, delete_button)
    new_task.appendChild(container);
    new_task.appendChild(title);

    return new_task;
}

function create_day_dom(day, weekday) {
    let list =  create_element_with_class('div', 'list');

    let title =  create_element_with_class('div', 'week_title');
    title.innerHTML = weekday;
    list.appendChild(title);

    let body =  create_element_with_class('div', 'task_list');

    let index = 0;
    day.forEach(task => {
        let new_task = create_task_dom(task);
        new_task.setAttribute('index', index);
        body.appendChild(new_task);
        
        let delete_button = new_task.querySelector('.delete');
        delete_button.addEventListener('click', (event) => {
            day.splice(new_task.getAttribute('index'), 1);
            new_task.remove();
            update_dom_index(body);
            event.stopPropagation();
        })

        new_task.addEventListener('click', () => {
            let dialog = display_task_dialog();
            let document_body = document.body;
            document_body.appendChild(dialog);

            let title = dialog.querySelector('.dialog_title_body');
            let description = dialog.querySelector('.dialog_description_body');
            let submit = dialog.querySelector('.dialog_close');

            title.value = task.title;
            description.value = task.description;
            submit.addEventListener('click', () =>{
                modify_task(day, dialog, new_task);
            });
            dialog.showModal();
        })
        index++;
    })
    list.appendChild(body);

    let add_task =  create_element_with_class('button', 'add_task');
    add_task.innerHTML = 'Add new task';
    add_task.addEventListener('click', () => {
        let dialog = display_task_dialog();
        let document_body = document.body;
        document_body.appendChild(dialog);
        let submit = dialog.querySelector('.dialog_close');
        dialog.showModal();
        submit.addEventListener('click', () =>{
            add_new_task(day, body, dialog);
        });
    });
    list.appendChild(add_task);
    return list;
}

function modify_task(task_array, dialog, dom_task)
{
    let task = get_task(dialog);
    task_array.splice(dom_task.getAttribute('index'), 1, task);
    let title = dom_task.querySelector('div.task_item');
    title.innerHTML = task.title;
    dialog.remove();
}

function add_new_task(task_array, list_dom, dialog)
{
    let task = get_task(dialog);
    task_array.push(task);
    let dom_task = create_task_dom(task);
    dom_task.setAttribute('index', task_array.length);
    list_dom.appendChild(dom_task);
    dialog.remove();
}

function get_task(dialog)
{
    let title = dialog.querySelector('.dialog_title_body');
    let description = dialog.querySelector('.dialog_description_body');
    let new_task = Task(title.value, description.value, 'whatever');
    return new_task;
}

function display_task_dialog()
{
    let dialog =  create_element_with_class('dialog', 'dialog_box');

    let title =  create_element_with_class('div', 'dialog_title');
    title.innerHTML = 'Title';

    let title_input =  create_element_with_class('textarea', 'dialog_title_body');
    title_input.placeholder = 'Please write the title here';

    let description =  create_element_with_class('div', 'dialog_description');
    description.innerHTML = 'Description';

    let description_input =  create_element_with_class('textarea', 'dialog_description_body');
    description_input.placeholder = 'Please write the details here';

    var submit =  create_element_with_class('input', 'dialog_close');
    submit.type = 'submit';

    dialog.append(title, title_input, description, description_input, submit);
    return dialog;
}

function display_all(todo_array, titles, body) {
    let new_content =  create_element_with_class('div', 'content');

    let content = document.querySelector('.content');
    content.remove();
    let i = 0;
    todo_array.forEach (task => {
        let to_add = create_day_dom(task, titles[i]);
        new_content.appendChild(to_add);
        i++;
    })
    body.appendChild(new_content);
}

function display_one(todo_tasks, to_do_title, body)
{
    let new_content =  create_element_with_class('div', 'content');

    let content = document.querySelector('.content');
    content.remove();
    let to_do = create_day_dom(todo_tasks, to_do_title);
    new_content.appendChild(to_do);
    body.appendChild(new_content);
}

function new_to_do_dialog()
{
    let dialog =  create_element_with_class('dialog', 'todo_dialog');

    let title =  create_element_with_class('input', 'todo_title');

    var submit =  create_element_with_class('input', 'dialog_close');
    submit.type = 'submit';
    dialog.append(title, submit);
    return dialog;
}

function new_to_do(todo_array, todo_title_arrays, todo_dom_list, body)
{
    let dialog = new_to_do_dialog();
    let submit = dialog.querySelector('.dialog_close');
    let title = dialog.querySelector('.todo_title');
    body.appendChild(dialog);
    dialog.showModal();
    submit.addEventListener('click', () => {
        todo_title_arrays.push(title.value);
        let new_tab =  create_element_with_class('div', 'project_item');
        new_tab.innerHTML = title.value;
        todo_array.push([]);
        new_tab.setAttribute('index', todo_array.length);
        new_tab.addEventListener('click', () => {
            let index = new_tab.getAttribute('index');
            display_one(todo_array[index - 1], todo_title_arrays[index - 1], body);
        });
        todo_dom_list.appendChild(new_tab);
        dialog.remove();
    })
}

function update_dom_index(list_dom)
{
    let i = 0;
    let childs = list_dom.childNodes;
    childs.forEach(element => {
        element.setAttribute('index', i);
        i++;
    })
}

export {display_one, display_all, new_to_do};