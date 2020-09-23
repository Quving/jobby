<template>
  <v-container>
    <form @submit.prevent="submit" autocomplete="on">
      <h1 class="text-center">CREATE HOSTGROUP</h1>
      <v-col>
        <v-text-field
            required
            outlined
            counter=25
            :rules="nameRule"
            hint="Select a good hostGroup name!"
            autofocus
            v-model="hostGroupName"
            label="HostGroup name">
        </v-text-field>
        <v-textarea
            required
            outlined
            counter=100
            :rules="descriptionRule"
            v-model="hostGroupDescription"
            label="HostGroup Description"
            hint="Your later self will be happy about a good description.">
        </v-textarea>
        <v-alert class="mt-5 mb-5" dense v-if='status' v-bind:type="alert_type">{{ status }}</v-alert>
        <v-btn
            :loading="addBtnLoading"
            :disabled="false"
            type="submit"
            color="success">
          Add HostGroup
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
    hostGroupName: "",
    hostGroupDescription: "",
    alert_type: "",
    status: "",
  }),
  methods: {
    submit: function () {
      this.addBtnLoading = true;
      const data = {
        name: this.hostGroupName,
        description: this.hostGroupDescription
      };

      JobbyApi.createHostGroup(data).then((response) => {
        // ToDo: Parse reponse status code form more detailed informations.
        response;
        this.alert_type = 'success';
        this.status = 'Host created.';
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'Host could not be created.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
      });
      this.addBtnLoading = false;
    }
  }
};
</script>

