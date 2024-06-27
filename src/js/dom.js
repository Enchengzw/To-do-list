import {Task} from './index.js';

function create_task_dom(Task) {
    let new_task = document.createElement('div');
    new_task.className = 'task';

    let title = document.createElement('div');
    title.className = 'task_item';
    title.innerHTML = Task.title;;

    var Button = document.createElement('input');
    Button.type = 'checkbox';
    Button.className = 'task_item';

    new_task.appendChild(Button);
    new_task.appendChild(title);

    return new_task;
}

function create_day_dom(day, weekday) {
    let list = document.createElement('div');
    list.className = 'list';
    
    let title = document.createElement('div');
    title.className = 'week_title';
    title.innerHTML = weekday;
    list.appendChild(title);

    let body = document.createElement('div');
    body.className = 'task_list';

    let index = 0;
    day.forEach(task => {
        let new_task = create_task_dom(task);
        new_task.setAttribute('index', index);
        body.appendChild(new_task);
        new_task.addEventListener('click', () => {
            let dialog = display_dialog();
            list.appendChild(dialog);
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

    let add_task = document.createElement('button');
    add_task.className = 'add_task';
    add_task.innerHTML = 'Add new task';
    add_task.addEventListener('click', () => {
        let dialog = display_dialog();
        list.appendChild(dialog);
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
    dom_task.setAttribute('index', list_dom.length);
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

function display_dialog()
{
    let dialog = document.createElement('dialog');
    dialog.className = 'dialog_box';

    let title = document.createElement('div');
    title.className = 'dialog_title';
    title.innerHTML = 'Title';

    let title_input = document.createElement('textarea');
    title_input.className = 'dialog_title_body';
    title_input.placeholder = 'Please write the title here';

    let description = document.createElement('div');
    description.className = 'dialog_description';
    description.innerHTML = 'Description';

    let description_input = document.createElement('textarea');
    description_input.className = 'dialog_description_body';
    description_input.placeholder = 'Please write the details here';

    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.className = 'dialog_close';

    dialog.append(title, title_input, description, description_input, submit);
    return dialog;
}

function display_week(week_tasks, weekday, body) {
    let new_content = document.createElement('div');
    new_content.className = 'content';

    let content = document.querySelector('.content');
    content.remove();
    let i = 0;
    week_tasks.forEach (day => {
        let to_add = create_day_dom(day, weekday[i]);
        new_content.appendChild(to_add);
        i++;
    })
    body.appendChild(new_content);
}

export {display_week};