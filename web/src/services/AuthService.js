// src/services/AuthService.js
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
    }

};
