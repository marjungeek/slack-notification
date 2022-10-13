const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const SLACK_URL = core.getInput('slack_url');
const message = core.getInput('message');
const actor = core.getInput('actor');
const environment = core.getInput('environment');
const release = core.getInput('release');
const date = core.getInput('date');

const slackAction = async () => {
    
    try{
        const json = JSON.stringify({ 
            text : message,
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: "New Deployment",
                        emoji: true
                    }
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Environment:*\n${environment}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Requested by:*\n${actor}`
                        }
                    ]
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Date:*\n${date}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Release/Tag:*\n${release}`
                        }
                    ]
                }]
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

