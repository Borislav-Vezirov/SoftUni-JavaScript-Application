import { createIdea } from '../data.js';
import { el, showSection} from '../dom.js';

const section = document.getElementById('create-page');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx = null;

export async function showCreatePage(ctxTarget){
    ctx = ctxTarget;
    ctx = showSection(section);
}

async function onSubmit(e){

    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get('title').trim();
    const descr = formData.get('description').trim();
    const img   = formData.get('imageURL').trim();

    createIdea({title, descr, img});

    ctx.goTo('catalog');
}