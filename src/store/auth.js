import firebase from 'firebase/app'
import store from '@/store'
export default {
    actions: {
        async login({commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                commit('setUser', email)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async logout() {
            await firebase.auth().signOut()
            store.commit('clearUser')
        }
    }
}