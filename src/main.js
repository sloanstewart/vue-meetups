// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import moment from 'moment'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import Alert from './components/shared/Alert'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VAlert,
  VBtn,
  VCard,
  VDatePicker,
  VDialog,
  VDivider,
  VMenu,
  VTimePicker,
  VIcon,
  VGrid,
  VProgressCircular,
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
    VAlert,
    VBtn,
    VCard,
    VDatePicker,
    VDialog,
    VDivider,
    VMenu,
    VTimePicker,
    VIcon,
    VGrid,
    VProgressCircular,
    VToolbar,
    VTextField,
    VCarousel,
    transitions
  }
})

Vue.config.productionTip = false
Vue.filter('dateToLocal', DateFilter)
Vue.component('app-alert', Alert)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)

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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
