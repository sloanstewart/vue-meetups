<template>
    <v-dialog width="320px" persistent v-model="editDialog">
        <v-btn accent slot="activator">
            Edit Date
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup Date</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-date-picker style="width=100%" v-model="editableDate" actions>
                            <template slot-scope="{save, cancel}">
                                <v-btn flat @click.native="editDialog=false">Cancel</v-btn>
                                <v-btn flat @click.native="onSave">Save</v-btn>
                            </template>     
                        </v-date-picker>
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
                editDialog: false,
                editableDate: null,
                newDate: moment(this.meetup.date).format('YYYY-MM-DD')
            }
        },
        methods: {
            onSave () {
                this.editDialog = false
                const newDate = moment(this.editableDate).format()
                // const newDay = moment(this.editableDate).getUTCDate()
                // const newMonth = moment(this.editableDate).getUTCMonth()
                // const newYear = moment(this.editableDate).getUTCFullYear()
                // newDate.setUTCDate(newDay)
                // newDate.setUTCMonth(newMonth)
                // newDate.setUTCFullYear(newYear)
                this.$store.dispatch('updateMeetupData', {
                    id: this.meetup.id,
                    date: newDate
                })
            }
        },
        created () {
            this.editableDate = moment(this.meetup.date).format('YYYY-MM-DD')
            // this.editableDate = moment(this.meetup.date).toISOString().split('T')[0]
        }
    }
</script>