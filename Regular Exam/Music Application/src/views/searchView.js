import { html } from "../library.js";
import { search } from "../api/data.js";
import { getUserData } from "../utils.js";
import { albumUserTemplate } from "./catalogView.js";


const searchTemplate = (albums, onSearch, name, userData) => html `

    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value ="${name || ''}">
            <button @click="${onSearch}" class="button-list">Search</button>
        </div>

        <h2>Results:</h2>

        <!--Show after click Search button-->
        <div class="search-result">
            <!--If have matches-->
            ${albums.length > 0 
                ? albums.map(x => albumUserTemplate(x, userData)) 
                : html ` <p class="no-result">No result.</p>` }
        </div>
    </section>
`


export async function searchPage(ctx){

    
    const name = ctx.querystring.split('=')[1];
    
    const albums = name ? await search(name) : []; 
    
    const userData = getUserData();

    ctx.render(searchTemplate(albums, onSearch, name, userData));

    function onSearch(){

        const query = document.getElementById('search-input').value;

        ctx.page.redirect('/search?query=' + query);
    }
}