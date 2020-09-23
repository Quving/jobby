<template>
  <v-container>
    <view-headers header="ADD HOST"></view-headers>
    <form @submit.prevent="submit" autocomplete="on">
      <v-col >
        <v-text-field
            required
            outlined
            counter=100
            hint="Select a good host name!"
            v-model="hostName"
            label="Host name">
        </v-text-field>
        <v-textarea
            required
            outlined
            counter=500
            v-model="hostDescription"
            label="Host Description"
            hint="Your later self will be happy about a good description.">
        </v-textarea>
        <v-text-field
            required
            outlined
            counter=25
            hint="E.g. 'Ubuntu 20.04 LTS'"
            v-model="hostOS"
            label="Host OS">
        </v-text-field>
        <v-select
            required
            outlined
            v-model="selectedHostGroupId"
            :items="hostGroups"
            item-text="name"
            item-value="id"
            :menu-props="{ maxHeight: '400', maxWidth:'200' }"
            label="HostGroup"
            hint="Select HostGroup"
            persistent-hint
        ></v-select>
        <v-alert class="mt-5 mb-5" dense v-if='status' v-bind:type="alert_type">{{ status }}</v-alert>
        <v-btn
            :loading="addBtnLoading"
            color="success"
            type="submit">
          Create Host
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
    formIsValid: false,
    hostName: "",
    hostOS: "",
    hostGroups: [],
    hostDescription: "",
    selectedHostGroupId: undefined,
    alert_type: "",
    status: "",
  }),
  created() {
    this.fetchHostGroups();
  },
  methods: {
    fetchHostGroups: function () {
      JobbyApi.listHostGroups().then(data => {
        this.hostGroups = data;
      }, error => {
        console.log(error);
      });
    },
    submit: function () {
      this.addBtnLoading = true;

      const data = {
        name: this.hostName,
        os: this.hostOS,
        hostgroup: this.selectedHostGroupId,
        description: this.hostDescription
      };

      JobbyApi.createHost(data).then((response) => {
        console.log(response);
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

