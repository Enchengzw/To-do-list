import '../style.css';
import { add, addDays, startOfToday,  } from 'date-fns';
import {display_one, display_all, new_to_do, create_tab} from './dom.js';

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

function initialize_one(array, key)
{
    let stored_data = JSON.parse(localStorage.getItem(key));
    if (stored_data != null)
    {
        stored_data.forEach(object => {
            array.push(object);
        });
    }
}

function initialize(week_tasks, projects, projects_titles) 
{
    initialize_one(week_tasks, 'week');
    while (week_tasks.length < 7)
        week_tasks.push([]);
    initialize_one(projects, 'projects');
    initialize_one(projects_titles, 'projects_titles');
    for(let i = 0; i < projects.length; i++){
        create_tab(projects_titles[i], projects, projects_titles, project_list, body, projects_json, projects_titles_json, 'projects', i);
    }
}

initialize(week_tasks, projects, projects_titles);

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