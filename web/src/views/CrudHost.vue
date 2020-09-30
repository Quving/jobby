<template>
  <v-container>
    <view-headers :header="headerText"></view-headers>
    <form @submit.prevent="submit" autocomplete="on">
      <v-col>
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
            :loading="submitBtnLoading"
            :color="submitBtnColor"
            type="submit">
          {{ submitBtnText }}
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
  data() {

    return {
      // Url Params
      id: this.$route.params.id,
      action: this.$route.params.action,

      // Site
      headerText: "",

      // Form
      submitBtnLoading: false,
      formIsValid: false,
      hostName: "",
      hostDescription: "",
      hostOS: "",
      hostGroups: [],
      selectedHostGroupId: undefined,
      submitBtnColor: "",
      submitBtnText: "",

      // Status
      alert_type: "",
      status: "",
    }
  },
  created() {
    this.initState();
    this.fetchHostGroups();
  },
  methods: {
    initState: function () {
      const dynamicActionVars = {
        create: {
          submitBtnColor: "success",
          headerText: "Add Host",
          submitBtnText: "Add Host"
        },
        edit: {
          submitBtnColor: "warning",
          headerText: "Update Host",
          submitBtnText: "Update"
        },
        delete: {
          submitBtnColor: "error",
          headerText: "Delete Host",
          submitBtnText: "Delete"
        },
      };
      const actionVar = dynamicActionVars[this.action];
      this.submitBtnText = actionVar.submitBtnText;
      this.headerText = actionVar.headerText;
      this.submitBtnColor = actionVar.submitBtnColor;

    },
    fetchHostGroups: function () {
      JobbyApi.listHostGroups().then(data => {
        this.hostGroups = data;
      }, error => {
        console.log(error);
      });
    },
    createHost: function () {
      const data = {
        name: this.hostName,
        os: this.hostOS,
        hostgroup: this.selectedHostGroupId,
        description: this.hostDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.createHost(data).then((response) => {
        this.alert_type = 'success';
        this.status = 'Host created.';
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'Host could not be created.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
      });

    },
    editHost: function () {

    },
    deleteHost: function () {

    },
    submit: function () {
      this.submitBtnLoading = true;

      const funcs = {
        create: this.createHost,
        edit: this.editHost,
        delete: this.deleteHost,
      };
      funcs[this.action]();

      this.submitBtnLoading = false;
    }
  }
};
</script>

