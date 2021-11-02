function attachEvents() {
    
    const loadBtn   = document.querySelector('#btnLoad');
    const createBtn = document.querySelector('#btnCreate');

    loadBtn.addEventListener('click', loadPhone);

    createBtn.addEventListener('click', async () => {

        const person = document.querySelector('#person').value;
        const phone  = document.querySelector('#phone').value;

        if(person == '' || phone == ''){
            return;
        }

        const data = {
            person,
            phone
        }

        document.querySelector('#person').value = '';
        document.querySelector('#phone').value = '';

        createPhone(data);
        await loadPhone();
    });
}

const ulElement = document.querySelector('#phonebook');

async function createPhone(inputs){

    const url = `http://localhost:3030/jsonstore/phonebook`;

    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    });
}

async function deletePhone(event){

    try {
        
        const url = `http://localhost:3030/jsonstore/phonebook/` + event.target.id;
    
        const res = await fetch(url, {
            method: 'delete'
        });
        if(res.status !== 200){
            let error = await res.json();

            throw new Error(error.message);
        }

        await loadPhone();

    } catch (error) {

        alert(error.message);
    }
}

async function loadPhone(){
    
    ulElement.textContent = '';

    const url = `http://localhost:3030/jsonstore/phonebook`;

    try {
        
        const res = await fetch(url);

        if(res.status !== 200){
            let error = res.json();
            throw new Error(await error.message);
        }

        const data = await res.json();

        const dataValues = Object.values(await data);

        for (const el of dataValues) {

            let createLiEl = document.createElement('li');
            let createBtn  = document.createElement('button');
            createBtn.textContent = 'Delete';
            createBtn.id = el._id;
            createLiEl.textContent = `${el.person}: ${el.phone}`;
            createLiEl.appendChild(createBtn);
            ulElement.appendChild(createLiEl);

            createBtn.addEventListener('click', deletePhone);
        }

    } catch (error) {
        
        alert(error.message)
    }
}

attachEvents();