<template>
  <v-container>
    <view-headers header="Create Job"></view-headers>
    <form @submit.prevent="submit" autocomplete="on">
      <v-col>
        <v-text-field
            required
            outlined
            counter=25
            hint="Select a good job name!"
            autofocus
            v-model="jobName"
            label="Job name">
        </v-text-field>
        <v-textarea
            required
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
            item-text="name"
            item-value="id"
            label="JobGroup"
            hint="Select JobGroup"
            persistent-hint
        ></v-select>
        <v-select
            outlined
            class="mt-7 mb-7"
            v-model="selectedHostGroup"
            item-text="name"
            item-value="id"
            :items="hostGroups"
            :menu-props="{ maxHeight: '400', maxWidth:'200' }"
            label="HostGroup"
            hint="Select HostGroup"
            persistent-hint
        ></v-select>
        <v-alert class="mt-5 mb-5" dense v-if='status' v-bind:type="alert_type">{{ status }}</v-alert>
        <v-btn
            :loading="addBtnLoading"
            :disabled="false"
            color="success"
            type="submit">
          Add Job
        </v-btn>
      </v-col>
    </form>
  </v-container>
</template>
<script>
import JobbyApi from "@/services/jobbyApi";
import ViewHeaders from "@/components/ViewHeader";

export default {
  name: 'App',
  components: {ViewHeaders},
  data: () => ({
    // Status bar
    alert_type: "",
    status: "",

    // Form variables
    nameRule: [
      v => !!v || 'Setting a name is required.',
      v => v.length <= 100 || 'Must be less than 100 characters.'
    ],
    descriptionRule: [
      v => !!v || 'Providing a description is required.',
      v => v.length <= 500 || 'Must be less than 500 characters.'
    ],
    osRule: [
      v => !!v || 'Providing a OS is required.',
      v => v.length <= 25 || 'Must be less than 25 characters.'
    ],
    jobName: "",
    jobDescription: "",
    selectedJobGroup: 0,
    selectedHostGroup: 0,
    jobGroups: [],
    hostGroups: [],

    addBtnLoading: false,
  }),
  created() {
    this.fetchData();
  },
  methods: {
    fetchData: function () {
      JobbyApi.listHosts().then(response => {
        this.hostGroups = response;
      }, (error => {
        console.log(error)
      }));
      JobbyApi.listJobGroups().then(response => {
        this.jobGroups = response;
      }, (error => {
        console.log(error)
      }));
    },
    submit: function () {
      this.addBtnLoading = true;

      const data = {
        name: this.jobName,
        jobgroup: this.selectedJobGroup,
        host: this.selectedHostGroup,
        description: this.jobDescription
      };

      JobbyApi.createJob(data).then((response) => {
        response;
        this.alert_type = 'success';
        this.status = 'Host created.';
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'Job could not be created.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
      });
      this.addBtnLoading = false;
    }
  }
}
</script>

