import { towns } from "./towns.js";
import { html, render } from './node_modules/lit-html/lit-html.js'

const townsEl = document.getElementById('towns');



const template = (towns) => html `

   <ul>
      ${towns.map(x => html `<li class="${x.match ? "active" : ''}">${x.name}</li>`)}
   </ul>
`

function update(){
   
  render(template(townsNames), townsEl);
}

const townsNames = towns.map(x => ({ name: x, match: false }));
update();

document.querySelector('button').addEventListener('click', () => {

   const inputValue = document.querySelector('input').value.trim().toLowerCase();

   const liEl = [...document.querySelectorAll('li')];

   let count = 0;

   townsNames.forEach(x => {

      if( inputValue && x.name.toLowerCase().includes(inputValue)){
         x.match = true;
         count++;
      }else{
         x.match = false;
      }
   })

   document.querySelector('input').value = '';
   
   document.querySelector('#result').textContent = count + ' matches found';
   update();
})
