import { logout }       from './api/data.js';
import { page, render } from './library.js';
import { getUserData }  from './utils.js';
import { loginPage }    from './views/loginView.js';
import { registerPage } from './views/registerView.js';
import { catalogPage }  from './views/catalogView.js';
import { homePage }     from './views/homeView.js';
import { createPage }   from './views/createView.js';
import { detailsPage }  from './views/detailsView.js';
import { editPage }     from './views/editView.js';
import { searchPage }   from './views/searchView.js';



const root = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);

updateNav();
page.start();

function updateNav(){

    const userData = getUserData();

    if(userData){
        document.querySelectorAll('.user').forEach(x => x.style.display = 'inline-block');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
    }else{
        document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'inline-block');
    }
}

function decorateContext(ctx, next){

    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

function onLogout(){

    logout();
    updateNav();
    page.redirect('/');
}