const { MessageEmbed } = require('discord.js');
async function check(message, command, client) {
  const reasons = [];

  if (command.guildOnly) {
    if (message.channel.type === 'dm') {
      reasons.push(
        [
          '**Command is unavailable on DM**',
          'This command can only be used inside servers.',
        ].join(' - ')
      );
    } else {
      //Do nothing
    }
  }

  if (message.channel.type !== 'dm') {
    if (command.ownerOnly) {
      if (!client.owners.includes(message.author.id)) {
        reasons.push(
          [
            '**Limited to Devs**',
            'This command can only be used by my developers.',
          ].join(' - ')
        );
      } else {
        // Do nothing
      }
    }
    if (command.adminOnly) {
      if (!message.member.hasPermission('ADMINISTRATOR')) {
        reasons.push(
          [
            '**Limited to Admins**',
            'This command can only be used by server administrators.',
          ].join(' - ')
        );
      } else {
        // Do nothing
      }
    }
    if (command.nsfw) {
      if (!message.channel.nsfw) {
        reasons.push(
          [
            '**NSFW Command**',
            '"You can only use this command on a nsfw channel"',
          ].join(' - ')
        );
      }
    }
    if (Array.isArray(command.permissions)) {
      if (
        !message.channel.permissionsFor(message.member).has(command.permissions)
      ) {
        reasons.push(
          [
            "**\\⚠️[Error] You don't have enough permissions** - ",
            'You need the following permission(s):\n\u2000\u2000- ',
            Object.entries(
              message.channel.permissionsFor(message.member).serialize()
            )
              .filter((p) => command.permissions.includes(p[0]) && !p[1])
              .flatMap((c) =>
                c[0]
                  .split('_')
                  .map((x) => x.charAt(0) + x.toLowerCase().slice(1))
                  .join(' ')
              )
              .join('\n\u2000\u2000- '),
          ].join('')
        );
      } else {
        // Do nothing
      }
    }
    if (Array.isArray(command.clientPermissions)) {
      if (
        !message.channel
          .permissionsFor(message.guild.me)
          .has(command.clientPermissions)
      ) {
        reasons.push(
          [
            "**\\⚠️[Error] I don't have enough permissions** - ",
            'I need the following permission(s):\n\u2000\u2000- ',
            /*Object.entries(*/ message.channel
              .permissionsFor(message.guild.me)
              .serialize() //)
              .filter((p) => command.clientPermissions.includes(p[0]) && !p[1])
              .flatMap((c) =>
                c[0]
                  .split('_')
                  .map((x) => x.charAt(0) + x.toLowerCase().slice(1))
                  .join(' ')
              )
              .join('\n\u2000\u2000- '),
          ].join('')
        );
      } else {
        // Do nothing
      }
    }

    if (reasons.length > 0) {
      const embed = new MessageEmbed()
        .setAuthor(
          client.user.tag,
          client.user.displayAvatarURL({
            dynamic: true,
            format: 'png',
            size: 2048,
          })
        )
        .setColor('RED')
        .setDescription(
          `\`\`\`diff\n-Command execution blocked!\n\`\`\`\n\n` +
            `\`Reasons:\`\n\n${reasons
              .map((reason) => '• ' + reason)
              .join('\n')}`
        );
      return await message.channel.send(embed);
    }
  }
}

module.exports = { check };