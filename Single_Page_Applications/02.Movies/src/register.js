
let section = undefined;

export function registerSetupSection(domElement){

    section = domElement
}


export function registerHandler(e){

    e.preventDefault();

    section.classList.remove('hidden');   

    document.getElementById('register-form').addEventListener('submit', onRegister);
}

async function onRegister(e){
    e.preventDefault();

    const dataForm = new FormData(e.target);

    const email    = dataForm.get('email');
    const password = dataForm.get('password');
    const rePass   = dataForm.get('rePass');

    if(!validateInputs(email, password, rePass)){
        return
    }

    const data = { email, password };
    
    try {
        
        const res = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(res.ok !== true){
            const err = await res.json();
            throw new Error(err.message);
        }

        const result = await res.json();

        const userData = {
            email: result.email,
            id   : result._id,
            token: result.accessToken
        }
        
        localStorage.setItem('userData', JSON.stringify(userData));

        location.reload();
    } catch (error) {
        alert(error.message)
    }


    
}

function validateInputs(email, pass, rePass){

    if(email == ''){
        alert('The email is required!');
        return
    }else if(pass == ''){
        alert('The password filed should not be empty');
        return
    }else if(pass.length < 6){
        alert('The password must be at least 6 characters!');
        return
    }else if(pass !== rePass){
        alert('The passwords are not equal!');
        return
    }
    return true
}
