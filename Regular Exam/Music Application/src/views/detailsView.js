import { deleteAlbum, details } from "../api/data.js";
import { html} from "../library.js";
import { getUserData } from "../utils.js";

const detailsTemplates = (album, isOwner, onDelete) => html `

    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src="${album.imgUrl}">
            </div>
            <div class="albumInfo">
                <div class="albumText">

                    <h1>Name: ${album.name}</h1>
                    <h3>Artist: ${album.artist}</h3>
                    <h4>Genre: ${album.genre}</h4>
                    <h4>Price: $${album.price}</h4>
                    <h4>Date: ${album.releaseDate}</h4>
                    <p>${album.description}</p>
                </div>

                ${isOwner ? html `
                <div class="actionBtn">
                    <a href="/edit/${album._id}" class="edit">Edit</a>
                    <a @click="${onDelete}" href="javascript:void(0)" class="remove">Delete</a>
                </div>` : ''}
            </div>
        </div>
    </section>
`;

export async function detailsPage(ctx){

    const userData = getUserData();

    const album = await details(ctx.params.id)

    const isOwner = userData && userData.id == album._ownerId;

    ctx.render(detailsTemplates(album, isOwner, onDelete));   

    async function onDelete(){

        const choise = confirm('Are you sure you want to delete this item?');

        if(choise){
            await deleteAlbum(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}
