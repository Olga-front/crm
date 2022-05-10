import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)

Vue.component('Loader', Loader)

const firebaseConfig = {
  apiKey: 'AIzaSyAu5F0wIAwRX6MFY8sPf2NMlBxczNkQ5bg',
  authDomain: 'vue--crm-a7f2b.firebaseapp.com',
  projectId: 'vue--crm-a7f2b',
  storageBucket: 'vue--crm-a7f2b.appspot.com',
  messagingSenderId: '809975991218',
  appId: '1:809975991218:web:3fa332749f7dc2b26df2ab',
  measurementId: 'G-9YP59MBQGH'
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
