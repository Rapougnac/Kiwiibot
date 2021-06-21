const { language } = require('../../../language');
module.exports = (client, error, message) => {
  const { guild } = message;
  switch (error) {
    case 'NotPlaying': {
      message.channel.send(
        language(guild, 'PlayerError')[0].format(client.emotes.error)
      );
      break;
    }
    case 'NotConnected': {
      message.channel.send(
        language(guild, 'PlayerError')[1].format(client.emotes.error)
      );
      break;
    }
    case 'UnableToJoin': {
      message.channel.send(
        language(guild, 'PlayerError')[2].format(client.emotes.error)
      );
      break;
    }
    default: {
      message.channel.send(
        language(guild, 'PlayerError')[2].format(client.emotes.error, error)
      );
    }
  }
};
