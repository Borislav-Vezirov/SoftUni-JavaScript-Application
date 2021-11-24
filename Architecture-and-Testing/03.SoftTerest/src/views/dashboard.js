import { getAll } from "../api/data.js";
import { html } from "../library.js";



const template = (ideas) => html `

  <div id="dashboard-holder">
    ${ideas.length == 0 ? html `<h1>No ideas yet! Be the first one :)</h1>` : ""}
    
    ${ideas.map(ideaTemplate)}
  </div>
`;

const ideaTemplate = (idea) => html `

  <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
      <div class="card-body">
          <p class="card-text">${idea.title}</p>
      </div>
      <img class="card-image" src=${idea.img} alt="Card image cap">
      <a class="btn" href=${`/details/${idea._id}`}>Details</a>
  </div>
`
export async function dashboardPage(ctx){

  const ideas = await getAll();
    
  update();

  function update(){

    ctx.render(template(ideas));
  }
}