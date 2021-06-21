const { language } = require('../../../language');
module.exports = (client, message, track) => {
    message.channel.send(language(message.guild, 'trackStart')[0].format(client.emotes.music, track.title, message.member.voice.channel.name));
};