// src/services/authService.js
import axios from 'axios';
import store from '@/store/index';
import router from '@/router/index';

const config = require('../config');

export default {
    login(username, password) {
        const credentials = {
            username: username,
            password: password
        }
        const options = {headers: {'accept': 'application/json', 'Content-type': 'application/json'}};

        const url = config.envs.apiHostUrl + '/auth/token/';
        return axios.post(url, credentials, options);
    },
    logout: function () {
        store.dispatch('logout');
        router.push('/login');
    },

    fetchUserdata: function () {
        return new Promise((resolve, reject) => {

            // Reject, if credentials are not available.
            if (!store.getters.credentials) {
                reject("Credentials are not available to fetch userdata.");
            }

            const jwtToken = store.getters.credentials.jwt_token;
            const headers = {
                "Content-type": "application/json",
                "accept": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            };
            axios.get(`${config.envs.apiHostUrl}/whoami`, {headers: headers})
                .then((response) => {
                    resolve(response.data);
                }, (error) => {
                    if (error.response.status === 401) {
                        this.logout();
                    }
                    reject(error.response.data);
                })
        });
    }

};
