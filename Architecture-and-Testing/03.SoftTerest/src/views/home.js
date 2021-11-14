
const section = document.getElementById('home-page');
section.remove();

section.querySelector('#getStarted-link').addEventListener('click', (e) => {
    
    e.preventDefault();
    
    ctx.goTo('catalog');
})

let ctx = null;

export async function showHomePage(ctxTarget){
    ctx = ctxTarget;
    ctx.showSection(section);
}