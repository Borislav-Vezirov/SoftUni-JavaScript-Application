import { html, render } from '../node_modules/lit-html/lit-html.js';

const tbody = document.querySelector('tbody');

document.querySelector('#searchBtn').addEventListener('click', onClick);

let data = null;

const template = (student) => html `

   <tr class="${student.match ? 'select' : ''}">
      <td>${student.item.firstName} ${student.item.lastName}</td>
      <td>${student.item.email}</td>
      <td>${student.item.course}</td>
   </tr>
`
loadData();

async function loadData(){

   const res = await fetch('http://localhost:3030/jsonstore/advanced/table');

   if(res.ok){

      data = Object.values(await res.json()).map(x => ({ item: x, match: false }))
      
      update();
   }
}

function update(){

   render(data.map(template), tbody);
}

function onClick(){

   const input = document.getElementById('searchField').value;

   for (const item  of data) {
      
      item.match = Object.values(item.values).some(x => x.toLowerCase().includes(input));
   }

   update();
}
