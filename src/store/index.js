import Vue from 'vue'
import Vuex from 'vuex'
// import * as API from '@/API'
import * as API from '@/API/mock.js'
import Mutations from '@/store/mutation.types.js'
import Actions from '@/store/action.types.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authData: null,
    posts: [],
    profileImg: null,
    tempPost: null
  },
  mutations: {
    saveAuthData(state, data){
      state.authData=data
    },
    showPosts(state, posts){
      state.posts = posts
    },
    saveProfilePic(state, img){
      state.profileImg = img
    },
    createTempPost(state, post){
      state.tempPost = post
    },
    [Mutations.SAVE_POST](state, post){
      state.posts.push(post)
    }
  },
  actions: {
    async authenticate(context, credentials){
      const response = await API.login(
        credentials.email, credentials.password
      )
      API.saveToken(response.data.token)

      context.commit('saveAuthData', response.data)
    },
    async createAccount(context, credentials){
      const response = await API.createAccount(
        credentials.email, credentials.name, credentials.password
      )
      API.saveToken(response.data.token)

      context.commit('saveAuthData', response.data)

    },
    async showPosts(context){
      const response = await API.getPosts()
      context.commit('showPosts', response)
    },
    async uploadImg(context, img){
      const post = await API.createPost('New Profile Picture', 'You uploaded a new profile picture')
      context.commit('createTempPost', post)
      const response = await API.uploadImg(img, context.state.tempPost.id)
      context.commit('saveProfilePic', response)
    },
    async [Actions.CREATE_POST](context, {title, content}){
      const response = await API.createPost({title, content})
      context.commit(Mutations.SAVE_POST, response)
    }
  },
  
})

//Token sparas i axios och behöver inte skickas med till API.getPosts
// context.state.authData.token