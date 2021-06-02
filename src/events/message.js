const {
    Collection,
    MessageEmbed,
    Message,
    MessageAttachment,
  } = require('discord.js'),
  Client = require('../struct/Client'),
  { prefix } = require('../util/prefix'),
  { language } = require('../../language');
/**
 * @param {Message} message
 * @param {Client} client
 * @param {String[]} args
 */

module.exports = async (client, message) => {
  const { author, guild } = message;
  const { bot } = author;
  if (bot&&(author.id !==client.config.discord.id_bot_test)) return;
  const p = await prefix(message, client.config);
  if (message.content.startsWith(`<@!${client.user.id}>`)) {
    return message.channel.send(
      language(guild, 'MESSAGE_PREFIX').format(guild.name, p)
    );
  }

  if (!message.content.toLowerCase().startsWith(p)) return;
  const [command, ...args] = message.content
    .toLowerCase()
    .slice(p.length)
    .trim()
    .split(/\s+/g);
  if (!client.commands.has(command) && !client.aliases.has(command)) return;
  const command_to_execute =
    client.commands.get(command) || client.aliases.get(command);

  if (command_to_execute) {
    if (client.owners.includes(message.author.id)) {
      if (command_to_execute.string) {
        command_to_execute.string = language(guild, command_to_execute.name);
        try {
          command_to_execute.execute(client, message, args);
        } catch (error) {
          console.error(error);
          message.reply(
            'There was an error trying to execute that command!' + error
          );
        }
      } else {
        try {
          command_to_execute.execute(client, message, args);
        } catch (error) {
          console.error(error);
          message.reply(
            'There was an error trying to execute that command!' + error
          );
        }
      }
    } else {
      const reasons = [];
      if (message.channel.type === 'dm') {
        if (command_to_execute.guildOnly) {
          reasons.push(
            [
              '**Command is unavailable on DM**',
              'This command can only be used inside servers.',
            ].join(' - ')
          );
        }
      }

      if (message.channel.type !== 'dm') {
        if (command_to_execute.ownerOnly) {
          if (!client.owners.includes(message.author.id)) {
            reasons.push(
              [
                '**Limited to Devs**',
                'This command can only be used by my developers.',
              ].join(' - ')
            );
          }
        }
        if (command_to_execute.adminOnly) {
          if (!message.member.hasPermission('ADMINISTRATOR')) {
            reasons.push(
              [
                '**Limited to Admins**',
                'This command can only be used by server administrators.',
              ].join(' - ')
            );
          }
        }
        if (command_to_execute.nsfw) {
          if (!message.channel.nsfw) {
            reasons.push(
              [
                '**NSFW Command**',
                '"You can only use this command on a nsfw channel"',
              ].join(' - ')
            );
          }
        }
        if (Array.isArray(command_to_execute.permissions)) {
          if (
            !message.channel
              .permissionsFor(message.member)
              .has(command_to_execute.permissions)
          ) {
            reasons.push(
              [
                "**\\⚠️[Error] You don't have enough permissions** - ",
                'You need the following permission(s):\n\u2000\u2000- ',
                Object.entries(
                  message.channel.permissionsFor(message.member).serialize()
                )
                  .filter(
                    (p) =>
                      command_to_execute.permissions.includes(p[0]) && !p[1]
                  )
                  .flatMap((c) =>
                    c[0]
                      .toLowerCase()
                      .replace(/(^|"|_)(\S)/g, (x) => x.toUpperCase())
                      .replace(/_/g, ' ')
                      .replace(/Guild/g, 'Server')
                      .replace(/Use Vad/g, 'Use Voice Activity')
                  )
                  .join('\n\u2000\u2000- '),
              ].join('')
            );
          }
        }
        if (Array.isArray(command_to_execute.clientPermissions)) {
          if (
            !message.channel
              .permissionsFor(message.guild.me)
              .has(command_to_execute.clientPermissions)
          ) {
            reasons.push(
              [
                "**\\⚠️[Error] I don't have enough permissions** - ",
                'I need the following permission(s):\n\u2000\u2000- ',
                Object.entries(
                  message.channel.permissionsFor(message.guild.me).serialize()
                )
                  .filter(
                    (p) =>
                      command_to_execute.clientPermissions.includes(p[0]) &&
                      !p[1]
                  )
                  .flatMap((c) =>
                    c[0]
                      .toLowerCase()
                      .replace(/(^|"|_)(\S)/g, (x) => x.toUpperCase())
                      .replace(/_/g, ' ')
                      .replace(/Guild/g, 'Server')
                      .replace(/Use VAD/g, 'Use Voice Activity')
                  )
                  .join('\n\u2000\u2000- '),
              ].join('')
            );
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
          return await message.channel.send(embed); //message.channel.send(`\`\`\`diff\n-Command execution blocked!\n\`\`\`\n\`Reasons:\`\n\n\`\`\`json\n${reasons.map((reason) => `• ${reason}`).join("\n")}\n\`\`\``);
        }
      }
      if (command_to_execute.string) {
        command_to_execute.string = language(guild, command_to_execute.name);
        const now = Date.now(); //get the current time
        const cooldownAmount = (command_to_execute.cooldown || 1) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it ^^
        if (!client.cooldowns.has(message.author.id)) {
          client.cooldowns.set(message.author.id, now);
          setTimeout(
            () => client.cooldowns.delete(message.author.id),
            cooldownAmount
          ); //set a timeout function with the cooldown, so it gets deleted later on again
          try {
            command_to_execute.execute(client, message, args);
          } catch (error) {
            console.error(error);
            message.reply(
              'There was an error trying to execute that command!' + error
            );
          }
        } else {
          const timestamps = client.cooldowns.get(message.author.id); //get the timestamp of the last used commands

          //if the user is on cooldown
          const expirationTime = timestamps + cooldownAmount; //get the amount of time he needs to wait until they can run the cmd again

          if (now < expirationTime) {
            //if they're still on cooldonw
            const timeLeft = (expirationTime - now) / 1000; //get the lefttime
            return message.reply(
              `Please wait ${format(
                timeLeft.toFixed(1)
              )} before reusing the \`${command_to_execute.name}\` command.`
            );
          } else {
            //client.cooldowns.delete(message.author.id)
            try {
              command_to_execute.execute(client, message, args);
            } catch (error) {
              console.error(error);
              message.reply(
                'There was an error trying to execute that command!' + error
              );
            }
          }
        }
      } else {
        const now = Date.now(); //get the current time
        const cooldownAmount = (command_to_execute.cooldown || 1) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it ^^
        if (!client.cooldowns.has(message.author.id)) {
          client.cooldowns.set(message.author.id, now);
          setTimeout(
            () => client.cooldowns.delete(message.author.id),
            cooldownAmount
          ); //set a timeout function with the cooldown, so it gets deleted later on again
          try {
            command_to_execute.execute(client, message, args);
          } catch (error) {
            console.error(error);
            message.reply(
              'There was an error trying to execute that command!' + error
            );
          }
        } else {
          const timestamps = client.cooldowns.get(message.author.id); //get the timestamp of the last used commands

          //if the user is on cooldown
          const expirationTime = timestamps + cooldownAmount; //get the amount of time he needs to wait until they can run the cmd again

          if (now < expirationTime) {
            //if they're still on cooldonw
            const timeLeft = (expirationTime - now) / 1000; //get the lefttime
            return message.reply(
              `Please wait ${format(
                timeLeft.toFixed(1)
              )} before reusing the \`${command_to_execute.name}\` command.`
            );
          } else {
            //client.cooldowns.delete(message.author.id)
            try {
              command_to_execute.execute(client, message, args);
            } catch (error) {
              console.error(error);
              message.reply(
                'There was an error trying to execute that command!' + error
              );
            }
          }
        }
      }
    }
  } else {
    return;
  }
};

function format(time) {
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  var ret = '';
  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }
  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return `\`${ret}\``;
}
