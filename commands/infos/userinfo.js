const { MessageEmbed } = require("discord.js");
const moment = require('moment');
require("moment-duration-format");
//const { desktop, mobile, web } = require("../../config.json")

module.exports = {
	name: 'userinfo',
	aliases: ['ui', "whois"],
	description: 'Shows informations about you or a user',
	category: 'Infos',
	utilisation: '{prefix}userinfo <member>',
   /**
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */
	async execute(client, message, args) {

    if(message.guild){
    const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || args[0] || message.member;
    const user = member.user;
    let presence = user.presence.status;
    const userFlags = await user.fetchFlags()
    .then(flags => Promise.resolve(Object.entries(flags.serialize()).filter(([_, val]) => !!val)))
    .then(flags => flags.map(([key, _]) => client.emojis.cache.find(x => x.name === key)?.toString() || key))
    .catch(() => []);
    let Plateforme = user.presence.clientStatus;
    let device = Object.getOwnPropertyNames(Plateforme || {});
    if(Plateforme === null){
      device[0] = "N/A"
    }
    if (message.guild.ownerID === user.id){
      userFlags.push('<:GUILD_OWNER:812992729797230592>')
    };
    if (presence === "dnd") {
      presence = "Do Not Disturb <:ne_pas_deranger:812015381223964733>"
    }
    if (presence === "online") {
      presence = "Online <:en_ligne:820758911975424021>"
  }
  if (presence === 'offline') {
      presence = 'Offline <:hors_ligne:820758964895613009>'
  }
  if (presence === "idle") {
      presence = "Idle <:inactif:820758854375571496>"
  }
  if(device[0] === "web"){
    device[0] = "Web "+client.config.clientMap.web
  }
  if(device[0] === "desktop"){
    device[0] = "Desktop "+client.config.clientMap.desktop
  }
  if(device[0] === "mobile"){
    device[0] = "Mobile "+client.config.clientMap.mobile
  }
  const perms =  member.permissions.serialize();
  const waouh = Object.keys(perms).map(perm =>[ perms[perm] ? '✔️ |' : '❌', perm.split('_').map(x => x[0] + x.slice(1).toLowerCase()).join(' ')].join(' '));

  const memberPermissions = member.permissions.toArray();
  console.log(memberPermissions)
    const embeduser = new MessageEmbed()
      .setAuthor(`Discord user ${user.tag}`, null, 'https://discord.com/')
      .setDescription(userFlags.join(" "))
      .addField('Membre', member, true)
      .addField('Nom et tag', member.user.tag, true)
      .addField('Nickname', member.nickname ? `${member.nickname}` : 'Ne possède pas de nick', true)
      .addField('Date de création du compte', moment(member.user.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Date d\'arrivée sur le serveur', moment(member.joinedAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Date de début de boost', member.premiumSince ? moment(member.premiumSince).format('[Le] DD/MM/YYYY [à] HH:mm:ss') : 'Ne boost pas', true)
      .addField('Presence', presence, true)
      .addField("Plateforme", device[0], true)
      .addField("Permissions",waouh, true)
      .addField('Type', member.user.bot ? 'Bot' : 'User', true )
      .addField(`Rôles [${member.roles.cache.size - 1}]`, member.roles.cache.filter(r => r.id !== message.guild.id).sort((A,B) => B.rawPosition - A.rawPosition).map(x => `${x}`).splice(0,50).join(' | ') || '\u200b')
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(`ID : ${member.id}`)
      .setColor(member.displayHexColor || 'GREY')
    message.channel.send(embeduser);
  }else{
    const member = await message.author || client.users.cache.get(args[0])
    const user = member.user;
    if (message.guild.ownerID === user.id){
      userFlags.push('<:GUILD_OWNER:812992729797230592>')
    };
    let presence = user.presence.status;
    let Plateforme = user.presence.clientStatus;
    let device = Object.getOwnPropertyNames(Plateforme || {});
    if (presence === "dnd") {
      presence = "Do Not Disturb <:ne_pas_deranger:812015381223964733>"
    }
    if (presence === "online") {
      presence = "Online <:en_ligne:820758911975424021>"
  }
  if (presence === 'offline') {
      presence = 'Offline <:hors_ligne:820758964895613009>'
  }
  if (presence === "idle") {
      presence = "Idle <:inactif:820758854375571496>"
  }
  if(device[0] === "web"){
    device[0] = "Web "+client.config.clientMap.web
  }
  if(device[0] === "desktop"){
    device[0] = "Desktop "+client.config.clientMap.desktop
  }
  if(device[0] === "mobile"){
    device[0] = "Mobile "+client.config.clientMap.mobile
  }
    const userFlags = await user.fetchFlags()
    .then(flags => Promise.resolve(Object.entries(flags.serialize()).filter(([_, val]) => !!val)))
    .then(flags => flags.map(([key, _]) => client.emojis.cache.find(x => x.name === key)?.toString() || key))
    .catch(() => []);
    const embeduser = new MessageEmbed()
      .setAuthor(`Discord user ${user.tag}`, null, 'https://discord.com/')
      .setDescription(userFlags.join(" "))
      .addField('Membre', member, true)
      .addField('Date de création du compte', moment(user.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Infractions', client.db_warns.warns[user.id] ? client.db_warns.warns[user.id].length : 'Aucune', true)
      .addField('Presence', user.presence.status, true)
      .addField('Type', user.bot ? 'Bot' : 'User', true )
      .addField('Presence', presence, true)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setFooter(`ID : ${user.id}`)
      .setColor(user.displayHexColor || 'GREY');
      message.channel.send(embeduser);
  }
	},
};
