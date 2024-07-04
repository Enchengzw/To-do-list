import '../style.css';
import { add, addDays, startOfToday,  } from 'date-fns';
import {display_one, display_all, new_to_do} from './dom.js';

const content = document.querySelector('.content');
const Today = document.getElementById('today');
const This_week = document.getElementById('week');
const add_button = document.querySelector('.add');
const body = document.body;
const project_list = document.querySelector('.project_list');
const my_projects = document.getElementById('project');

const week = next_days();
const week_tasks = [];
const projects_titles = [];
const projects = [];

var week_json = "";
var projects_json = "";
var projects_titles_json = "";

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
        week.push([choose_day(day.getDay())]);
        day = addDays(day, 1);
    }
    return week;
}

function Task(title, description, dueDate, priority, status) {
    return {title, description, dueDate, priority, status};
}

function initialize(week_tasks, projects, projects_titles) 
{
    let stored_week_tasks = JSON.parse(localStorage.getItem('week'));
    if (stored_week_tasks != null)
    {
        stored_week_tasks.forEach(to_do => {
            week_tasks.push(to_do);
        });
    }
    while (week_tasks.length < 7)
        week_tasks.push([]);
    if (localStorage.getItem('projects') != null)
    {
        let stored_projects = JSON.parse(localStorage.getItem('projects'));
        stored_projects.forEach(to_do => {
            projects.push(to_do);
        })
    }
    if (localStorage.getItem('projects_titles') != null)
    {
        let stored_projects_titles = JSON.parse(localStorage.getItem('projects_titles'));
        console.log(stored_projects_titles);
        stored_projects_titles.forEach(titles => {
            projects_titles.push(titles);
        })
    }
}

initialize(week_tasks, projects, projects_titles);

/* week_tasks.push([Task('000000000testssss', 'test', startOfToday(), 'low', 'done')]);
week_tasks[0].push(Task('00000000test', 'test', startOfToday(), 'low', 'done'));
week_tasks.push([Task('1111111test', 'test', startOfToday(), 'low', 'done')]);
week_tasks.push([Task('222222test', 'test', startOfToday(), 'low', 'done')]);
week_tasks.push([Task('3333test', 'test', startOfToday(), 'low', 'done')]);
week_tasks.push([Task('444444test', 'test', startOfToday(), 'low', 'done')]);
week_tasks.push([Task('5555555test', 'test', startOfToday(), 'low', 'done')]);
week_tasks.push([Task('6666666666666test', 'test', startOfToday(), 'low', 'done')]); */

This_week.addEventListener('click', () => {
    display_all(week_tasks, week, body, week_json, 'week');
});

Today.addEventListener('click', () => {
    display_one(week_tasks[0], week[0], body, week_tasks, week_json, 'week');
});

add_button.addEventListener('click', event => {
    event.stopPropagation();
    new_to_do(projects, projects_titles, project_list, body, projects_json, projects_titles_json, 'projects');
})

my_projects.addEventListener('click', () => {
  display_all(projects, projects_titles, body, projects_json, projects_titles_json, 'projects');
})

export {Task}