<template>
    <v-dialog persistent v-model="registerDialog">
        <v-btn primary slot="activator">
            {{ userIsRegistered ? 'Unregister' : 'Register' }}
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title v-if="userIsRegistered">Unregister for this Meetup?</v-card-title>
                        <v-card-title v-else><h3>Register for this Meetup?</h3></v-card-title>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat @click="registerDialog = false">Cancel</v-btn>
                            <v-btn flat @click="onConfirm">Confirm</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['id'],
        data () {
            return {
                registerDialog: false
            }
        },
        computed: {
            userIsRegistered () {
                return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                    return meetupId === this.id
                }) >= 0
            }
        },
        methods: {
            onConfirm () {
                if (this.userIsRegistered) {
                    this.$store.dispatch('unregisterUserForMeetup', this.id)
                } else {
                    this.$store.dispatch('registerUserForMeetup', this.id)
                }
                this.registerDialog = false
            }
        }
    }
</script>