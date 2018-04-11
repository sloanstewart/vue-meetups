<template>
    <v-container>
        <v-layout>
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular 
                    indeterminate 
                    :width="7" 
                    :size="70"
                    class="primary--text"
                    v-if="loading"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        
        <v-layout v-if="!loading">
            <v-flex xs12>
                <v-carousel  style="cursor: pointer">
                    <v-carousel-item
                        v-for="meetup in meetups"
                        :src="meetup.imageUrl"
                        :key="meetup.id"
                        @click.native="onLoadMeetup(meetup.id)"
                    >
                        <div class="title">
                            {{meetup.title}}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn large class="info" router to="/meetups">Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large router class="info" to="/meetups/new">Organize Meetup</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            meetups () {
                return this.$store.getters.featuredMeetups
            },
            loading () {
                return this.$store.getters.loading
            }
        },
        methods: {
            onLoadMeetup (id) {
                console.log('clicked')
                this.$router.push('/meetups/'+id)
            }
        }
    }
</script>

<style scoped>
    v-carousel {
        border-radius: 10px;
    }
    .featured-meetups {
        display: block;
        position: absolute;
        top: 0px;
        background: rgba(0,0,0,0.5);
        color: #fff;
        font-size: 1rem;
        width: 100%;
        text-align: center;
        padding: 1rem;
    }
    .title {
        display: block;
        position: absolute;
        top: 0;
        background: rgba(0,0,0,0.5);
        color: #fff;
        font-size: 2rem;
        width: 100%;
        text-align: center;
        padding: 1rem;
    }
</style>