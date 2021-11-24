import { login } from "../api/data.js";
import { html } from "../library.js";

const logintemplate = (onSubmit) => html `

<div class="container home wrapper  my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal ">
        <div class="col-md-4">
            <img class="responsive" src="/images/idea.png" alt="">
        </div>
        <form class="form-user col-md-7" @submit=${onSubmit}>
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Login</h1>
            </div>
            <div class="form-label-group">
                <label for="inputEmail">Email</label>
                <input type="text" id="inputEmail" name="email" class="form-control" placeholder="Email" 
                    autofocus="">
            </div>
            <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" name="password" class="form-control"
                    placeholder="Password">
            </div>
            <div class="text-center mb-4 text-center">
                <button class="btn btn-lg btn-dark btn-block" type="submit">Sign In</button>
                <p class="alreadyUser"> Don't have account? Then just
                    <a href="/register">Sign-Up</a>!
                </p>
            </div>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>
`

export function loginPage(ctx){
    
  update();

  function update(){

    ctx.render(logintemplate(onSubmit));
  }

  async function onSubmit(e){

    e.preventDefault();

    const formData = new FormData(e.target);

        const email    = formData.get('email').trim();
        const password = formData.get('password').trim();

        try {
            
            await login(email, password);
            ctx.updateNav();
            ctx.page.redirect('/');
            
        } catch (err) {
            update(err.message);
        }
  }
}