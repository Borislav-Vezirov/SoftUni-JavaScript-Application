import { deleteItem, detailFurniture } from "../api/data.js";
import { html, until } from "../library.js";
import { getUserData } from "../utils.js";

const detailsTemplates = (dataPromise) => html `

    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        ${until(dataPromise, html `<p>Loading...</p>`)};        
    </div>
`;

const itemTemplate = (item, isOwner, onDelete) => html `

    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${item.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
            ${isOwner ? html `<div>
            <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
            <a @click=${onDelete} href=javascript:void(0) class="btn btn-red">Delete</a>
        </div>` : ''}
    </div>
`

export function detailsPage(ctx){

    ctx.render(detailsTemplates(loadItem(ctx.params.id, onDelete)));   

    async function onDelete(){

        const choise = confirm('Are you sure you want to delete this item?');

        if(choise){
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}

async function loadItem(id, onDelete){

    const item = await detailFurniture(id);

    const userData = getUserData();

    const isOwner = userData.id == item._ownerId;

    return itemTemplate(item, isOwner, onDelete);
}