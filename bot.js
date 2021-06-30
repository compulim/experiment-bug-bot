// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory, CardFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
  constructor() {
    super();
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => {
      const replyText = `Echo: ${context.activity.text}`;
      await context.sendActivity(MessageFactory.text(replyText, replyText));
      await context.sendActivity(
        MessageFactory.attachment(
          CardFactory.adaptiveCard({
            type: 'AdaptiveCard',
            version: '1.0',
            body: [
              {
                type: 'TextBlock',
                text: 'coffee',
                size: 'large'
              },
              {
                type: 'FactSet',
                facts: [
                  {
                    title: 'coffee type',
                    value: "'drip'"
                  },
                  {
                    title: 'size',
                    value: "'large'"
                  },
                  {
                    title: 'milk',
                    value: "'whole'"
                  },
                  {
                    title: 'number of shots',
                    value: "'1'"
                  }
                ]
              }
            ],
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json'
          })
        )
      );
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      const welcomeText = 'Hello and welcome! I am `bug-3967`.';
      for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
        }
      }
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }
}

module.exports.EchoBot = EchoBot;
