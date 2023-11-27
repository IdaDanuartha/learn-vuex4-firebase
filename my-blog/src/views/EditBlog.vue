<template>
  <div class="home">
    <form @submit.prevent="updateBlog()">      
      <input type="text" placeholder="Title blog" v-model="blog.title">
      <input type="text" placeholder="Content blog" v-model="blog.content">
      <button>Save changes</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"

const route = useRoute()

const blog = ref({
  title: '',
  content: ''
})

onMounted(async () => {  
  await store.dispatch('getBlog', {
    id: route.params.id, 
    blog
  })
})

const store = useStore()
const router = useRouter()

const updateBlog = async () => {
  await store.dispatch('updateBlog', {
    id: route.params.id,
    title: blog.value.title,
    content: blog.value.content,
  })  
  router.push('/')
}
</script>

<style>

</style>