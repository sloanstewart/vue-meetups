<template>
    <v-dialog width="80%" persistent v-model="editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                             <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                requred
                                v-model="editedTitle"
                            ></v-text-field>
                            <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                multi-line
                                requred
                                v-model="editedDescription"
                            ></v-text-field>
                            <v-text-field
                                name="location"
                                label="Location"
                                id="location"
                                multi-line
                                requred
                                v-model="editedLocation"
                            ></v-text-field>
                <p>{{this.newValues}}</p>
                            <v-menu
                                ref="datePickerMenu"
                                lazy
                                :close-on-content-click="false"
                                v-model="datePicker"
                                transition="scale-transition"
                                offset-y
                                full-width
                                :nudge-right="40"
                                min-width="290px"
                                :return-value.sync="editedDate"
                            >
                                <v-text-field
                                    slot="activator"
                                    label="Date"
                                    v-model="editedDate"
                                    readonly
                                ></v-text-field>
                                <v-date-picker v-model="editedDate" no-title scrollable v-if="datePicker">
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="onDateCancel">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="onDateSave">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                            <v-menu
                                ref="timePickerMenu"
                                lazy
                                :close-on-content-click="false"
                                v-model="timePicker"
                                transition="scale-transition"
                                offset-y
                                full-width
                                :nudge-right="40"
                                min-width="290px"
                                :return-value.sync="editedTime"
                            >
                                <v-text-field
                                    slot="activator"
                                    label="Time"
                                    v-model="editedTime"
                                    readonly
                                ></v-text-field>
                                <v-time-picker v-model="editedTime" no-title scrollable v-if="timePicker">
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="onTimeCancel">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="onTimeSave">OK</v-btn>
                                </v-time-picker>
                            </v-menu>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat @click="editDialog = false">Cancel</v-btn>
                            <v-btn flat class="primary--text" @click="onSave">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import moment from 'moment'
    export default {
        props: ['meetup'],
        data () {
            return {
                datePicker: false,
                timePicker: false,
                editDialog: false,
                editedTitle: this.meetup.title,
                editedDescription: this.meetup.description,
                editedLocation: this.meetup.location,
                editedDate: null,
                newDate: null,
                editedTime: null,
                editedTime: null,
                newValues: moment(this.newDate + this.newTime).format()
            }
        },
        methods: {
            onDateCancel () {
                this.datePicker = false,
                this.editedDate = moment(this.meetup.date).format('YYYY-MM-DD')
            },
            onDateSave () {
                this.datePicker = false
                this.newDate = this.editedDate
                this.$refs.datePickerMenu.save(this.editedDate)
            },
            onTimeCancel () {
                this.timePicker = false
                this.editedTime = moment(this.meetup.time).format('YYYY-MM-DD')
            },
            onTimeSave () {
                this.timePicker = false
                this.newTime = this.editedTime
                this.$refs.timePickerMenu.save(this.editedTime)
            },
            onSave () {
                if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
                    return
                }
                this.editDialog = false
                this.$store.dispatch('updateMeetupData', {
                    id: this.meetup.id,
                    title: this.editedTitle,
                    description: this.editedDescription,
                    location: this.editedLocation,
                    date: ((this.newDate !== this.meetup.date) && (this.newTime !== this.meetup.time)) && moment(this.newDate + this.newTime).format()
                })
            }
        },
         created () {
            this.editedDate = moment(this.meetup.date).format('YYYY-MM-DD')
            this.editedTime = moment(this.meetup.time).format('hh:mma')
        }
    }
</script>