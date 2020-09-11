import axios from 'axios';

const config = require('@/config');

export default {
    listJobs(jwtToken) {
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
    listHosts(jwtToken) {
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
                reject(error.response.data);
            })
        });
    }
}
