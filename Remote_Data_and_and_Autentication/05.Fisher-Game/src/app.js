window.addEventListener('DOMContentLoaded', () => {

    const userData = JSON.parse(localStorage.getItem('userData'));

    const loadBtn    = document.querySelector('#loadBtn');
    const addBtn     = document.querySelector('#addForm .add');
    const catchesDiv = document.querySelector('#catches');

    loadBtn.addEventListener('click', loadData);
    const addForm = document.getElementById('addForm').addEventListener('submit', onCreate);
    
    if(userData !== null){
        document.getElementById('guest').style.display = 'none'
        addBtn.disabled = false
    }else{
        document.getElementById('user').style.display = 'none'
        loadBtn.disabled = true;
    }

    async function loadData(){
     
        try {

            const response = await fetch('http://localhost:3030/data/catches');
            if(response.ok !== true){
                const error = await response.json();
                throw new Error(error.message);
            }
            
            const data = await response.json();

            catchesDiv.textContent = '';

           data.map(createHtmlElementsFromData)
           
        } catch (error) {
            alert(error.message);
        }
    }

    async function onCreate(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        
        const data = [...formData.entries()].reduce((acc, curr) => Object.assign(acc, {[curr[0]]: curr[1]}), {});

        try {
            const res = await fetch('http://localhost:3030/data/catches', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userData.token
                },
                body: JSON.stringify(data) 
            });

            if(res.ok !== true){
                const error = await res.json();
                throw new Error(error.message);
            }

            const result = await res.json();
            createHtmlElementsFromData(result);
            e.target.reset();

        } catch (err) {
            alert(err.message);
        }
    }

    async function onUpdate(e){

        const collection = Array.from(e.target.parentElement.children)
        .filter(x => x.type == 'text');

        const data = {
            angler      : collection[0].value,
            weight      : collection[1].value,
            species     : collection[2].value,
            location    : collection[3].value,
            bait        : collection[4].value,
            captureTime : collection[5].value
        }

        const currIdd = e.target.id;
        
        try {
            const res = await fetch('http://localhost:3030/data/catches/' + currIdd, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userData.token
                },
                body: JSON.stringify(data)
            })

            if(res.ok !== true){
                const error = await res.json();
                throw new Error(error.message)
            }

        } catch (err) {
            alert(err.message);
        }
    }

    async function onDelete(e){

        const parentEl = e.target.parentElement;

        const currIdd = e.target.id;
        
        try {
            const res = await fetch('http://localhost:3030/data/catches/' + currIdd, {
                method: 'delete',
                headers: { 'X-Authorization': userData.token },
            })

            if(res.ok !== true){
                const error = await res.json();
                throw new Error(error.message)
            }

            parentEl.remove();

        } catch (err) {
            alert(err.message);
        }
    }
    
    function createHtmlElementsFromData(data){
        
        const isOwner = (userData && data._ownerId == userData.id);

        const catchDiv = el('div', {class: 'catch'});

        const angler        = el('label', {}, 'Angler');
        const anglerInput   = el('input', {type: 'text', class: 'angler', value: data.angler});
        const weight        = el('label', {}, 'Weight');
        const weightInput   = el('input', {type: 'text', class: 'weight', value: `${data.weight}`});
        const species       = el('label', {}, 'species');
        const speciesInput  = el('input', {type: 'text', class: 'species', value: `${data.species}`});
        const location      = el('label', {}, 'Location');
        const locationInput = el('input', {type: 'text', class: 'location', value: `${data.location}`});
        const bait          = el('label', {}, 'Bait');
        const baitInput     = el('input', {type: 'text', class: 'bait', value: `${data.bait}`});
        const captureTime   = el('label', {}, 'Capture Time');
        const captureInput  = el('input', {type: 'text', class: 'captureTime', value: `${data.captureTime}`});
        const updateBtn     = el('button', {class: 'update', 'id': `${data._id}`}, 'Update');
        const deleteBtn     = el('button', {class: 'delete', 'id': `${data._id}`}, 'Delete');

        updateBtn.addEventListener('click', onUpdate);
        deleteBtn.addEventListener('click', onDelete);

        catchDiv.appendChild(angler);
        catchDiv.appendChild(anglerInput);
        catchDiv.appendChild(weight);
        catchDiv.appendChild(weightInput);
        catchDiv.appendChild(species);
        catchDiv.appendChild(speciesInput);
        catchDiv.appendChild(location);
        catchDiv.appendChild(locationInput);
        catchDiv.appendChild(bait);
        catchDiv.appendChild(baitInput);
        catchDiv.appendChild(captureTime);
        catchDiv.appendChild(captureInput);
        catchDiv.appendChild(updateBtn);
        catchDiv.appendChild(deleteBtn);

        catchesDiv.appendChild(catchDiv);

        if(!isOwner){
            Array.from(catchDiv.children).forEach(el => {
                return el.disabled = true;
            })
        }
    }
})

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