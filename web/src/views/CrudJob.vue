<template>
  <v-container>
    <view-headers header="Create Job"></view-headers>
    <form @submit.prevent="submit" autocomplete="on">
      <v-col>
        <v-text-field
            :readonly="formReadOnly"
            required
            outlined
            counter=25
            hint="Select a good job name!"
            v-model="jobName"
            label="Job name">
        </v-text-field>
        <v-textarea
            :readonly="formReadOnly"
            required
            outlined
            counter=100
            v-model="jobDescription"
            label="Job Description"
            hint="Your later self will be happy about a good description.">
        </v-textarea>
        <v-select
            v-if="!formReadOnly"
            outlined
            v-model="selectedJobGroup"
            :items="jobGroups"
            :menu-props="{ maxHeight: '400', maxWidth:'200' }"
            item-text="name"
            item-value="id"
            label="JobGroup"
            hint="Select JobGroup"
            persistent-hint
        ></v-select>
        <v-text-field
            v-else
            :readonly="formReadOnly"
            required
            outlined
            v-model="selectedJobGroup"
            label="JobGroup"
            hint="Select JobGroup"
            persistent-hint
        ></v-text-field>
        <v-select
            v-if="!formReadOnly"
            outlined
            class="mt-7 mb-7"
            v-model="selectedHost"
            item-text="name"
            item-value="id"
            :items="hosts"
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
            v-model="selectedHost"
            label="Host"
            hint="Select Host"
            persistent-hint
        ></v-text-field>
        <v-alert class="mt-5 mb-5" dense v-if='status' v-bind:type="alert_type">{{ status }}</v-alert>
        <v-btn
            :loading="submitBtnLoading"
            :disabled="false"
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

      // Form
      jobName: "",
      jobDescription: "",
      formReadOnly: false,
      selectedJobGroup: 0,
      selectedHost: 0,
      jobGroups: [],
      hosts: [],
      submitBtnText: "",
      submitBtnLoading: false,
      submitBtnColor: "",

      // Status bar
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
          fetchData: false,
          formReadOnly: false,
          submitBtnColor: "success",
          headerText: "Add Job",
          submitBtnText: "Add Job"
        },
        read: {
          fetchData: true,
          formReadOnly: true,
          submitBtnColor: "warning",
          headerText: "View Job",
          submitBtnText: "Update"
        },
        update: {
          fetchData: true,
          formReadOnly: false,
          submitBtnColor: "warning",
          headerText: "Update Job",
          submitBtnText: "Update"
        },
        delete: {
          fetchData: true,
          formReadOnly: true,
          submitBtnColor: "error",
          headerText: "Delete Job",
          submitBtnText: "Delete"
        },
      };
      const dynamicVariables = dynamicActionVars[this.action];
      this.formReadOnly = dynamicVariables.formReadOnly;
      this.submitBtnText = dynamicVariables.submitBtnText;
      this.headerText = dynamicVariables.headerText;
      this.submitBtnColor = dynamicVariables.submitBtnColor;

      if (dynamicVariables.fetchData) {
        JobbyApi.getJob(this.id).then(data => {
          this.jobName = data.name;
          this.jobDescription = data.description;

          // Fill v-textfield or v-select depending on field formReadOnly
          this.selectedJobGroup = (dynamicVariables.formReadOnly) ? data.jobgroup_detailed.name : data.jobgroup_detailed.id;
          this.selectedHost = (dynamicVariables.formReadOnly) ? data.host_detailed.name : data.host_detailed.id;
        });
        JobbyApi.listHosts().then(response => {
          this.hosts = response;
        }, (error => {
          console.log(error)
        }));
        JobbyApi.listJobGroups().then(response => {
          this.jobGroups = response;
        }, (error => {
          console.log(error)
        }));
      }
    },
    createJob: function () {
      this.submitBtnLoading = true;

      const data = {
        name: this.jobName,
        jobgroup: this.selectedJobGroup,
        host: this.selectedHost,
        description: this.jobDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.createJob(data).then((response) => {
        this.alert_type = 'success';
        this.status = 'Job created.';
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'Job could not be created.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
      });
      this.submitBtnLoading = false;
    },
    updateJob: function () {
      this.submitBtnLoading = true;
      const data = {
        name: this.jobName,
        jobgroup: this.selectedJobGroup,
        host: this.selectedHost,
        description: this.jobDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.updateJob(this.id, data).then((response) => {
        this.alert_type = 'success';
        this.status = 'Job updated.';
        this.submitBtnLoading = false;
      }, (error) => {
        console.log(error);
        this.alert_type = 'error';
        this.status = 'Job could not be updated.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    deleteJob: function () {
      this.submitBtnLoading = true;

      // eslint-disable-next-line no-unused-vars
      JobbyApi.deleteJob(this.id).then((response) => {
        this.alert_type = 'success';
        this.status = 'Job deleted. You will be redirected back in a few seconds.';
        this.submitBtnLoading = false;

      }, (error) => {
        console.log(error);
        this.alert_type = 'error';
        this.status = 'Job could not be deleted.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    submit: function () {
      console.log("Hallo")
      const funcs = {
        create: this.createJob,
        update: this.updateJob,
        delete: this.deleteJob,
      };
      funcs[this.action]();
      setTimeout(() => {
        this.$router.push("/jobs");
      }, 1000);
    }
  }
}
</script>

