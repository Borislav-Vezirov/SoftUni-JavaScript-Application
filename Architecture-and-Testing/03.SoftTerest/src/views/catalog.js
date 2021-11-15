import { getAllIdeas } from '../data.js';
import { el, showSection} from '../dom.js';

const section = document.getElementById('dashboard-holder');
section.remove();

section.addEventListener('click', onDetails);

let ctx = null;

export async function showCatalogPage(ctxTarget){
    ctx = ctxTarget
    ctx.showSection(section);
    loadIdeas();
}

async function loadIdeas(){

    const ideas = await getAllIdeas();

    if(ideas.length == 0){
        
        section.replaceChildren(el('h1', {}, 'No ideas yet! Be the first one :)'));

    }else{

        const fragment = document.createDocumentFragment();
    
        ideas.map(createIdea).forEach(element => {
            fragment.appendChild(element);
        });
     
        section.replaceChildren(fragment);
    }
}

function createIdea(idea){

    const div = el('div', {class: 'card overflow-hidden current-card details'});
    div.style.width  = '20rem';
    div.style.height = '18rem';

    const divCard   = el('div', {class:'card-body'}, el('p', {class: 'card-text'}, idea.title));
    const img       = el('img', {class: 'card-image', src: `${idea.img}`, alt: 'Card image tap'});
    const anchorTag = el('a', {class: 'btn', href: '#', 'data-id': idea._id}, 'Details')

    div.appendChild(divCard);
    div.appendChild(img);
    div.appendChild(anchorTag);

    return div;
}

function onDetails(e){

    if(e.target.tagName == 'A'){
        const id = e.target.dataset.id;

        e.preventDefault();
        ctx.goTo('details', id);
    }


}

