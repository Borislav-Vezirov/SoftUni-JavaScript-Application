import { html, render } from './node_modules/lit-html/lit-html.js'


const root = document.getElementById('root');

document.querySelector('form').addEventListener('submit', (e) => {

    e.preventDefault();

    const towns = document.getElementById('towns').value.split(',').map(x => x.trim());

    const result = template(towns);

    render(result, root);
})

const template = (towns) => html `

    <ul>
        ${towns.map(t => html `<li>${t}</li>`)}
    </ul>
`