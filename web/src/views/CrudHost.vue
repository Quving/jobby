<template>
  <v-container>
    <view-headers :header="headerText"></view-headers>
    <v-row justify="center">
      <v-col cols="6">
        <form @submit.prevent="submit" autocomplete="on">
          <h2 class="mb-5 text-center">Properties</h2>
          <h3 class="form-header">Name</h3>
          <v-text-field
              :readonly="formReadOnly"
              required
              outlined
              counter=100
              hint="Select a good host name!"
              v-model="hostName"
              :persistent-hint="persistentHint"
              label="Host name">
          </v-text-field>
          <h3 class="form-header">Description</h3>
          <v-textarea
              :readonly="formReadOnly"
              required
              outlined
              counter=500
              v-model="hostDescription"
              label="Host Description"
              persistent-hint
              hint="Your later self will be happy about a good description.">
          </v-textarea>
          <h3 class="form-header">Operating System</h3>
          <v-text-field
              :readonly="formReadOnly"
              required
              outlined
              counter=25
              hint="E.g. 'Ubuntu 20.04 LTS'"
              v-model="hostOS"
              :persistent-hint="persistentHint"
              label="Host OS">
          </v-text-field>
          <h3 class="form-header">Hostgroup</h3>
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
              :persistent-hint="persistentHint"
          ></v-select>
          <v-text-field
              v-else
              :readonly="formReadOnly"
              required
              outlined
              v-model="selectedHostGroupId"
              :menu-props="{ maxHeight: '400', maxWidth:'200' }"
              label="HostGroup"
              hint="Select HostGroup"
              :persistent-hint="persistentHint"
          ></v-text-field>
          <v-alert class="mt-5 mb-5" dense v-if='status' v-bind:type="alert_type">{{ status }}</v-alert>
          <v-btn
              :loading="submitBtnLoading"
              :color="submitBtnColor"
              v-if="action !== 'read'"
              type="submit">
            {{ submitBtnText }}
          </v-btn>
        </form>
      </v-col>
    </v-row>
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
      persistentHint: true,
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
  },
  methods: {
    initState: function () {
      const dynamicActionVars = {
        create: {
          fetchObjectOfInterest: false,
          formReadOnly: false,
          submitBtnColor: "success",
          headerText: "Add Host",
          submitBtnText: "Add Host"
        },
        read: {
          fetchObjectOfInterest: true,
          formReadOnly: true,
          submitBtnColor: "warning",
          headerText: "View Host",
          submitBtnText: "Update"
        },
        update: {
          fetchObjectOfInterest: true,
          formReadOnly: false,
          submitBtnColor: "warning",
          headerText: "Update Host",
          submitBtnText: "Update"
        },
        delete: {
          fetchObjectOfInterest: true,
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

      // Fetch hostgroups. It's required on every action.
      JobbyApi.listHostGroups("?limit=250").then(data => {
        this.hostGroups = data.results;
      }, error => {
        console.log(error);
      });
      if (dynamicVariables.fetchObjectOfInterest) {
        JobbyApi.getHost(this.id).then(data => {
          this.hostName = data.name;
          this.hostDescription = data.description;
          this.hostOS = data.os;

          this.selectedHostGroupId = (dynamicVariables.formReadOnly) ? data.hostgroup_detailed.name : data.hostgroup_detailed.id;
        });
      }
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

        setTimeout(() => {
          this.$router.push("/hosts");
        }, 1000);
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

        setTimeout(() => {
          this.$router.push("/hosts");
        }, 1000);
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
    }
  }
};
</script>
<style>
.form-header {
  margin-top: 5mm;
  margin-bottom: 3mm;
}

</style>
