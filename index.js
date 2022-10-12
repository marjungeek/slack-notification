const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');


const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';


const slackAction = async () => {
    try{


        const json = JSON.stringify({ channel: "#testing-alerts", text : "hello" });
        await axios.post(url, json, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        core.setFailed(error.message);
    }
    
}




slackAction();

