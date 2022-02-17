import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8000/api/v1'

export async function createPost({title, content}){
        return{ 
            title: title,
            content: content
        }
   

}
export async function createComment(title, content){
    return await axios.post('/posts', title, content)
}