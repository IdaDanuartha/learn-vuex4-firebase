<template>
  <div class="home">
    <router-link class="btn" :to="{name: 'AddBlog'}">Add Blog</router-link>
    <div v-for="blog in blogs" :key="blog.id">
      <div class="blog">
        <p>{{ blog.created_at }}</p>
        <h3>{{ blog.title }}</h3>
        <p>{{ blog.content }}</p>        
        <div class="icons" v-if="user">
          <span>upvote or downvote this article: </span>
          <span class="material-icons">thumb_up</span>
          <span class="material-icons">thumb_down</span>
        </div>
        <button style="background-color: rgb(233, 48, 48); margin-top: 10px;" v-on:click="deleteBlog(blog.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const blogs = ref([])
const user = computed(() => store.state.user)

onMounted(() => {
  // Get realtime updates
  store.dispatch('getBlogs', blogs)
})    

store.commit('setUser', store.state.user)  

const deleteBlog = (id) => {
  const confirmDelete = confirm('Are you sure you want to delete')

  if(confirmDelete) {
    store.dispatch('deleteBlog', id)
  }
}
</script>
