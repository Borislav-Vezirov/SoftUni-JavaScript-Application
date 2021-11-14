import { el, showSection} from '../dom.js';

const section = document.getElementById('details-page');
section.remove();

export async function showDetailsPage(ctx){

    ctx = showSection(section);
}