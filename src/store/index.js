import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      loadedMeetups: [
            // {   
            //     id: '45sdfh8dh',
            //     title: 'Atlanta Developer Conference',
            //     date: moment(),
            //     location: 'Atlanta, GA',
            //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Atlanta_Skyline_from_Buckhead.jpg',
            //     blurb: 'atl blah blah blah',
            //     description: 'atl description'
            // },
            // {
            //     id: 'hf5hjtr65',
            //     title:'Makin\' Damn Games',
            //     date: moment(),
            //     location: 'Hell, Underworld',
            //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Gdc2010_newell_portal_BSOD.jpg',
            //     blurb: 'blah blah blah',
            //     description: 'description'
            // },
            // {   id: '5gas8adg',
            //     title: 'Cookie Clicker Group Session',
            //     date: moment(),
            //     location: 'Innernet',
            //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/OSCAL_2016_-_conference_moments_93.jpg',
            //     blurb: 'cookie clicker blah blah blah click it',
            //     description: 'cookie clicker description'
            // }
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedMeetups (state, payload) {
          state.loadedMeetups = payload  
        },
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        updateMeetup (state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if (payload.title) {
                meetup.title = payload.title
            }
            if (payload.description) {
                meetup.description = payload.description
            }
            if (payload.location) {
                meetup.location = payload.location
            }
            if (payload.date) {
                meetup.date = payload.date
            }
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        loadMeetups ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
            .then((data) => {
                const meetups = []
                const obj = data.val()
                for (let key in obj) {
                    meetups.push({
                        id: key,
                        title: obj[key].title,
                        location: obj[key].location,
                        imageUrl: obj[key].imageUrl,
                        blurb: obj[key].blurb,
                        description: obj[key].description,
                        date: obj[key].date,
                        creatorId: obj[key].creatorId
                    })
                }
                commit('setLoadedMeetups', meetups)
                commit('setLoading', false)
            })
            .catch(
                (error) => {
                    console.error(error)
                    commit('setLoading', false)
            })
        },
        createMeetup ({commit, getters}, payload) {
            const meetup = {
                title: payload.title,
                date: payload.date,
                location: payload.location,
                blurb: payload.blurb,
                description: payload.description,
                creatorId: getters.user.id
            }
            console.log('--->',meetup.date)
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(key => {
                    const filename = payload.image.name
                    const extension = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('meetups/' + key + extension).put(payload.image)
                })
                .then(fileData => {
                    imageUrl = fileData.metadata.downloadURLs[0]
                    return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
                })
                .then(() => {
                    commit('createMeetup', {
                        ...meetup,
                        imageUrl: imageUrl,
                        id: key
                    })
                })
                .catch(error => 
                    console.error(error)
                )
        },
        updateMeetupData ({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.location) {
                updateObj.location = payload.location
            }
            if (payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
            .then(() => {
                commit('setLoading', false)
                commit('updateMeetup', payload)
            })
            .catch(error => {
                console.error(error)
                commit('setLoading', false)
            })
        },
        userSignUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                    commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)
                    }    
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.error(error)
                    }    
                )
        },
        userSignIn ({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', true)
                        commit('clearError')
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)
                    }    
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.error(error)
                    }
                )
        },
        autoSignIn ({commit}, payload) {
            commit('setUser', {id: payload.uid, registeredMeetups: []})
        },
        signOut ({commit}) {
            firebase.auth().signOut()
          commit('setUser', null)  
        },
        clearError ({commit}) {
            commit('clearError')
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
        },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
})