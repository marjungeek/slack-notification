const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const slackAction = async () => {

    try{
        const status            = core.getInput('status');
        const action_url        = core.getInput('action_url');
        const serverUrl         = github.context.server_url;
        const repository        = github.context.repository;
        const commitID          = github.context.sha;

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
                            text: `*Initiated by:*\n${github.context.actor}`
                        },
                        {
                            type: "mrkdwn",
                            text: repository
                        }
                    ]
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `| <${serverUrl}/${repository}/commit/${commitID}|View Commit> | <${serverUrl}/${repository}/actions/runs/${ github.context.run_id }|View Build> |`
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

