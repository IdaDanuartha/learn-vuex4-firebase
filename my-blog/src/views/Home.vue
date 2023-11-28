<template>
  <div class="home">
    <router-link class="btn" :to="{name: 'AddBlog'}">Add Blog</router-link>
    <div v-for="blog in blogs" :key="blog.id">
      <div class="blog">
        <img :src="thumbnail" alt="">
        <p>{{ blog.created_at }}</p>
        <h3>{{ blog.title }}</h3>
        <p>{{ blog.content }}</p>        
        <div class="icons" v-if="user">
          <span>upvote or downvote this article: </span>
          <span class="material-icons" v-on:click="updateVote(blog.id, true)" :class="blog.is_vote == true ? 'active':''">thumb_up</span>
          <span class="material-icons" v-on:click="updateVote(blog.id, false)" :class="blog.is_vote == false ? 'active':''">thumb_down</span>
        </div>
        <router-link class="btn" :to="{name: 'EditBlog', params: {id: blog.id}}" style="background-color: rgb(233, 155, 9); margin: 0 10px 10px 0;">Edit</router-link>
        <button style="background-color: rgb(233, 48, 48); margin-top: 10px;" v-on:click="deleteBlog(blog.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getDownloadURL, ref as refFirebase } from 'firebase/storage';
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { storage } from '../firebase/config';

const store = useStore()
const blogs = ref([])
const user = computed(() => store.state.user)
const thumbnail = ref(null)

onMounted(async () => {
  // Get realtime updates
  await store.dispatch('getBlogs', blogs)

  // Get image from firebase storage
  getDownloadURL(refFirebase(storage, 'blogs/logo_atrem.png')).then(
    (download_url) => (thumbnail.value = download_url)
  )

  setTimeout(() => {
    console.log(blogs.value)
  }, 3000)
})    

store.commit('setUser', store.state.user)  

const updateVote = async (id, vote) => {
  await store.dispatch('updateVote', {
    id,
    vote
  })  
}

const deleteBlog = (id) => {
  const confirmDelete = confirm('Are you sure you want to delete')

  if(confirmDelete) {
    store.dispatch('deleteBlog', id)
  }
}
</script>

<style>
.btn {
  font-size: 12px;
}
.material-icons.active {
  color: rgb(89, 202, 132);
}
</style>