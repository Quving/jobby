<template>
  <v-container>
    <view-headers :header="headerText"></view-headers>
    <form @submit.prevent="submit" autocomplete="on">
      <v-col>
        <v-text-field
            :readonly="formReadOnly"
            required
            outlined
            counter=100
            hint="Select a good host name!"
            v-model="hostName"
            label="Host name">
        </v-text-field>
        <v-textarea
            :readonly="formReadOnly"
            required
            outlined
            counter=500
            v-model="hostDescription"
            label="Host Description"
            hint="Your later self will be happy about a good description.">
        </v-textarea>
        <v-text-field
            :readonly="formReadOnly"
            required
            outlined
            counter=25
            hint="E.g. 'Ubuntu 20.04 LTS'"
            v-model="hostOS"
            label="Host OS">
        </v-text-field>
        <v-select
            v-if="!formReadOnly"
            outlined
            :items="hostGroups"
            v-model="selectedHostGroupId"
            item-text="name"
            item-value="id"
            :menu-props="{ maxHeight: '400', maxWidth:'200' }"
            label="HostGroup"
            hint="Select HostGroup"
            persistent-hint
        ></v-select>
        <v-text-field
            v-else
            :readonly="formReadOnly"
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
        ></v-text-field>
        <v-alert class="mt-5 mb-5" dense v-if='status' v-bind:type="alert_type">{{ status }}</v-alert>
        <v-btn
            :loading="submitBtnLoading"
            :color="submitBtnColor"
            v-if="action !== 'read'"
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
      formReadOnly: false,
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
          fetchData: false,
          formReadOnly: false,
          submitBtnColor: "success",
          headerText: "Add Host",
          submitBtnText: "Add Host"
        },
        read: {
          fetchData: true,
          formReadOnly: true,
          submitBtnColor: "warning",
          headerText: "View Host",
          submitBtnText: "Update"
        },
        update: {
          fetchData: true,
          formReadOnly: false,
          submitBtnColor: "warning",
          headerText: "Update Host",
          submitBtnText: "Update"
        },
        delete: {
          fetchData: true,
          formReadOnly: true,
          submitBtnColor: "error",
          headerText: "Delete Host",
          submitBtnText: "Delete"
        },
      };
      const dynamicVariables = dynamicActionVars[this.action];
      this.formReadOnly = dynamicVariables.formReadOnly;
      this.submitBtnText = dynamicVariables.submitBtnText;
      this.headerText = dynamicVariables.headerText;
      this.submitBtnColor = dynamicVariables.submitBtnColor;

      if (dynamicVariables.fetchData) {
        JobbyApi.getHost(this.id).then(data => {
          this.hostName = data.name;
          this.hostDescription = data.description;
          this.hostOS = data.os;

          // Fill v-textfield or v-select depending on field formReadOnly
          this.selectedHostGroupId = (dynamicVariables.formReadOnly) ? data.hostgroup_detailed.name : data.hostgroup_detailed.id;
        });
      }

    },
    fetchHostGroups: function () {
      JobbyApi.listHostGroups().then(data => {
        this.hostGroups = data;
      }, error => {
        console.log(error);
      });
    },
    createHost: function () {
      this.submitBtnLoading = true;
      const data = {
        name: this.hostName,
        os: this.hostOS,
        hostgroup: this.selectedHostGroupId,
        description: this.hostDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.createHost(data).then((response) => {
        this.alert_type = 'success';
        this.status = 'Host has been created.';
        this.submitBtnLoading = false;
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'Host could not be created.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
      });

    },
    updateHost: function () {
      this.submitBtnLoading = true;
      const data = {
        name: this.hostName,
        os: this.hostOS,
        hostgroup: this.selectedHostGroupId,
        description: this.hostDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.updateHost(this.id, data).then((response) => {
        this.alert_type = 'success';
        this.status = 'Host updated.';
        this.submitBtnLoading = false;
      }, (error) => {
        console.log(error);
        this.alert_type = 'error';
        this.status = 'Host could not be updated.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    deleteHost: function () {
      this.submitBtnLoading = true;

      // eslint-disable-next-line no-unused-vars
      JobbyApi.deleteHost(this.id).then((response) => {
        this.alert_type = 'success';
        this.status = 'Host deleted. You will be redirected back in a few seconds.';
        this.submitBtnLoading = false;

      }, (error) => {
        console.log(error);
        this.alert_type = 'error';
        this.status = 'Host could not be deleted.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    submit: function () {
      const funcs = {
        create: this.createHost,
        update: this.updateHost,
        delete: this.deleteHost,
      };
      funcs[this.action]();
      setTimeout(() => {
        this.$router.push("/hosts");
      }, 1000);
    }
  }
};
</script>

