import { deleteIdea, detailIdea } from "../api/data.js";
import { html, until } from "../library.js";
import { getUserData } from "../utils.js";

const template = (dataPromise) => html `

    <div class="container home some"> 
        ${until(dataPromise, html `<p>Loading...</p>`)}        
    </div>
`

const detailTemplate = (idea, isOwner, onDelete) => html `

    <img class="det-img" src=${idea.img}/>
        <div class="desc">
            <h2 class="display-5">${idea.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${idea.description}</p>
        </div>
        <div class="text-center">
            ${isOwner ? html `<div>
                <a @click=${onDelete} class="btn detb" href=javascript:void(0)>Delete</a>
            </div>` : ''}
         </div>
`
export function detailsPage(ctx){

   ctx.render(template(loadDetails(ctx.params.id, onDelete)));

   async function onDelete(){

        const choise = confirm('Are you sure you want to delete this idea?');

        if(choise){
            await deleteIdea(ctx.params.id);
            ctx.page.redirect('/dashboard');
        }
   }
   
}


async function loadDetails(id, onDelete){

    const idea = await detailIdea(id);

    const userData = getUserData();

    let isOwner = null;

    if(userData != null){

        isOwner = userData.id == idea._ownerId;
    }


    return detailTemplate(idea, isOwner, onDelete)
}

