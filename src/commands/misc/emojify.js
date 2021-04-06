module.exports = {
    name: 'emojify',
    aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}emojify',
	async execute(client,message,args) {
		const mapping = {
            ' ': '   ',
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '!': ':grey_exclamation:',
            '?': ':grey_question:',
            '#': ':hash:',
            '*': ':asterisk:'
          };
        
          'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
          });

          //const args = message.content.trim().split(/ +/g);
          if (!args) {
            message.channel.send('You must provide some text to emojify!');
          }
          await message.delete();
          message.channel.send(args.join(' ').slice(9).split('').map(c => mapping[c] || c).join(''));
	},
};
