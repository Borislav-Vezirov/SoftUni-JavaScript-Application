import { showView } from "./dom.js";

const section = document.querySelector('#add-movie');

section.remove();

export function showAddMovie(){

    showView(section);
}

