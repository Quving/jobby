<template>
    <v-container>
        <v-col>
            <h2 class="mb-7">New Host</h2>
            <v-text-field
                outlined
                counter=25
                hint="Select a good host name!"
                autofocus
                v-model="hostName"
                label="Host name">
            </v-text-field>
            <v-textarea
                outlined
                counter=100
                v-model="hostDescription"
                label="Host Description"
                hint="Your later self will be happy about a good description.">
            </v-textarea>
            <v-btn
                :loading="addBtnLoading"
                :disabled="false"
                color="success"
                @click="addHost">
                Add Host
            </v-btn>
        </v-col>
    </v-container>
</template>
<script>
    export default {
        name: 'App',
        components: {},
        data: () => ({
            addBtnLoading: false,
            hostName: "",
            hostDescription: "",
        }),
        methods: {
            addHost: function () {

            }
        }
    };
</script>

