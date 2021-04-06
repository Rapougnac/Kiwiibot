module.exports = {
    name: 'reactionrole',
    aliases: ['rr'],
	description: 'add a reaction role!',
	category: 'Core',
	utilisation: '{prefix}reactionrole',
	async execute(client, message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have enough permission to execute this command.');
        const { guild, mentions } = message;
        const { channels } = mentions;
        const targetChannel = channels.first() || message.channel;

        if(channels.first()) {
            args.shift();
        }

        const text = args.join(' ');

        const newMessage = await targetChannel.send(text);

        if(guild.me.hasPermission('MANAGE_MESSAGES')){
            message.delete();
        }

        if(!guild.me.hasPermission('MANAGE_ROLES')) {
            message.reply('I need the permission `MANAGE_MESSAGES`')
            return;
        }

        
    },
};