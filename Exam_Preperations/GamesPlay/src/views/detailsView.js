import { deleteGame, details, getComments, postComments } from "../api/data.js";
import { html} from "../library.js";
import { getUserData } from "../utils.js";

const detailsTemplates = (game, isOwner, onDelete, userData, comments, onCommentSubmit) => html `

    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">

            <div class="game-header">
                <img class="game-img" src="${game.imageUrl}" />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
            <p class="text">${game.summary}</p>
            <div class="details-comments">
                <h2>Comments:</h2>
                <ul>
                ${comments.length > 0 
                    ? comments.map(commentsTemplate) 
                    : null }
                </ul>
                ${comments.length == 0 ? html `<p class="no-comment">No comments.</p>` : null}
            </div>
            ${isOwner 
                ? html `<div class="buttons">
                            <a href="/edit/${game._id}" class="button">Edit</a>
                            <a href="javascript:void(0)" @click="${onDelete}" class="button">Delete</a>
                        </div>`
                : null }
        </div>
        ${userData != null && !isOwner 
            ? html `
                <article class="create-comment">
                    <label>Add new comment:</label>
                    <form @submit="${onCommentSubmit}" class="form">
                        <textarea name="comment" placeholder="Comment......"></textarea>
                        <input class="btn submit" type="submit" value="Add Comment">
                    </form>
                </article>`
            : null }
    </section>
`;

const commentsTemplate = (comment) => html `

    <li class="comment">
        <p>${comment.comment}</p>
    </li>
`

export async function detailsPage(ctx){

    const userData = getUserData();
    
    const [game, comments] = await Promise.all([
        details(ctx.params.id),
        getComments(ctx.params.id)
    ])

    const isOwner = userData && userData.id == game._ownerId;

    ctx.render(detailsTemplates(game, isOwner, onDelete, userData, comments, onCommentSubmit));   

    async function onDelete(){

        const choise = confirm('Are you sure you want to delete this item?');

        if(choise){
            await deleteGame(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onCommentSubmit(e){

        e.preventDefault();

        const formData = new FormData(e.target);

        const comment = formData.get('comment')

        if(comment == ''){
            return alert('The field must not be empty!');
        }

        const data = {
            comment,
            gameId : ctx.params.id,
        } 
        await postComments(data);
        e.target.reset();
        ctx.page.redirect('/details/' + ctx.params.id)
    }
}
