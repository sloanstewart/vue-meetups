// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import moment from 'moment'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VCard,
  VDatePicker,
  VTimePicker,
  VIcon,
  VGrid,
  VToolbar,
  VTextField,
  VCarousel,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VCard,
    VDatePicker,
    VTimePicker,
    VIcon,
    VGrid,
    VToolbar,
    VTextField,
    VCarousel,
    transitions
  }
})

Vue.config.productionTip = false
Vue.filter('dateToLocal', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  moment,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyAF4XpF4A8y3NvUwrJpcseJSNP1hUAgdpg",
      authDomain: "vue-meetups-4da35.firebaseapp.com",
      databaseURL: "https://vue-meetups-4da35.firebaseio.com",
      projectId: "vue-meetups-4da35",
      storageBucket: "vue-meetups-4da35.appspot.com",
    })
  }
})
