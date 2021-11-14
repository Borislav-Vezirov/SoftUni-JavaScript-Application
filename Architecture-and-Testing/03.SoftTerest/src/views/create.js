import { el, showSection} from '../dom.js';

const section = document.getElementById('create-page');
section.remove();

export async function showCreatePage(ctx){

    ctx = showSection(section);
}