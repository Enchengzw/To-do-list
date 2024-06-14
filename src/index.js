import {SetHome} from './home.js';
import {SetContact} from './contact.js';
import './style.css';

const home = document.querySelector('.home');
const menu = document.querySelector('.about');
const contact = document.querySelector('.contact');
const body = document.body;


function displayHome()
{
    let content = document.getElementById('content');
    content.remove();
    let new_content = document.createElement('div');
    new_content.id = 'content';
    body.appendChild(new_content);
    SetHome();
}

function displayContact()
{
    let content = document.getElementById('content');
    content.remove();
    let new_content = document.createElement('div');
    new_content.id = 'content';
    body.appendChild(new_content);
    SetContact();
}

home.addEventListener('click', displayHome);
contact.addEventListener('click', displayContact);
displayHome();