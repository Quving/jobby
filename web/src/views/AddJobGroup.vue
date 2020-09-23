<template>
  <v-container>
    <view-headers header="Create Jobgroup"></view-headers>
    <form @submit.prevent="submit" autocomplete="on">
      <v-col>
        <v-text-field
            required
            outlined
            counter=25
            hint="Select a good jobGroup name!"
            v-model="jobGroupName"
            label="JobGroup name">
        </v-text-field>
        <v-textarea
            required
            outlined
            counter=100
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
import ViewHeaders from "@/components/ViewHeader";

export default {
  name: 'App',
  components: {ViewHeaders},
  data: () => ({
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
