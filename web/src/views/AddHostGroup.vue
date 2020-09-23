<template>
  <v-container>
    <view-headers header="Create HostGroup"></view-headers>
    <form @submit.prevent="submit" autocomplete="on">
      <v-col>
        <v-text-field
            required
            outlined
            counter=25
            hint="Select a good hostGroup name!"
            autofocus
            v-model="hostGroupName"
            label="HostGroup name">
        </v-text-field>
        <v-textarea
            required
            outlined
            counter=100
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
import ViewHeaders from "@/components/ViewHeader";

export default {
  name: 'App',
  components: {ViewHeaders},
  data: () => ({
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

