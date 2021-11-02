async function solution() {

    let main = document.querySelector('#main');

    let url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const res = await fetch(url);
    const data = await res.json();

    for (const obj of data) {
        //made with the innerHTML method, because the task is very simple, and this is not so important!
        main.innerHTML += `
            
            <div class="accordion">
                <div class="head">
                    <span>${obj.title}</span>
                    <button class="button" id=${obj._id}>More</button>
                </div>
                <div class="extra">
                    <p></p>
                </div>
            </div> `
    }

    main.addEventListener('click', showDetails);

    async function showDetails(e){
        if(e.target.className !== 'button'){
            return;
        }
        
        let urlDetails = `http://localhost:3030/jsonstore/advanced/articles/details/${e.target.id}`

        let detailRes = await fetch(urlDetails);

        let detailData = await detailRes.json();

        let p = e.target.parentElement.parentElement.querySelector('p');
        p.textContent = detailData.content;

        let divExtra = e.target.parentElement.parentElement.querySelector('.extra');

        if(e.target.textContent == 'More'){
            e.target.textContent   = 'Less';
            divExtra.style.display = 'block';
        }else if(e.target.textContent == 'Less'){
            e.target.textContent   = 'More';
            divExtra.style.display = 'none';
        }
    }
}

solution();