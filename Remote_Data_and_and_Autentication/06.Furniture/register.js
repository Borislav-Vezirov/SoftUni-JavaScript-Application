
document.querySelector('#register').addEventListener('submit', onRegister);

document.querySelector('#login').addEventListener('submit', onLogin);


async function onRegister(e){

    e.preventDefault();

  const formData = new FormData(e.target);

  const email    = formData.get('email');
  const password = formData.get('password');
  const rePass   = formData.get('rePass');

  if (password !== rePass){
    alert('Passwords must be equal!');
    return;
  }

  const data = { email, password };

  try {
    
    const res = await fetch('http://localhost:3030/users/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if(res.ok !== true){
      const error = await res.json();
      throw new Error(error.message);
    }

    const result = await res.json();

    const userData = {
        email: result.email,
        password: result.password,
        id: result._id,
        token: result.accessToken
    }

    localStorage.setItem('userData', JSON.stringify(userData));

    e.target.reset();

    window.location = './homeLogged.html';

  } catch (err) {
      alert(err.message)
  }
}

async function onLogin(e){

    e.preventDefault();

    const formData = new FormData(e.target);

    const email    = formData.get('email');
    const password = formData.get('password');
  
    const data = { email, password };
  
    try {
      
      const res = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
  
      if(res.ok !== true){
        const error = await res.json();
        throw new Error(error.message);
      }
  
      const result = await res.json();
  
      const userData = {
          email: result.email,
          password: result.password,
          id: result._id,
          token: result.accessToken
      }
  
      localStorage.setItem('userData', JSON.stringify(userData));
  
      window.location = './homeLogged.html';
  
    } catch (err) {
        alert(err.message)
    }

}