import * as api from './api.js';

export const login    = api.login;
export const register = api.register;
export const logout   = api.logout;


export async function getAll(){
    return api.get(`/data/albums?sortBy=_createdOn%20desc&distinct=name`);
}

export async function create(album){
    
    return api.post('/data/albums', album);
}

export async function details(id){
    return api.get(`/data/albums/${id}`);
}

export async function edit(id, data){
    return api.put(`/data/albums/${id}`, data);
}

export async function deleteAlbum(id){
    return api.del('/data/albums/' + id)
    
}

export async function search(query){
    return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}
