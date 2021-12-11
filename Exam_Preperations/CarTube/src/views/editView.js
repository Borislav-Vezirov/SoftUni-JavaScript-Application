import { detailCar, editCar } from "../api/data.js";
import { html } from "../library.js";


const editTemplate = (car, onSubmit) => html `

    <section id="edit-listing">
        <div class="container">

            <form @submit="${onSubmit}" id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" .value="${car.brand}">

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" .value="${car.model}">

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value="${car.description}">

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" .value="${car.year}">

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${car.imageUrl}">

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value="${car.price}">

                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
`;


export async function editPage(ctx){

    const car = await detailCar(ctx.params.id);
   
    ctx.render(editTemplate(car, onSubmit));
   
    
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
  
          throw new Error(`Please fill all fields!`);
        }
  
        if( year <= 0 || price <= 0 ){
          throw new Error(`Year and Price must be positive numbers!`);
  
        }
        const data = { brand, model, description, year, imageUrl, price };
  
        await editCar(ctx.params.id, data);
  
        ctx.page.redirect('/details/' + ctx.params.id);
    } 
}