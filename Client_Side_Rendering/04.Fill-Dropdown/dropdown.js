import { html, render } from '../node_modules/lit-html/lit-html.js';

const selectEl = document.getElementById('menu');
document.querySelector('form').addEventListener('submit', onSubmit)

const selectTemplate = (items) => html `

    ${items.map(x => html `<option value="${x._id}">${x.text}</option>`)}
`
getData();

async function getData(){

    const res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');

    const data = await res.json();

    update(Object.values(data));
}

async function onSubmit(e){
    
    e.preventDefault();

    const text = document.getElementById('itemText').value.trim();

    const res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({text})
    });

    document.getElementById('itemText').value = '';

    if(res.ok){
        getData();
    }
}

function update(items){

    render(selectTemplate(items), selectEl);
}