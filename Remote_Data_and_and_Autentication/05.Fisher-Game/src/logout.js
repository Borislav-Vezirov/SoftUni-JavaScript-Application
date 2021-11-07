document.querySelector('#logout').addEventListener('click', () => {
    localStorage.removeItem('userData');
});