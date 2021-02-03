import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import messagePlugin from '@/utils/message.plugin'

Vue.config.productionTip = false
Vue.use(messagePlugin)
Vue.use(Vuelidate)
firebase.initializeApp({
  apiKey: "AIzaSyCrMKIVN-rCLccaC30EweqOT0_tvXAFT9g",
  authDomain: "vuetestwork.firebaseapp.com",
  projectId: "vuetestwork",
  storageBucket: "vuetestwork.appspot.com",
  messagingSenderId: "966935954828",
  appId: "1:966935954828:web:2fbcfa384f7a3abdeb82a9"
})
let app
firebase.auth().onAuthStateChanged(() =>{
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

