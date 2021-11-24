import { register } from "../api/data.js";
import { html } from "../library.js";


const registerTemplate = (onSubmit) => html ` 

  <div class="container home wrapper  my-md-5 pl-md-5">
        <div class="row-form d-md-flex flex-mb-equal ">
            <div class="col-md-4">
                <img class="responsive" src="./images/idea.png" alt="">
            </div>
            <form class="form-user col-md-7" @submit=${onSubmit}>
                <div class="text-center mb-4">
                    <h1 class="h3 mb-3 font-weight-normal">Register</h1>
                </div>
                <div class="form-label-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" class="form-control" placeholder="Email" 
                        autofocus="">
                </div>
                <div class="form-label-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" class="form-control"
                        placeholder="Password">
                </div>
                <div class="form-label-group">
                    <label for="inputRepeatPassword">Repeat Password</label>
                    <input type="password" id="inputRepeatPassword" name="repeatPassword" class="form-control"
                        placeholder="Repeat Password">
                </div>
                <button class="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>
                <div class="text-center mb-4">
                    <p class="alreadyUser"> Don't have account? Then just
                        <a href="/login">Sign-In</a>!
                    </p>
                </div>
                <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
            </form>
        </div>
  </div>
`;


export function registerPage(ctx){
    
  update();

  function update(){

    ctx.render(registerTemplate(onSubmit));
  }

  async function onSubmit(e){

    e.preventDefault();

    const formData = new FormData(e.target);

    const email    = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass   = formData.get('repeatPassword').trim();

    try {

        if(email == '' || password == ''){
            throw new Error('All fields are required')
        }
        
        if(email.length < 3 || password.length < 3){
            throw new Error('email and password should be at least 3 characters long!')
        }

        if(password !== rePass){
            throw new Error('Password\'s must match!')
        }

        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect('/');
        
    } catch (err) {
        alert(err.message);
        update(err.message);
    }
}
}