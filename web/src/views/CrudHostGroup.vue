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
              counter=25
              hint="Select a good hostGroup name!"
              v-model="hostGroupName"
              :persistent-hint="persistentHint"
              label="HostGroup name">
          </v-text-field>
          <h3 class="form-header">Description</h3>
          <v-textarea
              :readonly="formReadOnly"
              required
              outlined
              counter=100
              v-model="hostGroupDescription"
              label="HostGroup Description"
              :persistent-hint="persistentHint"
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
      // Other
      id: this.$route.params.id,
      action: this.$route.params.action,

      // Form
      submitBtnLoading: false,
      formReadOnly: true,
      hostGroupName: "",
      hostGroupDescription: "",
      persistentHint: true,
      submitBtnColor: "",
      submitBtnText: "",

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
          headerText: "Add HostGroup",
          submitBtnText: "Add HostGroup"
        },
        read: {
          fetchObjectOfInterest: true,
          formReadOnly: true,
          submitBtnColor: "warning",
          headerText: "View HostGroup",
          submitBtnText: "Update"
        },
        update: {
          fetchObjectOfInterest: true,
          formReadOnly: false,
          submitBtnColor: "warning",
          headerText: "Update HostGroup",
          submitBtnText: "Update"
        },
        delete: {
          fetchObjectOfInterest: true,
          formReadOnly: true,
          submitBtnColor: "error",
          headerText: "Delete HostGroup",
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
    createHostGroup: function () {
      this.submitBtnLoading = true;
      const data = {
        name: this.hostGroupName,
        description: this.hostGroupDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.createHostGroup(data).then((response) => {
        this.alert_type = 'success';
        this.status = 'HostGroup created.';
        this.submitBtnLoading = false;
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'HostGroup could not be created.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    updateHostGroup: function () {
      this.submitBtnLoading = true;
      const data = {
        name: this.hostGroupName,
        description: this.hostGroupDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.updateHostGroup(this.id, data).then((response) => {
        this.alert_type = 'success';
        this.status = 'HostGroup updated.';
        this.submitBtnLoading = false;
        setTimeout(() => {
          this.$router.push("/hosts");
        }, 1000);
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'HostGroup could not be updated.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    deleteHostGroup: function () {
      this.submitBtnLoading = true;
      // eslint-disable-next-line no-unused-vars
      JobbyApi.deleteHostGroup(this.id).then((response) => {
        this.alert_type = 'success';
        this.status = 'HostGroup deleted. You will be redirected back in a few seconds.';
        this.submitBtnLoading = false;
        setTimeout(() => {
          this.$router.push("/hosts");
        }, 1000);
      }, (error) => {
        console.log(error);
        this.alert_type = 'error';
        this.status = 'HostGroup could not be deleted.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    submit: function () {
      const actionFunctions = {
        create: this.createHostGroup,
        update: this.updateHostGroup,
        delete: this.deleteHostGroup,
      };
      actionFunctions[this.action]();
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
