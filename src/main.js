// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const data = require('./assets/messages.json')

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'mdi'
})
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ja',
  messages: data
})

const config = {
  apiKey: 'AIzaSyA05Rsy_-5Ipr94FIII38oCUX0evenhprE',
  authDomain: 'portfolio-30d0b.firebaseapp.com',
  databaseURL: 'https://portfolio-30d0b.firebaseio.com',
  projectId: 'portfolio-30d0b',
  storageBucket: 'portfolio-30d0b.appspot.com',
  messagingSenderId: '1053373457368'
}
const firebaseApp = firebase.initializeApp(config)

export const db = firebaseApp.firestore()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n: i18n,
  router,
  components: {App},
  template: '<App/>'
})
