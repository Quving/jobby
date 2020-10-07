export default {
    createCurlCommand: function (token, jobId) {
        const config = require('../config');
        const authHeader = `-H 'Authorization: Token ${token}'`;
        const headers = "-H 'Content-type: application/json' -H 'accept: application/json'";
        const body = `-d '{"job": ${jobId}, "status": "success", "logs": "LOGS", "name": "report_${jobId}"}'`;
        const url = `${config.envs.apiHostUrl}/resources/report/`;
        return `curl -X POST \\\n\t${authHeader} \\\n\t${headers} \\\n\t${body} \\\n\t${url}`;
    },
    createPythonCommand: function (token, jobId) {
        let cmd = [
            "import requests",
            `headers = {\n\t'Authorization': 'Token ${token}',\n\t'Content-type': 'application/json', \n\t'accept': 'application/json',\n}`,
            `data = '{"job": ${jobId}, "status": "success", "logs": "LOGS", "name": "report_${jobId}"}'`,
            `response = requests.post('http://localhost:8000/resources/report/', headers=headers, data=data)`];
        return cmd.join('\n');
    }
}