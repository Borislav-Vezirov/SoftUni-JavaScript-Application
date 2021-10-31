function solve() {

    let getSpanEl = document.querySelector('#info span');

    let departBtn = document.querySelector('#depart');
    let arriveBtn = document.querySelector('#arrive');

    let data = {
        next: 'depot'
    }

    async function depart() {
        
        try {
            
            const url = `http://localhost:3030/jsonstore/bus/schedule/${data.next}`;
            
            const res = await fetch(url);
            if(res.status !== 200){
                
                throw new Error();
            }
            data = await res.json();
            
            getSpanEl.textContent = `Next stop ${data.name}`
            
            departBtn.disabled = true;
            arriveBtn.disabled = false;

        } catch (error) {
            
            getSpanEl.textContent = `Error`
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        
        }
    }

    function arrive() {
        
        getSpanEl.textContent = `Arriving at ${data.name}`

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();