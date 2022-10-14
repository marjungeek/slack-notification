const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const slackAction = async () => {

    try{
        const status = core.getInput('status');
        const action_url = core.getInput('action_url');


        const json = JSON.stringify({ 
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: core.getInput('application_name'),
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
                            text: `*Status:*\n ${ (status == "success") ? "Success :white_check_mark:" : "Fail :x:" }`
                        },
                        
                    ]
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Initiated by:*\n${core.getInput('actor')}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Release/Tag:*\n${core.getInput('release')}`
                        }
                    ]
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: github.context.payload.actor
                        }
                    ]
                }
            ]
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

