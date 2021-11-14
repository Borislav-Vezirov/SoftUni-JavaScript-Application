import { el, showSection} from '../dom.js';

const section = document.getElementById('register-page');
section.remove();

export async function showRegisterPage(ctx){

    ctx = showSection(section);
}