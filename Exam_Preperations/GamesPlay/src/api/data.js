import * as api from './api.js';

export const login    = api.login;
export const register = api.register;
export const logout   = api.logout;


export async function getAll(){
    return api.get(`/data/games?sortBy=_createdOn%20desc`);
}
export async function homeGames(){
    return api.get(`/data/games?sortBy=_createdOn%20desc&distinct=category`);
}

export async function create(data){
    
    return api.post('/data/games', data);
}

export async function details(id){
    return api.get(`/data/games/${id}`);
}

export async function edit(id, data){
    return api.put(`/data/games/${id}`, data);
}

export async function deleteGame(id){
    return api.del('/data/games/' + id)

}

export async function getComments(gameId){
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function postComments(data){
    return api.post(`/data/comments`, data);
}
