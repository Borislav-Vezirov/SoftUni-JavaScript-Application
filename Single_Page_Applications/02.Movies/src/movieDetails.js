import { showView } from "./dom.js";

const section = document.querySelector('#movie-example');

section.remove();

export function showDetails(id){
    
    showView(section);
}