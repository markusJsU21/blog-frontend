<template>
  <main class="profile">
      <button>+</button>
      <div class="profile-picture">
      </div>
       <input type="file" id="image_input" accept="image/png, image/jpg" @change="selectImg">
       <button @click="uploadImg">Upload</button>
       <button @click="log">log pic</button>
  </main>
</template>

<script>
export default {
    data(){return{
        selectedPic: null,
    }},
    methods:{
        selectImg(event){
            this.selectedPic = event.target.files[0]
        },
        uploadImg(){
            this.$store.dispatch('uploadImg', this.selectedPic)
        },
        log(){
            console.log(this.profileImg)
        }
    },
    computed:{
        profileImg(){
            return this.$store.state.profileImg
        }
    }
}
</script>

<style scoped>
.profile-picture{
    width: 200px;
    height: 200px;
    background-color: rgb(194, 194, 194);
    border-radius: 50%;
    margin: auto;
}
button{
    border: none;
    background: none;
    margin:auto;
}
</style>