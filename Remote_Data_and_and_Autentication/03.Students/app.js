
function solve(arr) {

    loadStudents();

    document.getElementById('form').addEventListener('submit', appendStudent);
    
}

 async function appendStudent(e){

     e.preventDefault();

    formData = new FormData(e.target);

    const firstName     = formData.get('firstName');
    const lastName      = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade         = Number(formData.get('grade'));

    let isEmptyString = [firstName, lastName, facultyNumber, grade].filter(x => x == '');

    if(isEmptyString.length > 0){
        return;
    }

    const student = {firstName, lastName, facultyNumber, grade};

    const url = 'http://localhost:3030/jsonstore/collections/students';

    await request(url, {
        method: 'post',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(student) 
    });

    createRow(student);
    e.target.reset();
}

async function loadStudents(){

    let data = await request('http://localhost:3030/jsonstore/collections/students'); 

    dataArr = Object.values(data).map(createRow);    
}

function createRow(student){

    let row = document.createElement('tr');

    let firstNameTd = document.createElement('td');
    firstNameTd.textContent = student.firstName;

    let lastNameTd = document.createElement('td');
    lastNameTd.textContent = student.lastName;

    let facultyNumberTd = document.createElement('td');
    facultyNumberTd.textContent = student.facultyNumber

    let gradeTd = document.createElement('td');
    gradeTd.textContent = student.grade;

    row.appendChild(firstNameTd);
    row.appendChild(lastNameTd);
    row.appendChild(facultyNumberTd);
    row.appendChild(gradeTd);

    document.querySelector('#results tbody').appendChild(row);
}

async function request(url, options){
   
    try {
        const res = await fetch(url, options);

        if(res.status !== 200){

            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();

        return data;

    } catch (error) {
        alert(error.messsage);
    }
}

solve();