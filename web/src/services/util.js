export default {
    createCurlCommandToCreate: function (token, jobId) {
        const config = require('../config');
        const authHeader = `-H 'Authorization: Token ${token}'`;
        const headers = "-H 'Content-type: application/json' -H 'accept: application/json'";
        const body = `-d '{"job": ${jobId}, "status": "STATUS", "logs": "LOGS", "name": "NAME"}'`;
        const url = `${config.envs.apiHostUrl}/resources/report/`;
        return `curl -X POST \\\n\t${authHeader} \\\n\t${headers} \\\n\t${body} \\\n\t${url}`;
    }
}