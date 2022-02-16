<template>
  <div class="home">
    <form action="">
      <input type="text" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
    </form>
    <button @click="login">Login</button>
    <button v-if="authData" @click="showPosts">toggle posts</button>
    {{authData}}
    <div class="posts" v-if="printPosts">{{posts.data.posts[0].content}}</div>
    
  </div>
</template>

<script>
export default {
  data() {return{
    email: 'darrin.lebsack@yahoo.com',
    password: 'grillkorv',
    printPosts: false,
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
    showPosts(){
      this.printPosts = !this.printPosts
      this.$store.dispatch('showPosts') 
    }
  }
}
</script>
