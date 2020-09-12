<template>
    <v-container>
        <v-col>
            <h2 class="mb-7">New Job</h2>
            <v-text-field
                outlined
                counter=25
                hint="Select a good job name!"
                autofocus
                v-model="jobName"
                label="Job name">
            </v-text-field>
            <v-textarea
                outlined
                counter=100
                v-model="jobDescription"
                label="Job Description"
                hint="Your later self will be happy about a good description.">
            </v-textarea>
            <v-select
                outlined
                v-model="selectedJobGroup"
                :items="jobGroups"
                :menu-props="{ maxHeight: '400', maxWidth:'200' }"
                label="JobGroup"
                hint="Select JobGroup"
                persistent-hint
            ></v-select>
            <v-select
                outlined
                class="mt-7 mb-7"
                v-model="selectedHostGroup"
                :items="hostGroups"
                :menu-props="{ maxHeight: '400', maxWidth:'200' }"
                label="HostGroup"
                hint="Select HostGroup"
                persistent-hint
            ></v-select>
            <v-btn
                :loading="addBtnLoading"
                :disabled="false"
                color="success"
                @click="addJob">
                Add Job
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
            jobName: "",
            jobDescription: "",
            selectedJobGroup: "",
            selectedHostGroup: "",
            jobGroups: ["Job Group 1", "Job Group 2"],
            hostGroups: ["Host Group 1", "Host Group 2"],
        }),
        methods: {
            addJob: function () {

            }
        }
    };
</script>

