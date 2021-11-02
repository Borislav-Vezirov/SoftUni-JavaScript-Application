function attachEvents() {
    
    let loadBtn        = document.querySelector('#btnLoadPosts');
    let viewPostsBtn   = document.querySelector('#btnViewPost');
    
    loadBtn.addEventListener('click', loadPosts);
    
    viewPostsBtn.addEventListener('click', viewPosts);
}

async function viewPosts(){
    
    let selectedOption = document.querySelector('#posts').value;
    
    let postTitle      = document.querySelector('#post-title');
    let postBodyUl     = document.querySelector('#post-body');
    let postCommentsUl = document.querySelector('#post-comments');

    let [post, comments] = await Promise.all( [getPost(selectedOption), getComments(selectedOption)] );

    postTitle.textContent = 'Loading...'
    postBodyUl.textContent = '';  
    postCommentsUl.replaceChildren();

    setTimeout(() => {

        postTitle.textContent = (post.title).toUpperCase();
        let liEl = document.createElement('li');
        liEl.textContent = post.body;
        postBodyUl.appendChild(liEl);
    
        for (const comment of comments) {
            let createLi = document.createElement('li');
            createLi.id = comment.id;
            createLi.textContent = comment.text;
            postCommentsUl.appendChild(createLi);
        }
    }, 650);
    
}

async function loadPosts(){

    let selectEl = document.querySelector('#posts')

    selectEl.textContent = '';

    let data = await getPosts();
    
    for (const post of data) {
        let optionEl = document.createElement('option');
        optionEl.textContent = (post.title).toUpperCase();
        optionEl.value = post.id;
        selectEl.appendChild(optionEl);
    }
}

async function getPosts(){

    let url   = 'http://localhost:3030/jsonstore/blog/posts';

    let res   = await fetch(url);
    let data  = await res.json();
    let posts = Object.values(data)
    
    return posts;
}

async function getPost(postId){

    let url   = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

    let res   = await fetch(url);
    let data  = await res.json();
    
    return data;
}

async function getComments(postId){

    let url     = 'http://localhost:3030/jsonstore/blog/comments';

    let res     = await fetch(url);
    let data    = await res.json();
    let comment = Object.values(data).filter(x => x.postId == postId);

    return comment;
}

attachEvents();