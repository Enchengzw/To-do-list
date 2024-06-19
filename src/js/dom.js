function create_task_dom(Task) {
    let new_task = document.createElement('div');

    let title = document.createElement('div');
    title.className = 'task_item';
    title.innerHTML = Task.title;;

    var radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.className = 'task_item';

    new_task.appendChild(radioButton);
    new_task.appendChild(title)
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

    day.forEach(task => {
        let new_task = create_task_dom(task);
        new_task.className = 'task';
        body.appendChild(new_task);
    })
    list.appendChild(body);

    let add_task = document.createElement('button');
    add_task.className = 'add_task';
    add_task.innerHTML = 'Add new task';
    list.appendChild(add_task);
    return list;
}

function display_week(week_tasks, weekday, body) {
    let new_content = document.createElement('div');
    new_content.className = 'content';

    let content = document.querySelector('.content');
    content.remove();
    let i = 0;
    week_tasks.forEach (day => {
        let to_add = create_day_dom(day, weekday[i]);
        console.log(i);
        console.log(weekday[i]);
        new_content.appendChild(to_add);
        i++;
    })
    body.appendChild(new_content);
}

export {display_week};