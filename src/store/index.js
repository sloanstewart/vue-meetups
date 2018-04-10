import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      loadedMeetups: [
            {   
                id: '45sdfh8dh',
                title: 'Atlanta Developer Conference',
                date: moment(),
                location: 'Atlanta, GA',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Atlanta_Skyline_from_Buckhead.jpg',
                blurb: 'atl blah blah blah',
                description: 'atl description'
            },
            {
                id: 'hf5hjtr65',
                title:'Makin\' Damn Games',
                date: moment(),
                location: 'Hell, Underworld',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Gdc2010_newell_portal_BSOD.jpg',
                blurb: 'blah blah blah',
                description: 'description'
            },
            {   id: '5gas8adg',
                title: 'Cookie Clicker Group Session',
                date: moment(),
                location: 'Innernet',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/OSCAL_2016_-_conference_moments_93.jpg',
                blurb: 'cookie clicker blah blah blah click it',
                description: 'cookie clicker description'
            }
        ],
        user: null
    },
    mutations: {
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        createMeetup ({commit}, payload) {
            const meetup = {
                title: payload.title,
                date: payload.date,
                location: payload.location,
                imageUrl: payload.imageUrl,
                blurb: payload.blurb,
                description: payload.description,
                
                id: 'poop'
            }
            // TODO: Store in Firebase
            commit('createMeetup', meetup)
        },
        userSignUp ({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)
                    }    
                )
                .catch(
                    error => {
                        console.error(error)
                    }    
                )
        }
    },
    getters: {
        loadedMeetups (state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        loadedMeetup (state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id == meetupId
                })
            }
        },
        featuredMeetups (state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        user (state) {
            return state.user
        }
    }
})