const core = require('@actions/core');
const github = require('@actions/github');

const SlackNotify = require('slack-notify');
const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
const slack = SlackNotify(MY_SLACK_WEBHOOK_URL);

try {
  // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);

  slack.send({
    channel: '#testing-alert',
    icon_url: 'http://example.com/my-icon.png',
    text: 'Here is my notification',
    unfurl_links: 1,
    username: 'Jimmy'
  }).catch((err) => {
    console.error('API error:', err);
  })
  

} catch (error) {
  core.setFailed(error.message);
}