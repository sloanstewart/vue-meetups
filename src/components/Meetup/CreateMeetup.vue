<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h2>Create a new Meetup</h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                requred
                                v-model="title"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="location"
                                label="Location"
                                id="location"
                                v-model="location"
                                requred
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn raised class="primary" @click="onChooseFile">Upload Image</v-btn>
                            <input 
                                type="file" 
                                style="display:none" 
                                ref="chooseFile" 
                                accept="image/*"
                                @change="onFileChosen"
                            >
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="blurb"
                                label="Blurb"
                                id="blurb"
                                v-model="blurb"
                                requred
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                v-model="description"
                                multi-line
                                requred
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="150"></img>
                        </v-flex>
                    </v-layout>
                    <v-layout row mb-2>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-date-picker v-model="date"></v-date-picker>
                            <p>{{date}}</p>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-time-picker v-model="time"></v-time-picker>
                            <p>{{time}}</p>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn
                                type="submit"
                                class="primary"
                                :disabled="!formIsValid"
                            >Create Meetup</v-btn>
                            <p>{{formattedDateTime}}</p>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import moment from 'moment'
    export default {
        data () {
            return {
                title: '',
                location: '',
                imageUrl: '',
                blurb: '',
                description: '',
                date: moment().toISOString().split('T')[0],
                time: moment().toISOString().split('T')[1].substr(1, 4),
                image: null
            }
        },
        computed: {
            formIsValid () {
                return  this.title !== '' && 
                this.location !== '' && 
                this.imageUrl !== '' &&
                this.blurb !== '' &&
                this.description !== ''
            },
            formattedDateTime() {
                const date = new Date(this.date)
                if (typeof this.time === 'string') {
                    const hours = this.time.match(/^(\d+)/)[1]
                    const minutes = this.time.match(/:(\d+)/)[1]
                    date.setHours(hours)
                    date.setMinutes(minutes)
                } else {
                    date.setHours(date.getHours())
                    date.setMinutes(date.getMinutes())
                }
                console.log(date)
                return date
            }
        },
        methods: {
            onCreateMeetup () {
                    if (!this.formIsValid) {
                        return
                    }
                    if (!this.image) {
                        return
                    }
                const meetupData = {
                    title: this.title,
                    date: this.date,
                    time: this.time,
                    location: this.location,
                    image: this.image,
                    blurb: this.blurb,
                    description: this.description
                }
                this.$store.dispatch('createMeetup', meetupData)
                this.$router.push('/meetups')
            },
            onChooseFile () {
                this.$refs.chooseFile.click()
            },
            onFileChosen (event) {
                const files = event.target.files
                let filename = files[0].name
                if (filename.lastIndexOf('.') <= 0) {
                    return alert('Please add valid image file')
                }
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.imageUrl = fileReader.result
                })
                fileReader.readAsDataURL(files[0])
                this.image = files[0]
            }
        }
    }
</script>