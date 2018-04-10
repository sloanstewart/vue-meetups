<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-container>
                        <v-layout row>
                            <v-flex xs5 sm4 md3 offset-sm1 offset-md2>
                                <v-card-media
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Atlanta_Skyline_from_Buckhead.jpg"
                                    height="200px"
                                    
                                ></v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h3>Atlanta Dev Blah</h3>
                                        <div>Date or whatever</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn flat class="primary" to="/meetups/1">
                                        <v-icon left light>arrow_forward</v-icon>
                                        View Meetup</v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>