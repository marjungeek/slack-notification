const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const SLACK_URL = core.getInput('slack_url');
const slackAction = async () => {

    //{\"channel\": \"#testing-alert\", \"username\": \"webhookbot\", \"text\": \"This is posted to #testing-alert and comes from a bot named webhookbot.\", \"icon_emoji\": \":ghost:\"}"
    try{
        const json = JSON.stringify({ 
            channel: "#testing-alerts", 
            username: "bot",
            icon_emoji: ":ghost:",
            text : "GitHub Action build result: ${{ job.status }}\n${{ github.event.pull_request.html_url || github.event.head_commit.url }}"

        });
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

