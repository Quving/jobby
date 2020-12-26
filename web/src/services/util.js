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
    },

    /**
     * Shorten all string attributes accordingly to textMaxLen and add postfix '_formatted' to object orignal key value.
     * Example: "a-too-long-string" will be formatted "a-too-lo...".
     * @param objects
     * @param textMaxLen
     */
    formatObjectTexts: function (objects, textMaxLen) {
        objects.forEach(job => {
            for (const [key, value] of Object.entries(job)) {
                if (typeof value == 'string') {
                    if (value.length > textMaxLen)
                        job[key + '_formatted'] = value.substr(0, textMaxLen) + '...';
                    else
                        job[key + '_formatted'] = value
                }

                // Format date format. E.g. 25/12/2020, 01:00:06
                if (key === 'created_at') {
                    job[key] = new Date(value).toLocaleString();
                }
            }
        })
        return objects;
    },

    // Returns an array of dates between the two dates
    getAllDatesBetweenDates: function (startDate, endDate) {
        var dates = [],
            currentDate = startDate,
            addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    },
}