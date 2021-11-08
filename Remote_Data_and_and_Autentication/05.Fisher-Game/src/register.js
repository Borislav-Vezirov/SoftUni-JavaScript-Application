document.querySelector('#formRegister').addEventListener('submit', onRegister);
document.querySelector('#user').style.display = 'none';

async function onRegister(e){
    e.preventDefault();
    
    const formData = new FormData(e.target);

    const email    = formData.get('email')
    const password = formData.get('password')
    const rePass   = formData.get('rePass');

    if(password !== rePass){
        alert('Passwords are not equal!')
        return;
    }

    const data = {
        email,
        password
    };
    
    try {
        const res = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(data)
        })
    
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

        window.location = './index.html';

    } catch (error) {
        alert(error.message);
    }
}