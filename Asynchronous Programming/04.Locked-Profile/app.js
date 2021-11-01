async function lockedProfile() {

    let mainEl = document.querySelector('#main');

    try {

        let url = 'http://localhost:3030/jsonstore/advanced/profiles';

        let res = await fetch(url);

        if(res.status !== 200){
            throw new Error();
        }

        let data = await res.json();

        for (let key in data) {

            let card = document.createElement('div');
            card.className = 'profile';

            //made with the innerHTML method, becouse the task require a lot elements to be creating, and is nothing complicated

            card.innerHTML = `
                
                    <img src="./iconProfile2.png" class="userIcon" />
                    <label>Lock</label>
                    <input type="radio" name="user1Locked" value="lock" checked>
                    <label>Unlock</label>
                    <input type="radio" name="user1Locked" value="unlock"><br>
                    <hr>
                    <label>Username</label>
                    <input type="text" name="user1Username" value="${data[key].username}" disabled readonly />
                    <div id="user1HiddenFields">
                        <hr>
                        <label>Email:</label>
                        <input type="email" name="user1Email" value="${data[key].email}" disabled readonly />
                        <label>Age:</label>
                        <input type="email" name="user1Age" value="${data[key].age}" disabled readonly />
                    </div>
                    <button>Show more</button>
                `

            mainEl.appendChild(card);
        }

        document.querySelector('#main').addEventListener('click', (e) =>{
            if(e.target.type == 'radio' && e.target.value == 'unlock'){
                let button = e.target.parentElement.querySelector('button');
                button.addEventListener('click', () => {

                    let hiddenFields = e.target.parentElement.querySelector('#user1HiddenFields');
                    let radioInput   = e.target.parentElement.querySelectorAll('input[type="radio"]');
                    
                    if(button.textContent == 'Show more' && radioInput[1].checked){
                        button.textContent = 'Hide it';
                        hiddenFields.style.display = 'block';
                    }else if(button.textContent == 'Hide it' && radioInput[1].checked){
                        button.textContent = 'Show more';
                        hiddenFields.style.display = 'none';
                    }
                })
            }
        })

    } catch (error) {

    }
}