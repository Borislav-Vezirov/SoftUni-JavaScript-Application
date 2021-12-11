import { deleteCar, detailCar } from "../api/data.js";
import { html} from "../library.js";
import { getUserData } from "../utils.js";

const detailsTemplates = (car, isOwner, onDelete) => html `

    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src="${car.imageUrl}">
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}$</li>
            </ul>
            <p class="description-para">${car.description}</p>
            ${isOwner 
            ?   html `<div class="listings-buttons">
                <a href="/edit/${car._id}" class="button-list">Edit</a>
                <a @click="${onDelete}" href="javascript:void(0)" class="button-list">Delete</a>
                </div>` 
            : null  }
        </div>
    </section>
`;

export async function detailsPage(ctx){

    const userData = getUserData();
    const car = await detailCar(ctx.params.id);

    const isOwner = userData && userData.id == car._ownerId;

    ctx.render(detailsTemplates(car, isOwner, onDelete));   

    async function onDelete(){

        const choise = confirm('Are you sure you want to delete this item?');

        if(choise){
            await deleteCar(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}
