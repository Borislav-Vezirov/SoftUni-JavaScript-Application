import { logout }       from './api/data.js';
import { page, render } from './library.js';
import { getUserData }  from './utils.js';
import { homePage }     from './views/homeView.js';
import { loginPage }    from './views/loginView.js';
import { registerPage } from './views/registerView.js';
import { catalogPage }  from './views/catalogView.js';
import { detailsPage }  from './views/detailsView.js';
import { editPage }     from './views/editView.js';
import { createPage }   from './views/createView.js';
import { myMemesPage }  from './views/my-memesView.js';


const root = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/create', createPage);
page('/my-profile', myMemesPage);

updateNav();
page.start();

function updateNav(){

    const userData = getUserData();

    if(userData){
        document.querySelector('.user').style.display = 'inline-block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.profile span').textContent = `Welcome, ${userData.email}`;
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'inline-block';
    }
}

function decorateContext(ctx, next){

    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav();
    next();
}

function onLogout(){

    logout();
    updateNav();
    page.redirect('/');
}