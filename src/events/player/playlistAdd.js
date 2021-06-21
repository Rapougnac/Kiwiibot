const { language } = require('../../../language');
module.exports = (client, message, playlist) => {
    message.channel.send(language(message.guild, 'playlistAdd')[0].format(client.emotes.music, playlist.title, playlist.items.length));
};