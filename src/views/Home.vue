<template>
  <div class="home">

    <form action="">
      <input type="text" placeholder="email" v-model="email">
      <input type="text" placeholder="name" v-model="name" v-if="inputUser">
      <input type="password" placeholder="password" v-model="password">
      <p v-if="inputUser">Please enter your preffered email and password</p>
    </form>
    <button @click="login">Login</button>
    <button v-if="authData" @click="showPosts">toggle posts</button>
    <button @click="inputUser = true">Click to create account</button>
    <button v-if="inputUser" @click="createUser">Create account</button>
    <div class="posts" v-if="printPosts">{{posts.data.posts[0].content}}</div>

    <form @submit.prevent="createPost">
      <input type="text" v-model="blogPost.title">
      <input type="text" v-model="blogPost.content">
      <button>Create post</button>
    </form>

    <div v-if="posts">
    {{posts[0].title}} {{posts[0].content}}
    </div>
  </div>



</template>

<script>
import Actions from '@/store/action.types.js'
export default {
  data() {return{
    email: 'angelica.kassulke@hotmail.com',
    name: '',
    password: 'grillkorv',
    printPosts: false,
    inputUser: false,
    blogPost:{
      title: '',
      comment: ''
    }
  } 
  },
  computed:{
    authData(){
      return this.$store.state.authData
    },
    posts(){
      return this.$store.state.posts
    }
  },
  methods:{
    login(){
      this.$store.dispatch('authenticate', {email: this.email, password: this.password}) 
    },
    createUser(){
      this.$store.dispatch('createAccount', {email: this.email, name: this.name, password: this.password})
    },
    showPosts(){
      this.printPosts = !this.printPosts
      this.$store.dispatch('showPosts') 
    },
    createPost(){
      this.$store.dispatch(Actions.CREATE_POST, {title: this.blogPost.title, content: this.blogPost.content})
    }
  }
}
</script>
