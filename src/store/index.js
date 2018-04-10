import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      loadedMeetups: [
            {   
                id: '45sdfh8dh',
                title: 'Atlanta Developer Conference',
                date: '2018/04/31',
                location: 'Atlanta, GA',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Atlanta_Skyline_from_Buckhead.jpg',
                blurb: 'atl blah blah blah',
                description: 'atl description'
            },
            {
                id: 'hf5hjtr65',
                title:'Makin\' Damn Games',
                date: '2018/06/02',
                location: 'Hell, Underworld',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Gdc2010_newell_portal_BSOD.jpg',
                blurb: 'blah blah blah',
                description: 'description'
            },
            {   id: '5gas8adg',
                title: 'Cookie Clicker Group Session',
                date: '2018/08/25',
                location: 'Innernet',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/OSCAL_2016_-_conference_moments_93.jpg',
                blurb: 'cookie clicker blah blah blah click it',
                description: 'cookie clicker description'
            }
        ],
        user: {
            id: 'adsfh5jt5',
            registeredMeetups: ['hf5hjtr65'],
        }
    },
    mutations: {},
    actions: {},
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
        }
    }
})