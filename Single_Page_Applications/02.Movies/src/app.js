import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { showDetails } from "./movieDetails.js";
import { showEdit } from "./editMovie.js";


const views = {
    'home-link'    : showHome,
    'login-link'   : showLogin,
    'register-link': showRegister
}

document.querySelector('nav').addEventListener('click', (e) => {
    
    const view = views[e.target.id];

    if(typeof view == 'function'){
        e.preventDefault();
        view()
    }
    
})

showHome()