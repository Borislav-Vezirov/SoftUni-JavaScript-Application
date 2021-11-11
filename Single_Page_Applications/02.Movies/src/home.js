import { showAddMovie } from "./addMovies.js";
import { el, showView } from "./dom.js";
import { showDetails }  from "./movieDetails.js";

const section = document.querySelector('#home-page');
const moviesContainer = section.querySelector('.card-deck.d-flex.justify-content-center')

section.querySelector('#createMovie').addEventListener('click', (e) => {
    e.preventDefault();
    showAddMovie();
})


section.remove();

export function showHome(){

    showView(section);
    loadMovies();
}

moviesContainer.addEventListener('click', (e) => {
    e.preventDefault();

    let target = e.target;
    
    if(target.tagName == 'BUTTON'){

        target = target.parentElement;
        
        let id = target.dataset.id;
        
        showDetails(id)
    }
})

async function loadMovies(){

    try {
        
        const res = await fetch('http://localhost:3030/data/movies');

        if(res.ok !== true){
            const err = await res.json();
            throw new Error(err.message);
        }

        const data = await res.json();

        moviesContainer.replaceChildren(...data.map(createHtmlEl));

    } catch (error) {
        alert(error.message);
    }
}

function createHtmlEl(movie){

    const cardDiv     = el('div', {class: 'card mb-4'});
    const img         = el('img', {class: 'card-img-top', src: movie.img, alt: 'Card image cap', width: '400'});
    const cardBodyDiv = el('div', {class: 'card-body'});
    const h4Title     = el('h4', {class: 'card-title'}, movie.title);
    const footerDiv   = el('div', {class: 'card-footer'});
    const anckerTag   = el('a', {href: '#'});
    const detailBtn   = el('button', {class: 'btn btn-info'}, 'Details')
    anckerTag.dataset.id = movie._id

    cardBodyDiv.appendChild(h4Title);

    anckerTag.appendChild(detailBtn);
    footerDiv.appendChild(anckerTag);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);
    cardDiv.appendChild(footerDiv);

    return cardDiv;
}