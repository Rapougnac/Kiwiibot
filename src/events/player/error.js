module.exports = (client, error, message) => {
  const { guild } = message;
  switch (error) {
    case 'NotPlaying': {
      message.channel.send(
        guild.i18n.__mf("player.events.PlayerError.no_music",{emote: client.emotes.error})
      );
      break;
    }
    case 'NotConnected': {
      message.channel.send(
        guild.i18n.__mf("player.events.PlayerError.no_voice_connection",{emote: client.emotes.error})
      );
      break;
    }
    case 'UnableToJoin': {
      message.channel.send(
        guild.i18n.__mf("player.events.PlayerError.unable_join",{emote: client.emotes.error})
      );
      break;
    }
    default: {
      message.channel.send(
        guild.i18n.__mf("player.events.PlayerError.error",{emote: client.emotes.error, error: error})
      );
    }
  }
};
