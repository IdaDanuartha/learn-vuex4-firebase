import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: null,
    authIsReady: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      console.log('user state changed: ', state.user)
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload
    }
  },
  actions: {
    async signup(context, {email, password}) {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if(res) {
        context.commit('setUser', res.user)
      } else {
        throw new Error('could not complete signup')
      }
    },
    async login(context, {email, password}) {
      const res = await signInWithEmailAndPassword(auth, email, password)

      if(res) {
        context.commit('setUser', res.user)
      } else {
        throw new Error('could not complete login')
      }
    },
    async logout(context) {
      await signOut(auth)
      context.commit('setUser', null)
    },
    async addBlog(context, { title, content}) {
      try {
        const docRef = await addDoc(collection(db, "blogs"), {
          title,
          content,
          created_at: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }
})

// wait until auth is ready
const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)
  unsub()
})

export default store