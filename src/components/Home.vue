<template>
    <v-container>
        <v-layout>
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
        data() {
            return {
                meetups: [
                    {   
                        id: '45sdfh8dh',
                        title: 'Atlanta Developer Conference',
                        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Atlanta_Skyline_from_Buckhead.jpg'
                    },
                    {
                        id: 'hf5hjtr65',
                        title:'Makin\' Damn Games',
                        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Gdc2010_newell_portal_BSOD.jpg'
                    },
                    {   id: '5gas8adg',
                        title: 'Cookie Clicker Group Session',
                        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/OSCAL_2016_-_conference_moments_93.jpg'
                    }
                    ]
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
        bottom: 50px;
        background: rgba(0,0,0,0.5);
        color: #fff;
        font-size: 2rem;
        width: 100%;
        text-align: center;
        padding: 1rem;
    }
</style>