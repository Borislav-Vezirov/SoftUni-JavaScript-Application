let userData = null;

function solve() {

  userData = JSON.parse(localStorage.getItem('userData'));

  if(userData == null){
    window.location = './home.html';
  }

  document.getElementById('createForm').addEventListener('submit', createItem);

  document.getElementById('buyBtn').addEventListener('click', onBuy);

  loadFurn();

  document.getElementById('allOrders').addEventListener('click', allOrders);
}
solve();

async function loadFurn(){

  try {
    const res = await fetch('http://localhost:3030/data/furniture');

    if(res.ok !== true){
      const err = await res.json();
      throw new Error(err.message)
    }

    const result = await res.json();
    
    result.map(createHtmlRow);

  } catch (error) {
    alert(error.message);
  }
}

async function createItem(e){

  e.preventDefault();

  const formData = new FormData(e.target);

  const data = [...formData.entries()].reduce((acc, [key, value]) => Object.assign(acc, {[key]: value}), {});

  try {
    const res = await fetch('http://localhost:3030/data/furniture', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': userData.token
      },
      body: JSON.stringify(data)
    });

    if(res.ok !== true){
      const err = await res.json();
      throw new Error(err.message)
    }

    const result = await res.json();
    
    createHtmlRow(result);

    e.target.reset();

  } catch (error) {
    alert(error.message);
  }
}

function allOrders(){

  const data = onBuy();

  const names = data.map(x => x[0]);
  const price = data.map(x => Number(x[1])).reduce((acc, curr) => acc + curr, 0);
 
  const divEl = document.getElementById('divOrders');
  divEl.textContent = '';

  const [p1, p2] = divEl.querySelectorAll('p');
  const spanNameEl  = el('span', {}, `${names.join(', ')}`);
  const spanPriceEl = el('span', {}, `${price} $`);

  p1.appendChild(spanNameEl);
  p2.appendChild(spanPriceEl);

  divEl.appendChild(p1)
  divEl.appendChild(p2)
  
}

function onBuy(){

  const elements = Array.from(document.querySelectorAll('tBody tr'))
  .filter(x => x.querySelector('input:checked'))
 
  const collection = []
  elements.map(x => {

    let data = x.querySelectorAll('p')
    let result = [];
    data.forEach(x => result.push(x.textContent));
    collection.push(result);
  })

  return collection
}

function createHtmlRow(data){

  const tBody = document.getElementById('tBody');

  const tRow = el('tr', {['data-id']: data._id});

  const img      = el('img', {src: "https://www.stylespafurniture.com/wp-content/uploads/2020/03/Cove_3_Door_Wardrobe_1.jpg"}, data.img);
  const imgTd    = el('td', {}, img);

  const nameElP  = el('p', {}, data.name);
  const nameTd   = el('td', {}, nameElP);

  const priceElP = el('p', {}, data.price);
  const priceTd  = el('td', {}, priceElP);

  const factElP  = el('p', {}, data.factor);
  const factTd   = el('td', {}, factElP);

  const inputElP = el('input', {type: 'checkbox'});
  const inputTd  = el('td', {}, inputElP);

  tRow.appendChild(imgTd);
  tRow.appendChild(nameTd);
  tRow.appendChild(priceTd);
  tRow.appendChild(factTd);
  tRow.appendChild(inputTd);

  tBody.appendChild(tRow);
}

function el(type, attr, ...content){
        
  let element = document.createElement(type);

  for (const key in attr) {
      element.setAttribute(key, attr[key]);
  }

  for (let item of content) {

      if(typeof item == 'string' || typeof item == 'number'){
          item = document.createTextNode(item)
      }
      element.appendChild(item);
  }

  return element;
}