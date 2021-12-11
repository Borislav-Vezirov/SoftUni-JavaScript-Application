import { create } from "../api/data.js";
import { html } from "../library.js";
import { getUserData } from "../utils.js";


const template = (onSubmit) => html `

  <section id="create-listing">
    <div class="container">
        <form  @submit="${onSubmit}" id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
  </section>
`;

export function createPage(ctx){

    const user = getUserData();
    if(user != null){
      ctx.render(template(onSubmit));
    }else{
      ctx.page.redirect('/');
    }
    
    async function onSubmit(e) {

      e.preventDefault();

      const formData = new FormData(e.target);

      const brand       = formData.get('brand').trim();
      const model       = formData.get('model').trim();
      const description = formData.get('description').trim();
      const year        = Number(formData.get('year'));
      const imageUrl    = formData.get('imageUrl').trim();
      const price       = Number(formData.get('price'));

      if(brand == '' || model == '' || description == '' || imageUrl == ''){

        return alert(`Please fill all fields!`);
      }

      if( year <= 0 || price <= 0 ){
        return alert(`Year and Price must be positive numbers!`);
      }

      const data = { brand, model, description, year, imageUrl, price };
     
      await create(data);

      ctx.page.redirect('/catalog');
  } 
}