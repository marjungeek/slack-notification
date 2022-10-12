const core = require('@actions/core');
const github = require('@actions/github');

const SlackNotify = require('slack-notify');
const MY_SLACK_WEBHOOK_URL = 'https://containerexch-1qk7618.slack.com/services/B0468T0JMC4';
const slack = SlackNotify(MY_SLACK_WEBHOOK_URL);


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


slackAction();