import { showView } from "./dom.js";

const section = document.querySelector('#form-sign-up');

section.remove();

export function showRegister(){

    showView(section);
}