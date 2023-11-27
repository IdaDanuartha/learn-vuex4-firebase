<template>
  <div class="home">
    <form @submit.prevent="addBlog()">
      <input type="text" placeholder="Title blog" v-model="newBlogContent.title">
      <input type="text" placeholder="Content blog" v-model="newBlogContent.content">
      <button>Add</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const newBlogContent = ref({
  title: '',
  content: ''
})

const store = useStore()
const router = useRouter()

const addBlog = async () => {
  await store.dispatch('addBlog', {
    title: newBlogContent.value.title,
    content: newBlogContent.value.content,
  })
  newBlogContent.value = ''
  router.push('/')
}
</script>

<style>

</style>