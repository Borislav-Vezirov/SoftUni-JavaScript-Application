import { getIdea } from '../data.js';
import { el, showSection} from '../dom.js';

const section = document.getElementById('details-page');
section.remove();

export async function showDetailsPage(ctx, id){

    ctx = showSection(section);
    loadIdea(id)
}

async function loadIdea(id){

    const idea = await  getIdea(id);

    section.replaceChildren(createHtmlIdea(idea));
}

function createHtmlIdea(idea){

    const fragment = document.createDocumentFragment();

    const img     = el('img', {class: 'det-img', src: idea.img});
    const descDiv = el('div', {class: 'desc'});
        const h2     = el('h2', {class: 'display-5 '}, idea.title);
        const pInfo  = el('p', {class: 'infoType'}, 'Description');
        const pDesc  = el('p', {class: 'idea-description'}, idea.description);
    const textDiv = el('div', {class: 'text-center'});
        const anchor = el('a', {class: 'btn detb', href: '#'}, 'Delete');

    descDiv.appendChild(h2);
    descDiv.appendChild(pInfo);
    descDiv.appendChild(pDesc);

    textDiv.appendChild(anchor);

    fragment.appendChild(img);
    fragment.appendChild(descDiv);
    fragment.appendChild(textDiv);

    return fragment;
}