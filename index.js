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



//   slack.send({
//     channel: '#testing-alert',
//     icon_url: 'http://example.com/my-icon.png',
//     text: 'Here is my notification',
//     unfurl_links: 1,
//     username: 'Jimmy'
//   });

    slackAction().then(sucess => {
        console.log(success)
    }, error => {
        console.log(error)
    });
  

} catch (error) {
  core.setFailed(error.message);
}


const slackAction = async () => {

    var statLog = slack.extend({
        channel: '#testing-alert',
        icon_emoji: ':computer:',
        username: 'Statistics'
      });
      
      statLog({
        text: 'Current server statistics',
        fields: {
          'CPU usage': '7.51%',
          'Memory usage': '254mb'
        }
      });
    
      await slack.send('Hello!').then(() => {
        console.log('Done!');
      });
}