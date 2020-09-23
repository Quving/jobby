<template>
  <v-container>
    <form @submit.prevent="submit" autocomplete="on">
      <h1 class="text-center">CREATE JOBGROUP</h1>
      <v-col>
        <v-text-field
            required
            outlined
            counter=25
            :rules="nameRule"
            hint="Select a good jobGroup name!"
            autofocus
            v-model="jobGroupName"
            label="JobGroup name">
        </v-text-field>
        <v-textarea
            required
            outlined
            counter=100
            :rules="descriptionRule"
            v-model="jobGroupDescription"
            label="JobGroup Description"
            hint="Your later self will be happy about a good description.">
        </v-textarea>
        <v-btn
            :loading="addBtnLoading"
            :disabled="false"
            type="submit"
            color="success">
          Add JobGroup
        </v-btn>
      </v-col>
    </form>
  </v-container>
</template>
<script>
import JobbyApi from "@/services/jobbyApi";

export default {
  name: 'App',
  components: {},
  data: () => ({
    nameRule: [
      v => !!v || 'Setting a name is required.',
      v => v.length <= 100 || 'Must be less than 100 characters.'
    ],
    descriptionRule: [
      v => !!v || 'Providing a description is required.',
      v => v.length <= 500 || 'Must be less than 500 characters.'
    ],
    addBtnLoading: false,
    jobGroupName: "",
    jobGroupDescription: "",
  }),
  methods: {
    submit: function () {
      this.addBtnLoading = true;
      const data = {
        name: this.jobGroupName,
        description: this.jobGroupDescription
      };

      JobbyApi.createJobGroup(data).then((response) => {
        console.log(response);
        this.alert_type = 'success';
        this.status = 'Job created.';
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
};
</script>
