import "./style.css";

import { createElement } from "./utils/createElement";

import {  createFindUsPage } from "./functions/createFindUsPage";
import { createHomePage } from "./functions/createHomePage";
import { createMenuPage } from "./functions/createMenuPage";

const content = document.getElementById('content');

const homeLink = document.getElementById('home-link');
const menuLink = document.getElementById('menu-link');
const findUsLink = document.getElementById('find-us-link');

document.getElementById('current-year').textContent = new Date().getFullYear();

const create = (func) => {
    content.innerHTML = '';
    const page = func(createElement);
    content.append(page);
}

document.addEventListener("DOMContentLoaded", () => {
    content.innerHTML = '';
    const homeContent = createHomePage(createElement);
    content.append(homeContent);

    homeLink.addEventListener('click', (evt) => {
        evt.preventDefault();
        create(createHomePage);
    })

    menuLink.addEventListener('click', (evt) => {
        evt.preventDefault();
        create(createMenuPage);
    })

    findUsLink.addEventListener('click', (evt) => {
        evt.preventDefault();
        create(createFindUsPage);
    })

});