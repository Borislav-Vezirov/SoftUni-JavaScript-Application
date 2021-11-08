
window.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#logout').addEventListener('click', () => {
    
        localStorage.removeItem('userData');
    });
})