document.getElementById('logoutBtn').addEventListener('click', () => {

    localStorage.removeItem('userData');
    window.location = './home.html';
});



