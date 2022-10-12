const core = require('@actions/core');
const github = require('@actions/github');

const SlackNotify = require('slack-notify');
const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
const slack = SlackNotify(MY_SLACK_WEBHOOK_URL);

const slackAction = async () => {
    try{
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

          const payload = JSON.stringify(github.context.payload, undefined, 2)
        
          await slack.send('Hello!');
    } catch (error) {
        core.setFailed(error.message);
    }
    
}


slackAction();

