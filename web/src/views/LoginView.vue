<template>
  <v-container>
    <v-row class="ma-10" justify="center">
      <v-col cols="6">
        <h1 class="mb-7">What is Jobby?</h1>
        <p>
          Some people probably know the problem: You are a developer or a server administrator and you have several
          servers or applications that you have to maintain. Now one and the other application or server has jobs that
          are regularly executed autonomously. For example a backup script, or a task that cleans up the database of
          an application. Usually these jobs run silently in the background and the Developer/Admin is not informed
          whether the job was executed successfully or failed.
        </p>
        <p>
          Jobby is a self-host platform that can be considered as
          a report centre. The idea is that when a cronjob has finished, it forwards its status to Jobby. The user
          then gets an overview of all his distributed jobs in the jobby dashboard.
        </p>
      </v-col>
      <v-col cols="4" class="text-center">
        <h1 class="mb-7">Login</h1>
        <form @submit.prevent="submit" autocomplete="on">
          <v-layout column>
            <v-flex>
              <v-text-field
                  outlined
                  name="email"
                  label="Email"
                  id="email"
                  autocomplete="email"
                  v-model="email"
                  required>
              </v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                  outlined
                  name="password"
                  label="Password"
                  value="your-password"
                  id="password"
                  type="password"
                  autocomplete="password"
                  v-model="password"
                  required>
              </v-text-field>
            </v-flex>
            <v-btn
                color="primary"
                :loading="submitBtnLoading"
                type="submit">
              Sign In
            </v-btn>
            <v-alert class="mt-5 mb-5" dense v-if='status' v-bind:type="alert_type">{{ status }}</v-alert>
          </v-layout>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from "@/services/AuthService";

export default {
  data: function () {
    return {
      alert_type: '',
      email: '',
      password: '',
      submitBtnLoading: false,
      status: ''
    };
  },
  methods: {
    submit: function () {
      this.submitBtnLoading = true;
      AuthService.login(this.email, this.password)
          .then(response => {
            this.$store.dispatch('login', {
              credentials: {
                jwt_token: response.data['access']
              }
            });
            this.submitBtnLoading = false;
            this.$router.push('/');
            this.alert_type = 'success';
            this.status = 'Login successful.';
          })
          .catch(error => {
            this.submitBtnLoading = false;
            this.alert_type = 'error';
            if (error.response.status === 401) {
              this.status = 'User cannot be found.';
            } else {
              this.status = 'Error occured. Please try it later again.';
            }
          });
    }
  }
};
</script>
