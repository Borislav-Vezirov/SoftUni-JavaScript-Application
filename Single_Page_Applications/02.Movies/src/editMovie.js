import { showView } from "./dom.js";

const section = document.querySelector('#edit-movie');

section.remove();

export function showEdit(){

    showView(section);
}