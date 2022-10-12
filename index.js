const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');


const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';


const slackAction = async () => {
    try{
        const url = 'https://hooks.slack.com/services/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';
        await axios.post(url, {
            channel: '#test',
            text: 'Hello, World!'
        });

    } catch (error) {
        core.setFailed(error.message);
    }
    
}

// const axios = require('axios');

// const slackToken = 'xoxb-YOUR-TOKEN_HERE';

// run().catch(err => console.log(err));

// async function run() {
//   const url = 'https://slack.com/api/chat.postMessage';
//   const res = await axios.post(url, {
//     channel: '#test',
//     text: 'Hello, World!'
//   }, { headers: { authorization: `Bearer ${slackToken}` } });

//   console.log('Done', res.data);
// }


slackAction();

