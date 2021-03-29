const chatbot = require(`${process.cwd()}/util/chatbot`)
const config = require("../config.json")
const { Collection, Message, Client, MessageEmbed } = require("discord.js")
//const prefix = require("../models/PrefixSchema");
const PrefixSchema = require("../models/PrefixSchema")
const moment = require("moment")
const fetch = require("node-fetch")
const ownerOnly = Boolean(config.discord.owner)
/**
 * @param {Message} message
 * @param {config} config
 */
prefix = async function(message, config) {
  let customprefix;

  const data = await PrefixSchema.findOne({
    GuildID: message.guild.id,
  }).catch((error) => console.log(error))

  if (data) {
    customprefix = data.Prefix;
  }else if (data){
    customprefix = config.discord.default_prefix.toLowerCase() || data.Prefix;
  }
  else if (message.content.startsWith('n?')){
    customprefix = 'n?'
  } else if (message.content.startsWith(config.discord.default_prefix)){
    customprefix = config.discord.default_prefix;
  } //else if (data.Prefix && message.content.startsWith(data.Prefix)){
  //   customprefix = data.Prefix;
  // };
  return customprefix;
}

/**
 * @param {Message} message
 * @param {Client} client
 * @param {String[]} args
 * @param {config} config
 */
module.exports = async (client, message) => {
  //check(message, client)
  const p = await prefix(message, client.config)
  if(message.content.startsWith(`<@!${client.user.id}>`)) {
    return message.channel.send(`My prefix in ${message.guild.name} is ${p}`)
  }
  if (!message.content.toLowerCase().startsWith(p) || message.author.bot) return
  const args = message.content.slice(p.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (!client.commands.has(command) && !client.aliases.has(command)) return;
  const command_to_execute = client.commands.get(command) || client.aliases.get(command)
  // if(command_to_execute.ownerOnly && ownerOnly === true){
  //   return message.channel.send("Owner only")
  // }
  const reasons = [];

  if (command_to_execute.guildOnly){
    if (message.channel.type === 'dm'){
      reasons.push([
        '**Command is unavailable on DM**',
        'This command can only be used inside servers.'
      ].join(' - '));
    } else {
      // Do nothing..
    };
  };

  if (message.channel.type !== 'dm'){
    if (command_to_execute.ownerOnly){
      if (!client.config.discord.owner.includes(message.author.id)){
        reasons.push([
          '**Limited to Devs**',
          'This command can only be used by my developers.'
        ].join(' - '));
      } else {
        // Do nothing..
      };
    };
    if (command_to_execute.adminOnly){
      if (!message.member.hasPermission('ADMINISTRATOR')){
        reasons.push([
          '**Limited to Admins**',
          'This command can only be used by server administrators.'
        ].join(' - '))
      } else {
        // Do nothing..
      };
    };
    if (Array.isArray(command_to_execute.permissions)){
      if (!message.channel.permissionsFor(message.member).has(command_to_execute.permissions)){
        reasons.push([
          '****⚠️[Error] You don\'t have enough permissions** - ',
          'You need the following permission(s):\n\u2000\u2000- ',
          Object.entries(message.channel.permissionsFor(message.member).serialize())
          .filter( p => command_to_execute.permissions.includes(p[0]) && !p[1])
          .flatMap(c => c[0].split('_').map(x => x.charAt(0) + x.toLowerCase().slice(1)).join(' '))
          .join('\n\u2000\u2000- ')
        ].join(''))
      } else {
        // Do nothing..
      };
    };
    if (Array.isArray(command_to_execute.clientPermissions)){
      if (!message.channel.permissionsFor(message.guild.me).has(command_to_execute.clientPermissions)){
        reasons.push([
          '**⚠️[Error] I don\'t have enough permissions** - ',
          'I need the following permission(s):\n\u2000\u2000- ',
          Object.entries(message.channel.permissionsFor(message.guild.me).serialize())
          .filter(p => command_to_execute.clientPermissions.includes(p[0]) && !p[1])
          .flatMap(c => c[0].split('_').map(x => x.charAt(0) + x.toLowerCase().slice(1)).join(' '))
          .join('\n\u2000\u2000- ')
        ].join(''))
      } else {
        // Do nothing..
      };
    };

  if (command_to_execute.nsfw) {
    if (!message.channel.nsfw){
      reasons.push([
        '**NSFW Command**',
        'You can only use this command on a nsfw channel.'
      ].join(' - '))
    };
  };

  const embed = new MessageEmbed()
  .setAuthor('Command Execution Blocked!')
  .setColor('ORANGE')
  .setDescription(`Reasons:\n\n${reasons.map(reason => '• ' + reason).join('\n')}`);

  return { accept: !reasons.length, embed };
  }
  if (command_to_execute) {
    const now = Date.now() //get the current time
    const cooldownAmount = (command_to_execute.cooldown || 1) * 1000 //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it ^^
    if (!client.cooldowns.has(message.author.id)) {
      client.cooldowns.set(message.author.id, now)
      setTimeout(
        () => client.cooldowns.delete(message.author.id),
        cooldownAmount
      ) //set a timeout function with the cooldown, so it gets deleted later on again
      try {
        command_to_execute.execute(client, message, args)
      } catch (error) {
        console.error(error)
        message.reply(
          "There was an error trying to execute that command!" + error
        )
      }
    } else {
      const timestamps = client.cooldowns.get(message.author.id) //get the timestamp of the last used commands

      //if the user is on cooldown
      const expirationTime = timestamps + cooldownAmount //get the amount of time he needs to wait until they can run the cmd again

      if (now < expirationTime) {
        //if they're still on cooldonw
        const timeLeft = (expirationTime - now) / 1000 //get the lefttime
        return message.reply(
          `Please wait ${format(timeLeft.toFixed(1))} before reusing the \`${
            command_to_execute.name
          }\` command.`
        )
      } else {
        //client.cooldowns.delete(message.author.id)
        try {
          command_to_execute.execute(client, message, args)
        } catch (error) {
          console.error(error)
          message.reply(
            "There was an error trying to execute that command!" + error
          )
        }
      }
    }
  } else {
    return;
  }
}


function format(time) {
  var hrs = ~~(time / 3600)
  var mins = ~~((time % 3600) / 60)
  var secs = ~~time % 60

  var ret = ""
  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "")
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "")
  ret += "" + secs
  return `\`${ret}\``
}

// function check(message, client){
//   const reasons = [];

//   if (client.commands.guildOnly){
//     if (message.channel.type === 'dm'){
//       reasons.push([
//         '**Command is unavailable on DM**',
//         'This command can only be used inside servers.'
//       ].join(' - '));
//     } else {
//       // Do nothing..
//     };
//   };

//   if (message.channel.type !== 'dm'){
//     if (client.commands.ownerOnly){
//       if (!message.client.config.discord.owner.includes(message.author.id)){
//         reasons.push([
//           '**Limited to Devs**',
//           'This command can only be used by my developers.'
//         ].join(' - '));
//       } else {
//         // Do nothing..
//       };
//     };
//     if (client.commands.adminOnly){
//       if (!message.member.hasPermission('ADMINISTRATOR')){
//         reasons.push([
//           '**Limited to Admins**',
//           'This command can only be used by server administrators.'
//         ].join(' - '))
//       } else {
//         // Do nothing..
//       };
//     };
//     if (Array.isArray(client.commands.permissions)){
//       if (!message.channel.permissionsFor(message.member).has(client.commands.permissions)){
//         reasons.push([
//           '****⚠️[Error] You don\'t have enough permissions** - ',
//           'You need the following permission(s):\n\u2000\u2000- ',
//           Object.entries(message.channel.permissionsFor(message.member).serialize())
//           .filter( p => client.commands.permissions.includes(p[0]) && !p[1])
//           .flatMap(c => c[0].split('_').map(x => x.charAt(0) + x.toLowerCase().slice(1)).join(' '))
//           .join('\n\u2000\u2000- ')
//         ].join(''))
//       } else {
//         // Do nothing..
//       };
//     };
//     if (Array.isArray(client.commands.clientPermissions)){
//       if (!message.channel.permissionsFor(message.guild.me).has(command_to_execute.clientPermissions)){
//         reasons.push([
//           '**⚠️[Error] I don\'t have enough permissions** - ',
//           'I need the following permission(s):\n\u2000\u2000- ',
//           Object.entries(message.channel.permissionsFor(message.guild.me).serialize())
//           .filter(p => client.commands.clientPermissions.includes(p[0]) && !p[1])
//           .flatMap(c => c[0].split('_').map(x => x.charAt(0) + x.toLowerCase().slice(1)).join(' '))
//           .join('\n\u2000\u2000- ')
//         ].join(''))
//       } else {
//         // Do nothing..
//       };
//     };

//   if (client.commands.nsfw) {
//     if (!message.channel.nsfw){
//       reasons.push([
//         '**NSFW Command**',
//         'You can only use this command on a nsfw channel.'
//       ].join(' - '))
//     };
//   };

//   const embed = new MessageEmbed()
//   .setAuthor('Command Execution Blocked!')
//   .setColor('ORANGE')
//   .setDescription(`Reasons:\n\n${reasons.map(reason => '• ' + reason).join('\n')}`);

//   return { accept: !reasons.length, embed };
//   }
// };
