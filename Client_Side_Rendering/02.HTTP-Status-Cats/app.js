import { html, render } from './node_modules/lit-html/lit-html.js'
import { cats } from './catSeeder.js';

const section = document.querySelector('section');

const template = (cat) => html `
    
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button @click=${() => toggleInfo(cat)} class="showBtn">${cat.info ? "Hide" : "Show"} status code</button>
            ${cat.info ? html `<div class="status"  id=${cat.id}>
                <h4>Status code:${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>` : null }
        </div>
    </li>
`
cats.forEach(x => x.info = false);

update();

function update(){
    render(html `<ul>${cats.map(template)}</ul>`, section);
}

function toggleInfo(cat){
    cat.info = !cat.info;
    update();
}