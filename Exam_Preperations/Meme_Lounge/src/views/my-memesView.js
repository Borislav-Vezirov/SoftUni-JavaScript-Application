import { myMemes } from "../api/data.js";
import { html } from "../library.js";
import { getUserData } from "../utils.js";


const template = (memes, user) => html `

    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
            <div class="user-content">
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>My memes count: ${memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${memes.length > 0 ? memes.map(memeTemplate) 
                : html `<p class="no-memes">No memes in database.</p>`}
        </div>
    </section>
`;

const memeTemplate = (meme) => html`

    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
        <a class="button" href="/details/${meme._id}">Details</a>
    </div>
`

export async function myMemesPage(ctx){

    const userData = getUserData();

    const memes = await myMemes(userData.id)
    
    ctx.render(template(memes, userData));
  }