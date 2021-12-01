import { getAll } from "../api/data.js";
import { html } from "../library.js";



const template = (memes) => html `
  
  <section id="meme-feed">
      <h1>All Memes</h1>
      <div id="memes">
          ${memes.length > 0 
            ? memes.map(memeTemplate)
            : html `<p class="no-memes">No memes in database.</p>` }
      </div>
  </section>
`;

const memeTemplate = (book) => html `
  
  <div class="meme">
      <div class="card">
          <div class="info">
              <p class="meme-title">${book.title}</p>
              <img class="meme-image" alt="meme-img" src=${book.imageUrl}>
          </div>
          <div id="data-buttons">
              <a class="button" href="/details/${book._id}">Details</a>
          </div>
      </div>
  </div>
`;

export async function catalogPage(ctx){

  const memes = await getAll()
  
  ctx.render(template(memes));
}