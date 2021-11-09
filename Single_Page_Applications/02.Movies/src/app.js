import { addMovieSetupSection } from "./addMovies.js";
import { editSetupSection } from "./editMovie.js";
import { loginSetupSection } from "./login.js";
import { detailSetupSection } from "./movieDetails.js";
import { registerHandler, registerSetupSection } from "./register.js";

const movieSection    = document.getElementById('movie');
const registerSection = registerSetupSection(document.getElementById('form-sign-up'));
const loginSection    = loginSetupSection(document.getElementById('form-login'));
const addMovieSection = addMovieSetupSection(document.getElementById('add-moviep'));
const detailsSection  = detailSetupSection(document.getElementById('movie-example'));
const editSection     = editSetupSection(document.getElementById('edit-movie'));

const registerBtn  = document.getElementById('registerBtn');
const logoutBtn    = document.getElementById('logoutBtn');
const welcomeEmail = document.getElementById('showEmail');

function setup(){
    const userData = JSON.parse(localStorage.getItem('userData'));

    registerBtn.addEventListener('click', registerHandler);
    logoutBtn.addEventListener('click', onLogout);
    
    if(userData !== null){
        registerBtn.classList.add('hidden');
        welcomeEmail.textContent = `Welcome, ${userData.email}`;
        const showMoviesLink = document.querySelector('.show-movies-link').addEventListener('click', showMovies);
    }else{
        welcomeEmail.textContent = `Welcome guest`;
        logoutBtn.classList.add('hidden');
    }
    
}

setup();

function showMovies(e){
    e.preventDefault();
    movieSection.classList.remove('hidden');
}

function onLogout(e){
    e.preventDefault();
    localStorage.removeItem('userData');
    location.reload();
}
