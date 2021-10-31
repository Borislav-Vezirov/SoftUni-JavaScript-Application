async function getInfo() {

    let busId = document.querySelector('#stopId').value;

    let stopName = document.querySelector('#stopName');

    let busesUl = document.querySelector('#buses')
    
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busId}`;

    try {
        
        busesUl.textContent = '';
        
        const res = await fetch(url);
        
        if(res.status !== 200){
            throw new Error()
        }
        const data = await res.json();
    
        stopName.textContent = data.name;

        for (const key in data.buses) {
            let liElement = document.createElement('li');

            liElement.textContent = `Bus ${key} arrives in ${data.buses[key]} minutes`

            busesUl.appendChild(liElement);
        }

    } catch (error) {
        stopName.textContent = error;
    }
}