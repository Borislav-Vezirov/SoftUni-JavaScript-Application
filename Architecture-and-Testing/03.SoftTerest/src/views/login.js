import { login } from '../data.js';
import { el, showSection } from '../dom.js';

const section = document.getElementById('login-page');

section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onLogin);
let ctx = null

export async function showLoginPage(ctxTarget){
    ctx = ctxTarget;
    ctx.showSection(section);
}

async function onLogin(e){

    e.preventDefault();

    const formData = new FormData(e.target);

    const email    = formData.get('email').trim();
    const password = formData.get('password').trim();

    await login(email, password);

    e.target.reset();

    ctx.goTo('home');
    ctx.updateNav();
}