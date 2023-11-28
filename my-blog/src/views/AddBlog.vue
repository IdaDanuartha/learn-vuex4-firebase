<template>
  <div class="home">
    <form @submit.prevent="addBlog()" enctype="multipart/form-data">
      <div>
        <img :src="previewThumbnail" alt="">
        <input type="file" @change="previewImg()" ref="thumbnail">
      </div>
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
  content: '',  
})

const thumbnail = ref(null)
const previewThumbnail = ref(null)

const previewImg = () => {
  let thumb = thumbnail.value
  if (thumb.files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      previewThumbnail.value = e.target.result;
    }
    thumbnail.value = thumb.files[0];
    reader.readAsDataURL(thumb.files[0]);
  }
}

const store = useStore()
const router = useRouter()

const addBlog = async () => {
  await store.dispatch('addBlog', {
    title: newBlogContent.value.title,
    content: newBlogContent.value.content,
    thumbnail: thumbnail.value
  })
  newBlogContent.value = ''
  router.push('/')
}
</script>

<style>

</style>