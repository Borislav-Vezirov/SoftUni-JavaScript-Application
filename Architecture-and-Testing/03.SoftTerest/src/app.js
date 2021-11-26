import { page, render }  from './library.js';
import { logout }        from './api/data.js';
import { getUserData }   from './utils.js';
import { createPage }    from './views/create.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage }   from './views/details.js';
import { homePage }      from './views/home.js';
import { loginPage }     from './views/login.js';
import { registerPage }  from './views/register.js';


const root = document.querySelector('.root');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/login', loginPage);
page('/register', registerPage);
page('/dashboard', dashboardPage);


updateNav();
page.start();

function updateNav(){

    const userData = getUserData();

    if(userData){
        document.querySelectorAll('.user').forEach(x => x.style.display = 'inline-block');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
        document.querySelector('.welcome-msg').textContent = `Welcome ${userData.email}`;
    }else{
        document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
        document.querySelectorAll('.guest').forEach(x => x.style.display = 'inline-block');
        document.querySelector('.welcome-msg').textContent = `Welcome guest`;
    }
}

function decorateContext(ctx, next){

    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;
    next();
}

async function onLogout(){

    logout();
    updateNav();
    page.redirect('/');
}