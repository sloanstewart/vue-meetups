<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onSignOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar app dark class="purple darken-1">
      <v-toolbar-side-icon 
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
        ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DankDevMeetups</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link"
        >
          <v-icon left dark>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn 
          flat
          v-if="userIsAuthenticated"
          @click="onSignOut"
        >
          <v-icon left dark>exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content fluid>
      <main>
        <router-view></router-view>
      </main>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      sideNav: false
    }
  },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Sign Up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign In', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'event', title: 'View Meetups', link: '/meetups'},
            {icon: 'room', title: 'Create Meetup', link: '/meetups/new'},
            {icon: 'person', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== 'undefined'
      }
    },
    methods: {
      onSignOut () {
        this.$store.dispatch('signOut')
      }
    }
}
</script>
