import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api/v1'

export function saveToken(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export async function login(email, password){
    return await axios.post('/auth', {email, password})
}

export async function getPosts(token){
    return await axios.get('/posts', token)
}

export async function createAccount(email, name, password){
    return await axios.post('/register', {email, name, password})
}

export async function createPost(title, content){
    return await axios.post('/posts', title, content)
}
export async function uploadImg(img, id){
    return await axios.post(`/posts/${id}`, img)
}