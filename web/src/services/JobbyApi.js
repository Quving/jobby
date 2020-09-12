import axios from 'axios';
import store from '@/store/index';

const config = require('@/config');

export default {
    listJobs() {
        const jwtToken = store.getters.credentials.jwt_token;
        const headers = {
            "Content-type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${jwtToken}`
        };
        return new Promise((resolve, reject) => {
            axios.get(`${config.envs.apiHostUrl}/resources/job/`, {
                headers: headers,
            }).then((response) => {
                resolve(response.data);
            }, (error) => {
                reject(error.response.data);
            })
        });
    },
    listHosts() {
        const jwtToken = store.getters.credentials.jwt_token;
        const headers = {
            "Content-type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${jwtToken}`
        };
        return new Promise((resolve, reject) => {
            axios.get(`${config.envs.apiHostUrl}/resources/host/`, {
                headers: headers,
            }).then((response) => {
                resolve(response.data);
            }, (error) => {
                if (error.response.status === 401) {
                    // ToDo: Logout
                }
                reject(error.response.data);
            })
        });
    }
}
