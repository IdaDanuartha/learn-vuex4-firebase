<template>
  <div class="home">
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
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { collection, onSnapshot } from "firebase/firestore"; 
import { db } from '../firebase/config.js'
import moment from "moment"


export default {
  setup() {
    const blogs = ref([])

    onMounted(() => {
      // const querySnapshot = await getDocs(collection(db, "blogs"));
      // const fbBlogs = []
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.data().created_at)
      //   const blog = {
      //     id: doc.id,
      //     title: doc.data().title,
      //     content: doc.data().content,
      //     created_at: moment(doc.data().created_at.toDate(), 'x').format('D MMM Y')
      //   }
      //   fbBlogs.push(blog)
      // });
      // blogs.value = fbBlogs

      // Get realtime updates
      onSnapshot(collection(db, "blogs"), (querySnapshot) => {
        const fbBlogs = []
        querySnapshot.forEach((doc) => {
          console.log(doc.data().created_at)
          const blog = {
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            created_at: moment(doc.data().created_at.toDate(), 'x').format('D MMM Y')
          }
          fbBlogs.push(blog)
        });
        blogs.value = fbBlogs
      });
    })    

    const store = useStore()
    store.commit('setUser', store.state.user)  

    // let blog = ref({
    //   title: '',
    //   content: ''
    // })

    // const addBlog = () => store.dispatch('addBlog', blog)

    return { 
      blogs,
      user: computed(() => store.state.user),
    }
  }
}
</script>
