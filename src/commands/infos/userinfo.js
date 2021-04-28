const { MessageEmbed, Client, Message } = require("discord.js");
const moment = require('moment');
require("moment-duration-format");

module.exports = {
  name: 'userinfo',
  aliases: ['ui', "whois"],
  description: 'Shows informations about you or a user',
  category: 'Infos',
  utilisation: '{prefix}userinfo <member>',
  guildOnly: true,
  adminOnly: false,
  ownerOnly: false,
  permissions: [],
  clientPermissions: ["EMBED_LINKS", "SEND_MESSAGES", "VIEW_CHANNEL"],
  string: [],
  /**
    * @param {Client} client 
    * @param {Message} message
    * @param {String[]} args
    */
  async execute(client, message, args) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() == args.join(' ').toLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLowerCase()) || args[0] || message.member;
    const user = member.user;
    let status = user.presence.status;
    const userFlags = await user.fetchFlags()
      .then(flags => Promise.resolve(Object.entries(flags.serialize()).filter(([_, val]) => !!val)))
      .then(flags => flags.map(([key, _]) => client.emojis.cache.find(x => x.name === key)?.toString() || key))
      .catch(() => []);
    let Plateforme = user.presence.clientStatus;
    let device = Object.getOwnPropertyNames(Plateforme || {});
    if (Plateforme === null) {
      device[0] = "N/A"
    }
    if (Plateforme === undefined) {
      device[0] = "N/A"
    }
    if (!Plateforme) {
      device[0] = "N/A"
    }
    if (message.guild.ownerID === user.id) {
      userFlags.push('<:GUILD_OWNER:812992729797230592>')
    }
    if (message.member.hasPermission("ADMINISTRATOR")) {
      userFlags.push("<:ADMINISTRATOR:827241621270560788>")
    }
    if (message.member.hasPermission("MANAGE_GUILD")) {
      userFlags.push("<:MANAGE_GUILD:827892396372525106>")
    }
    if (status === "dnd") {
      status = this.string[0]
    }
    if (status === "online") {
      status = this.string[1]
    }
    if (status === 'offline') {
      status = this.string[2]
    }
    if (status === "idle") {
      status = this.string[3]
    }
    if (device[0] === "web") {
      device[0] = "Web " + client.config.clientMap.web
    }
    if (device[0] === "desktop") {
      device[0] = this.string[4].format(client.config.clientMap.desktop)
    }
    if (device[0] === "mobile") {
      device[0] = "Mobile " + client.config.clientMap.mobile
    }

    const embeduser = new MessageEmbed()
      .setAuthor(this.string[5].format(user.tag), null, 'https://discord.com/')
      .setDescription(userFlags.join(" "))
      .addField(this.string[6], member, true)
      .addField(this.string[7], member.user.tag, true)
      .addField(this.string[8], member.nickname ? `${member.nickname}` : this.string[9], true)
      .addField(this.string[10], moment(member.user.createdAt).format(`[${this.string[11]}] DD/MM/YYYY [${this.string[12]}] HH:mm:ss`), true)
      .addField(this.string[14], moment(member.joinedAt).format(`[${this.string[11]}] DD/MM/YYYY [${this.string[12]}] HH:mm:ss`), true)
      .addField(this.string[15], member.premiumSince ? moment(member.premiumSince).format(`[${this.string[11]}] DD/MM/YYYY [${this.string[13]}] HH:mm:ss`) : this.string[13], true)
      .addField('Presence', status, true)
      .addField(this.string[16], device[0], true)
      .addField(this.string[17], member.user.bot ? 'Bot' : this.string[18], true)
      .addField(this.string[19].format(member.roles.cache.size - 1), member.roles.cache.filter(r => r.id !== message.guild.id).sort((A, B) => B.rawPosition - A.rawPosition).map(x => `${x}`).splice(0, 50).join(' | ') || '\u200b')
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(`ID : ${member.id}`)
      .setColor(member.displayHexColor || 'GREY')
    message.channel.send(embeduser);
  },
};
