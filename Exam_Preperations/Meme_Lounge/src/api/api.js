import { notify } from "../notify.js";
import { clearUserData, setUserData, getUserData } from "../utils.js";

const host = 'http://localhost:3030';

export async function request(url, options){

    try {
        
        const response = await fetch(host + url, options);

        if(response.ok == false){
            
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            return await response.json();
        } catch (err) {
            return response;
        }
        

    } catch (err) {
        notify(err.message);
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
        username: response.username,
        id      : response._id,
        token   : response.accessToken,
        gender  : response.gender
    }

    setUserData(userData);
} 

export async function register(username, email, password, gender){

    const response = await post('/users/register', {username, email, password, gender});

    const userData = {
        username: response.username,
        email   : response.email,
        id      : response._id,
        token   : response.accessToken,
        gender  : response.gender
    }

    setUserData(userData);
} 

export async function logout(){
    
    return get('/users/logout') && clearUserData();
} 

