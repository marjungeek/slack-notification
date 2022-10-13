const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const SLACK_URL = core.getInput('slack_url');
const message = core.getInput('message');

const slackAction = async () => {
    
    try{
        const json = JSON.stringify({ 
            text : message,
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: "New request",
                        emoji: true
                    }
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: "*Type:*\nPaid Time Off"
                        },
                        {
                            type: "mrkdwn",
                            text: "*Created by:*\n<example.com|Fred Enriquez>"
                        }
                    ]
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: "*When:*\nAug 10 - Aug 13"
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

