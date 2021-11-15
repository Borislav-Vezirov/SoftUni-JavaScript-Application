import { register } from '../data.js';

const section = document.getElementById('register-page');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onRegister);
let ctx = null

export async function showRegisterPage(ctxTarget){
    
    ctx = ctxTarget;
    ctx.showSection(section);
}

async function onRegister(e){

    e.preventDefault();

    const formData = new FormData(e.target);

    const email    = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass   = formData.get('repeatPassword').trim();

    if(!email || !password){
        return alert('All fields are required');
    }
    
    if(password != rePass){
        return alert('Passwods don\'t match!');
    }

    await register(email, password);

    e.target.reset();

    ctx.goTo('home');
    ctx.updateNav();
}