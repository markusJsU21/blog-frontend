import Vue from 'vue'
import Vuex from 'vuex'
import * as API from '@/API'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authData: null,
    posts: [],
  },
  mutations: {
    saveAuthData(state, data){
      state.authData=data
    },
    showPosts(state, posts){
      state.posts = posts
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
    }
  },
})

//Token sparas i axios och behöver inte skickas med till API.getPosts
// context.state.authData.token