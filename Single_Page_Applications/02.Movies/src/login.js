import { showView } from "./dom.js";
import { showHome } from "./home.js";

const section = document.querySelector('#form-login');

section.querySelector('form').addEventListener('submit', onLogin);

section.remove();

export function showLogin(){

    showView(section);
}

async function onLogin(e){

    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get('email')
    const pass  = formData.get('password')

    const data = { email, pass }

    try {
        
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if(res.ok !== true){
            const err = await res.json();
            throw new Error(err.message);
        }

        const result = await res.json();

        localStorage.setItem('userData', JSON.stringify({
            email: result.email,
            id: result._id,
            token: result.accessToken
        }));

        e.target.reset();

        showHome();

    } catch (error) {
        alert(error.message);
    }
}