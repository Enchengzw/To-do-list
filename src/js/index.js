import '../style.css';
import { add, addDays, startOfToday,  } from 'date-fns';
import {display_week} from './dom.js';

const content = document.querySelector('.content');
const Today = document.getElementById('today');
const This_week = document.getElementById('week');
const add_button = document.querySelector('.add');
const body = document.body;

const week = next_days();
const week_tasks = [];
const projects = [];

function choose_day(integer)
{
    switch (integer) {
        case 0:
            return ('Sunday');
        case 1:
            return ('Monday');
        case 2:
            return ('Tuesday');
        case 3:
            return ('Wednesday');
        case 4:
            return ('Thursday');
        case 5:
            return ('Friday');
        case 6:
            return ('Saturday');
    }
}

function next_days() {
    let week = [];
    let day = startOfToday();
    for(let i=0;i < 7; i++)
    {
        week.push(choose_day(day.getDay()));
        day = addDays(day, 1);
    }
    return week;
}

function Task(title, description, dueDate, priority, status) {
    return {title, description, dueDate, priority, status};
}

week_tasks.push([Task('testssssssssss ss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'test', startOfToday(), 'low', 'done')]);
week_tasks[0].push(Task('test', 'test', startOfToday(), 'low', 'done'));
week_tasks[0].push(Task('testssssssssss ss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'test', startOfToday(), 'low', 'done'));
week_tasks[0].push(Task('testssssssssss ss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'test', startOfToday(), 'low', 'done'));
week_tasks[0].push(Task('testssssssssss ss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'test', startOfToday(), 'low', 'done'));
week_tasks[0].push(Task('testssssssssss ss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'test', startOfToday(), 'low', 'done'));
week_tasks[0].push(Task('testssssssssss ss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'test', startOfToday(), 'low', 'done'));
week_tasks[0].push(Task('testssssssssss ss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'test', startOfToday(), 'low', 'done'));
week_tasks[0].push(Task('testssssssssss ss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'test', startOfToday(), 'low', 'done'));
week_tasks[0].push(Task('testssssssssss ss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'test', startOfToday(), 'low', 'done'));
week_tasks[0].push(Task('testssssssssss ss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'test', startOfToday(), 'low', 'done'));
week_tasks[0].push(Task('testssssssssss ss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'test', startOfToday(), 'low', 'done'));
week_tasks.push([Task('test', 'test', startOfToday(), 'low', 'done')]);
week_tasks.push([Task('test', 'test', startOfToday(), 'low', 'done')]);
week_tasks.push([Task('test', 'test', startOfToday(), 'low', 'done')]);
week_tasks.push([Task('test', 'test', startOfToday(), 'low', 'done')]);
week_tasks.push([Task('test', 'test', startOfToday(), 'low', 'done')]);
week_tasks.push([Task('test', 'test', startOfToday(), 'low', 'done')]);


This_week.addEventListener('click', () => {
    display_week(week_tasks, week, body);
});

export {Task}