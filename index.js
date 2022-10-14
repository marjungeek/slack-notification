const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const slackAction = async () => {
    
    try{
        const json = JSON.stringify({ 
            text : core.getInput('message'),
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
                            text: `*Environment:*\n${core.getInput('environment')}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Status:*\n${core.getInput('status')}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Requested by:*\n${core.getInput('actor')}`
                        }
                    ]
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Date:*\n${core.getInput('date')}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Release/Tag:*\n${core.getInput('release')}`
                        }
                    ]
                }]
        });

        await axios.post(core.getInput('slack_url'), json, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        core.setFailed(error.message);
    }
    
}




slackAction();

