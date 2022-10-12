const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const SLACK_URL = core.getInput('slack_url');
const message = core.getInput('message');

const slackAction = async () => {
    
    try{
        const json = JSON.stringify({ 
            text : message
        });
        await axios.post(SLACK_URL, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        core.setFailed(error.message);
    }
    
}




slackAction();

