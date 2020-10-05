<template>
  <v-container>
    <view-headers :header="headerText"></view-headers>
    <form @submit.prevent="submit" autocomplete="on">
      <v-col>
        <v-text-field
            :readonly="formReadOnly"
            required
            outlined
            counter=25
            hint="Select a good hostGroup name!"
            v-model="hostGroupName"
            label="HostGroup name">
        </v-text-field>
        <v-textarea
            :readonly="formReadOnly"
            required
            outlined
            counter=100
            v-model="hostGroupDescription"
            label="HostGroup Description"
            hint="Your later self will be happy about a good description.">
        </v-textarea>
        <v-alert class="mt-5 mb-5" dense v-if='status' v-bind:type="alert_type">{{ status }}</v-alert>
        <v-btn
            v-if="action !== 'read'"
            :loading="submitBtnLoading"
            :disabled="false"
            type="submit"
            :color="submitBtnColor">
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
      // Other
      id: this.$route.params.id,
      action: this.$route.params.action,

      // Form
      submitBtnLoading: false,
      formReadOnly: true,
      submitBtnColor: "",
      submitBtnText: "",
      hostGroupName: "",
      hostGroupDescription: "",

      // Site
      headerText: "",

      // Status Bar
      alert_type: "",
      status: "",
    };
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
          headerText: "Add Hostgroup",
          submitBtnText: "Add Hostgroup"
        },
        read: {
          fetchObjectOfInterest: true,
          formReadOnly: true,
          submitBtnColor: "warning",
          headerText: "View Hostgroup",
          submitBtnText: "Update"
        },
        update: {
          fetchObjectOfInterest: true,
          formReadOnly: false,
          submitBtnColor: "warning",
          headerText: "Update Hostgroup",
          submitBtnText: "Update"
        },
        delete: {
          fetchObjectOfInterest: true,
          formReadOnly: true,
          submitBtnColor: "error",
          headerText: "Delete Hostgroup",
          submitBtnText: "Delete"
        },
      };
      const dynamicVariables = dynamicActionVars[this.action];
      this.formReadOnly = dynamicVariables.formReadOnly;
      this.submitBtnText = dynamicVariables.submitBtnText;
      this.headerText = dynamicVariables.headerText;
      this.submitBtnColor = dynamicVariables.submitBtnColor;

      if (dynamicVariables.fetchObjectOfInterest) {
        JobbyApi.getHostGroup(this.id).then(data => {
          this.hostGroupName = data.name;
          this.hostGroupDescription = data.description;
        });
      }
    },
    createHostgroup: function () {
      this.submitBtnLoading = true;
      const data = {
        name: this.hostGroupName,
        description: this.hostGroupDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.createHostGroup(data).then((response) => {
        this.alert_type = 'success';
        this.status = 'Hostgroup created.';
        this.submitBtnLoading = false;
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'Hostgroup could not be created.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    updateHostgroup: function () {
      this.submitBtnLoading = true;
      const data = {
        name: this.hostGroupName,
        description: this.hostGroupDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.updateHostGroup(this.id, data).then((response) => {
        this.alert_type = 'success';
        this.status = 'Hostgroup updated.';
        this.submitBtnLoading = false;
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'Hostgroup could not be updated.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    deleteHostgroup: function () {
      this.submitBtnLoading = true;
      // eslint-disable-next-line no-unused-vars
      JobbyApi.deleteHostGroup(this.id).then((response) => {
        this.alert_type = 'success';
        this.status = 'Hostgroup deleted. You will be redirected back in a few seconds.';
        this.submitBtnLoading = false;
      }, (error) => {
        console.log(error);
        this.alert_type = 'error';
        this.status = 'Hostgroup could not be deleted.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    submit: function () {
      const actionFunctions = {
        create: this.createHostgroup,
        update: this.updateHostgroup,
        delete: this.deleteHostgroup,
      };
      actionFunctions[this.action]();
      setTimeout(() => {
        this.$router.push("/hosts");
      }, 1000);
    }
  }
};
</script>

