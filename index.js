const core = require('@actions/core');
const github = require('@actions/github');

const SlackNotify = require('slack-notify');
const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
const slack = SlackNotify(MY_SLACK_WEBHOOK_URL);

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  slack.send({
    channel: '#test-alert',
    icon_url: 'http://example.com/my-icon.png',
    text: 'Here is my notification',
    unfurl_links: 1,
    username: 'Jimmy'
  });

} catch (error) {
  core.setFailed(error.message);
}