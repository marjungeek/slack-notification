const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const SLACK_URL = core.getInput('slack_url');
const slackAction = async () => {
    try{
        const json = JSON.stringify({ channel: "#testing-alerts", text : "hello" });
        await axios.post(SLACK_URL, json, {
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

