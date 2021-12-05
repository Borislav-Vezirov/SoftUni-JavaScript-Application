import { getAll } from "../api/data.js";
import { html } from "../library.js";
import { getUserData } from "../utils.js";



const userTemplate = (albums, userData) => html `

<section id="catalogPage">
            <h1>All Albums</h1>
            ${albums.length > 0 
              ? albums.map(x => albumUserTemplate(x, userData))
              : html `<p>No Albums in Catalog!</p>` }
        </section>
`;


export const albumUserTemplate = (album, userData) => html `

  <div class="card-box">
      <img src="${album.imgUrl}">
      <div>
          <div class="text-center">
              <p class="name">Name: ${album.name}s</p>
              <p class="artist">Artist: ${album.artist}</p>
              <p class="genre">Genre: ${album.genre}</p>
              <p class="price">Price: $${album.price}</p>
              <p class="date">Release Date: ${album.releaseDate}</p>
          </div>
            ${userData != null ?
            html `<div class="btn-group">
              <a href="/details/${album._id}" id="details">Details</a>
            </div>` : ''}   
      </div>
  </div>
`;

export async function catalogPage(ctx){

  const userData = getUserData();

  const albums = await getAll()

  ctx.render(userTemplate(albums, userData));

  
}