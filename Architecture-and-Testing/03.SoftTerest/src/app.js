import { showSection } from "./dom.js"
import { showCatalogPage } from "./views/catalog.js"
import { showCreatePage } from "./views/create.js"
import { showHomePage } from "./views/home.js"
import { showLoginPage } from "./views/login.js"
import { showRegisterPage } from "./views/register.js"

const links = {
    'home-link'    : 'home',
    'catalog-link' : 'catalog',
    'create-link'  : 'create',
    'login-link'   : 'login',
    'register-link': 'register',
    'details-link' : 'details'
}

const views = {
    'home'    : showHomePage,
    'catalog' : showCatalogPage,
    'create'  : showCreatePage,
    'login'   : showLoginPage,
    'register': showRegisterPage
}

const nav = document.querySelector('nav');

nav.addEventListener('click', onNavigate);

const ctx = {

    goTo,
    showSection
}

goTo('home');

function onNavigate(e){

    const name = links[e.target.parentElement.id];

    if(name){
        e.preventDefault();
        goTo(name);
    }
}

function goTo(name, ...params){

    const view = views[name];

    if(typeof view == 'function'){
        view(ctx, ... params);
    }
}

function updateNav(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if(userData != null){
        [...nav.querySelectorAll('.user')].forEach(x => x.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(x => x.style.display = 'none');
    }else{
        [...nav.querySelectorAll('.user')].forEach(x => x.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(x => x.style.display = 'block');
    }
}