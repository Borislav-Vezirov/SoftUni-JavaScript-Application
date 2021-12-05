import { clearUserData, setUserData, getUserData } from "../utils.js";

const host = 'http://localhost:3030';

export async function request(url, options){

    try {
        
        const response = await fetch(host + url, options);

        if(response.ok != true){
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            return await response.json();
        } catch (err) {
            return response;
        }
        

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export function createOptions(method = 'get', data){

    const options = {
        method,
        headers: {}
    };

    if(data != undefined){
        
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();

    if(userData != undefined){
        options.headers['X-Authorization'] = userData.token;
    }

    return options;
}
//------------------------------------------------------------------------------------------------------------
export async function get(url){

    return request(url, createOptions());
}

export async function post(url, data){

    return request(url, createOptions('post', data));
}

export async function put(url, data){

    return request(url, createOptions('put', data));
}

export async function del(url){

    return request(url, createOptions('delete'))
}

export async function login(email, password){

    const response = await post('/users/login', {email, password});

    const userData = {
        email   : response.email,
        id      : response._id,
        token   : response.accessToken
    }

    setUserData(userData);
} 

export async function register(email, password){

    const response = await post('/users/register', {email, password});

    const userData = {
        email   : response.email,
        id      : response._id,
        token   : response.accessToken
    }

    setUserData(userData);
} 

export async function logout(){

    get('/users/logout');

    clearUserData();
} 

