import axios from "axios";

export async function getPosts(){
    return axios.get(`https://jsonplaceholder.typicode.com/posts`)
}

export async function getUser(id) {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
}
export async function getComments(id) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
}

export async function getAllUser() {
    return axios.get(`https://jsonplaceholder.typicode.com/users`)
}