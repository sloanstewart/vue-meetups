<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <form @submit.prevent="onSignUp">
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                                name="email"
                                                label="Email"
                                                id="email"
                                                type="email"
                                                v-model="email"
                                                required
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                                name="password"
                                                label="Password"
                                                id="password"
                                                type="password"
                                                v-model="password"
                                                required
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                id="confirmPassword"
                                                type="password"
                                                v-model="confirmPassword"
                                                :rules="[comparePasswords]"
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs12>
                                            <v-btn type="submit">Sign Up</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </form>
                            </v-container>
                        </v-card-text>
                    </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    computed: {
      comparePasswords () {
          return this.password !== this.confirmPassword ? 'Passwords do not match' : true
      },
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
        user (value) {
            if (value !== null && value !== 'undefined') {
                this.$router.push('/')
            }
        }
    },
    methods: {
        onSignUp () {
            this.$store.dispatch('userSignUp', {email: this.email, password: this.password})
        }
    }
}
</script>
