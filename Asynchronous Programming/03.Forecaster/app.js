function attachEvents() {

    let submitBtn  = document.querySelector('#submit');

    let forecast = document.querySelector('#forecast');

    let currentEl  = document.querySelector('#current');

    let upcomingEl = document.querySelector('#upcoming'); 

    let inputValue = document.querySelector('#location');

    let weatherSymbols = {

        'Sunny'	      : '☀',
        'Partly sunny':	'⛅',
        'Overcast'    : '☁',
        'Rain'		  :	'☂',
        'Degrees'     : '°'
    }
    
    submitBtn.addEventListener('click', getAllData)
        
    async function getAllData(){

        let url  = `http://localhost:3030/jsonstore/forecaster/locations/`;
        
        try {
            
            let res  = await fetch(url);

            if(res.status !== 200){
                throw new Error();
            }

            let data = await res.json();

            let city = data.find(x => x.name.toLowerCase() == inputValue.value.toLowerCase());

            currentLocation(city);

            upcomingWeather(city);

        } catch (error) {

        }
    }

    async function currentLocation(city){

        let div = document.querySelector('.forecasts');

        if(div){
            div.remove();
        }

        if(forecast.firstElementChild.firstElementChild.textContent === 'Error'){
            forecast.firstElementChild.firstElementChild.textContent = 'Current conditions';
        }

        try {
            let currentUrl = `http://localhost:3030/jsonstore/forecaster/today/${city.code}`;

            let currentRes = await fetch(currentUrl);

            let currentData = await currentRes.json();

            let symbolSapnEl = el('span', {className: 'condition symbol'}, `${weatherSymbols[currentData.forecast.condition]}`);

            let conditionSpanEl = el('span', {className: 'condition'}, el('span', {className: 'forecast-data'},                                                          currentData.name), 
                                                                        el('span', {className: 'forecast-data'}, `${currentData.forecast.low}°/${currentData.forecast.high}°`), 
                                                                        el('span', {className: 'forecast-data'}, `${currentData.forecast.condition}`))

            let forecastDiv = el('div', {className: 'forecasts'}, symbolSapnEl, conditionSpanEl);

            currentEl.appendChild(forecastDiv);

            forecast.style.display = 'block';    
        } catch (error) {
            
            forecast.style.display = 'block';

            forecast.firstElementChild.firstElementChild.textContent = 'Error';

        }
        
    }

    async function upcomingWeather(city){

        let div = document.querySelector('.forecast-info')
        if(div){
            div.remove();
        }

        try {

            let upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${city.code}`;

            let upcomingRes = await fetch(upcomingUrl);

            let upcomingData = await upcomingRes.json();

            let createInfoDiv = el('div', {className:'forecast-info'})

            for (let day of upcomingData.forecast) {
                
                
                let symbolSpanEl    = el('span', {className: 'symbol'}, `${weatherSymbols[day.condition]}`);
                let temperatureSpan = el('span', {className: 'forecast-data'}, `${day.low}°/${day.high}°`);
                let conditionSpan   = el('span', {className: 'forecast-data'}, `${day.condition}`);
                
                let upcommingSpan   = el('span', {className: 'upcoming'}, symbolSpanEl, temperatureSpan, conditionSpan);
                
                createInfoDiv.appendChild(upcommingSpan);
            }

            upcomingEl.appendChild(createInfoDiv);

        } catch (error) {
            
        }
    }

    function el(type, attr, ...content){
        
        let element = document.createElement(type);

        for (const key in attr) {
            element[key] = attr[key];
        }

        for (let item of content) {

            if(typeof item == 'string' || typeof item == 'number'){
                item = document.createTextNode(item)
            }
            element.appendChild(item);
        }

        return element;
    }
}

attachEvents();