import {Task} from './index.js';
import  Trash from '../trash_bin.svg'
import {display_task_dialog, new_to_do_dialog, display_task, get_task, modify_task, add_new_task} from './dialog.js';
import {setDragandDrop, get_drag_after_element} from './drag_drop.js';

function create_element_with_class(element, classname)
{
    let new_element = document.createElement(element);
    new_element.className = classname;
    return new_element;
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

function create_task_dom(Task, to_do_index) {
    let new_task = create_element_with_class('div', 'task');
    let title =  create_element_with_class('div', 'task_item');
    title.innerHTML = Task.title;;

    let container = create_element_with_class('div', 'button_container');
    let delete_button = create_element_with_class('img', 'delete');
    delete_button.setAttribute('src', Trash);
    let check_button =  create_element_with_class('input', 'task_item');
    check_button.type = 'checkbox';
    check_button.addEventListener('click', event => {
        event.stopPropagation();
    })

    container.append(check_button, delete_button)
    new_task.appendChild(container);
    new_task.appendChild(title);
    new_task.setAttribute('draggable', 'true');
    return new_task;
}

function create_todo_dom(to_do, to_do_title, to_do_array, to_do_index, tasks_data) {
    let list =  create_element_with_class('div', 'list');

    let title =  create_element_with_class('div', 'week_title');
    title.innerHTML = to_do_title;
    list.appendChild(title);

    let body =  create_element_with_class('div', 'task_list');
    var old_list;
    body.setAttribute('to_do_index', to_do_index);
    body.addEventListener('dragover', event => {
        event.preventDefault();
        let afterElement = get_drag_after_element(body, event.clientY);
        let drag_item = document.querySelector('.dragging');
        if (afterElement == null) {
            body.appendChild(drag_item);
        } else {
            body.insertBefore(drag_item, afterElement);
        }
    })
    let index = 0;
    to_do.forEach(task => {
        let new_task = create_task_dom(task);
        new_task.setAttribute('index', index);
        setDragandDrop(new_task, to_do_array, tasks_data);
        body.appendChild(new_task);
        new_task.addEventListener('click', () => {
            display_task(to_do, new_task, to_do_array, tasks_data);
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
            add_new_task(to_do, body, dialog, to_do_array, tasks_data);
            tasks_data = JSON.stringify(to_do_array);
        });
    });
    list.appendChild(add_task);
    return list;
}

function display_all(todo_array, titles, body, tasks_data) {
    let new_content =  create_element_with_class('div', 'content');

    let content = document.querySelector('.content');
    content.remove();
    for (let i = 0; i < todo_array.length; i++)
    {
        let to_add = create_todo_dom(todo_array[i], titles[i], todo_array, i, tasks_data);
        new_content.appendChild(to_add);
    }
    body.appendChild(new_content);
}

function display_one(todo_tasks, to_do_title, body, tasks_data)
{
    let new_content =  create_element_with_class('div', 'content');

    let content = document.querySelector('.content');
    content.remove();
    let to_do = create_todo_dom(todo_tasks, to_do_title,);
    new_content.appendChild(to_do);
    body.appendChild(new_content);
}

function new_to_do(todo_array, todo_title_arrays, todo_dom_list, body, tasks_data, to_do_titles_data)
{
    let dialog = new_to_do_dialog();
    let submit = dialog.querySelector('.dialog_close');
    let title = dialog.querySelector('.todo_title');
    body.appendChild(dialog);
    dialog.showModal();
    submit.addEventListener('click', () => {
        todo_title_arrays.push(title.value);
        let new_tab =  create_element_with_class('div', 'project_item');
        let dom_title = create_element_with_class('div', 'project_title');
        let delete_button = create_element_with_class('img', 'delete_todo');
        delete_button.setAttribute('src', Trash);
        delete_button.addEventListener('click', event => {
            event.stopPropagation();
            let parentElement = delete_button.parentElement;
            console.log(todo_array);
            todo_array.splice(parentElement.getAttribute('index'), 1);
            todo_title_arrays.splice(parentElement.getAttribute('index'), 1);
            update_dom_index(todo_dom_list);
            parentElement.remove();
            tasks_data = JSON.stringify(todo_array);
            to_do_titles_data = JSON.stringify(todo_title_arrays);
            display_all(todo_array, todo_title_arrays, body, tasks_data);
            console.log(todo_array);
        })
        dom_title.innerHTML = title.value;
        new_tab.append(dom_title, delete_button);
        new_tab.setAttribute('index', todo_array.length);
        todo_array.push([]);
        new_tab.addEventListener('click', () => {
            let index = new_tab.getAttribute('index');
            display_one(todo_array[index], todo_title_arrays[index], body);
        });
        todo_dom_list.appendChild(new_tab);
        dialog.remove();
        tasks_data = JSON.stringify(todo_array);
        to_do_titles_data = JSON.stringify(to_do_titles_data);
    })
}

export {display_one, display_all, new_to_do, get_drag_after_element, update_dom_index, create_element_with_class, modify_task};