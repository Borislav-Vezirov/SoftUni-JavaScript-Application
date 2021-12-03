import { create } from "../api/data.js";
import { html } from "../library.js";
import { getUserData } from "../utils.js";


const template = (onSubmit) => html `

  <section id="create-page" class="auth">
    <form  @submit="${onSubmit}" id="create">
        <div class="container">

            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title...">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category...">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
        </div>
    </form>
  </section>
`;

export function createPage(ctx){

    const userData = getUserData();

    if(userData == null){
        ctx.page.redirect('/');
    }

    ctx.render(template(onSubmit));
    
    async function onSubmit(e) {

      e.preventDefault();

      const formData = new FormData(e.target);

      const data = {

         title    : formData.get('title').trim(),
         category : formData.get('category').trim(),
         maxLevel : formData.get('maxLevel').trim(),
         imageUrl : formData.get('imageUrl').trim(),
         summary  : formData.get('summary').trim()
      }

      const isEmpty = Object.values(data).some(x => x == "");

      if(isEmpty){

        return alert(`Please fill all fields!`);
      }

      await create(data);

      ctx.page.redirect('/');
  } 
}