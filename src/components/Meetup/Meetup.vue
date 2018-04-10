<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title><h4 class="primary--text">Title</h4></v-card-title>
                    <v-card-media
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Atlanta_Skyline_from_Buckhead.jpg"
                        height="400px"
                    ></v-card-media>
                    <v-card-text>
                        <div class="info--text">Date - Location</div>
                        <div>Blah blah blah.</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="primary">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>