const {
  APIMessage,
  MessageEmbed,
  RoleManager,
  Permissions,
  GuildMember,
  Message,
  // eslint-disable-next-line no-unused-vars
  User,
} = require('discord.js');
const axios = require('axios');
const Client = require('./src/struct/Client'); // Extended Client
require('./src/struct/Message'); // Extended Message
const moment = require('moment');
const { language, setLanguage } = require('./language');
const languageSchema = require('./src/models/languageSchema');
const { convertUFB } = require('./src/util/string');
const client = new Client({
  prefix: 'n?', // Prefix of the bot
  defaultPerms: ['SEND_MESSAGES', 'VIEW_CHANNEL'], // Default permissions
  owners: ['253554702858452992', '364062534975881218'], // Owner(s) of the bot
  config: require('./config.js'), //Path to the config.js file
  disabledEvents: [
    'channelUpdate',
    'channelCreate',
    'guildMemberUpdate',
    'presenceUpdate',
  ],
  clientOptions: {
    disableMentions: 'everyone', //disables, that the bot is able to send @everyone
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  },
});
//Client start
client.start();
//client initalization
client.login();

client.listentoProcessEvents(['uncaughtException', 'unhandledRejection'], {
  log_on_console: false,
  nologs: false,
  logsonboth: true,
});

/**
 * @typedef {{name: string, id: string, options?: Array<object>, resolved?: { user: User, member: GuildMember }}} Data
 */
/**
 * @typedef {{member: GuildMember, guild_id: string, data: Data, token: string, type: number, version: number, appilcation_id: string, channel_id: string, id: string}} Interaction
 */
client.ws.on(
  'INTERACTION_CREATE',
  /**@param {Interaction} interaction */ async (interaction) => {
    console.log(interaction);
    const { member, guild_id, data } = interaction;
    const { options, name } = data;
    console.log(options);
    const command = name.toLowerCase();
    const args = {};
    this.args = args;
    if (options) {
      for (const option of options) {
        const { name, value } = option;
        args[name] = value;
      }
    }

    console.log(args);
    switch (command) {
      case 'ping': {
        reply(
          interaction,
          `🏓 P${'o'.repeat(
            Math.min(Math.round(client.ws.ping / 100), 1500)
          )}ng \n\`${client.ws.ping}ms\``
        );
        break;
      }

      case 'docs': {
        let source;
        const query = args?.query;
        if (args?.source) source = args?.source;
        else source = 'stable';
        const url = `https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${encodeURIComponent(
          query
        )}`;
        axios.get(url).then(({ data }) => {
          if (!data)
            return replyEphemeral(
              interaction,
              `\`❌ Error\` ${query} was not found!`
            );
          else {
            const embed = new MessageEmbed(data);
            reply(interaction, embed).catch((e) => console.log(e.message));
          }
        });
        break;
      }

      case 'avatar': {
        let user = args?.user;
        if (!user) user = member.user.id;
        const u = (await client.users.fetch(user)).displayAvatarURL({
          size: 4096,
          dynamic: true,
          format: 'png',
        });
        reply(interaction, u);
        break;
      }
      case 'userinfo': {
        let user = args?.user;
        if (!user) user = member.user.id;
        const u = await client.users.fetch(user);
        const guild = client.guilds.cache.get(guild_id);
        const mem = guild.member(u);
        let status = mem.user.presence.status;
        const userFlags = await u
          .fetchFlags()
          .then((flags) => convertUFB(flags))
          .then((flags) =>
            flags.map(
              (key) =>
                client.emojis.cache.find((x) => x.name === key)?.toString() ||
                key
            )
          )
          .catch(() => []);
        const Device = u.presence.clientStatus;
        let device = Object.getOwnPropertyNames(Device || {});
        switch (Device) {
          case null: {
            device[0] = 'N/A';
            break;
          }
          case undefined: {
            device[0] = 'N/A';
            break;
          }
          case !Device: {
            device[0] = 'N/A';
            break;
          }
        }
        if (guild.ownerID === u.id) {
          userFlags.push('<:GUILD_OWNER:812992729797230592>');
        }
        if (mem.hasPermission('ADMINISTRATOR')) {
          userFlags.push('<:ADMINISTRATOR:827241621270560788>');
        }
        if (mem.premiumSinceTimestamp > 0) {
          userFlags.push('<:ServerBooster:850729871477833759>');
        }
        switch (status) {
          case 'dnd': {
            status = language(guild, 'userinfo')[0];
            break;
          }
          case 'online': {
            status = language(guild, 'userinfo')[1];
            break;
          }
          case 'offline': {
            status = language(guild, 'userinfo')[2];
            break;
          }
          case 'idle': {
            status = language(guild, 'userinfo')[3];
            break;
          }
        }
        switch (device[0]) {
          case 'web': {
            device[0] = 'Web ' + client.config.clientMap.web;
            break;
          }
          case 'desktop': {
            device[0] = language(guild, 'userinfo')[4].format(
              client.config.clientMap.desktop
            );
            break;
          }
          case 'mobile': {
            device[0] = 'Mobile ' + client.config.clientMap.mobile;
            break;
          }
        }
        let lang;
        try {
          await languageSchema.findOne(
            {
              _id: guild.id,
            },
            (err, data) => {
              if (err) throw err;
              if (!data)
                data = new languageSchema({
                  _id: guild.id,
                  language: 'english',
                });
              lang = data.language;
            }
          );
          if (!lang) lang = 'english';
          switch (lang) {
            case 'english': {
              lang = 'en';
              break;
            }
            case 'french': {
              lang = 'fr-ch';
              break;
            }
          }
        } catch (e) {
          console.error(e);
        }
        const embeduser = new MessageEmbed()
          .setAuthor(
            language(guild, 'userinfo')[5].format(u.tag),
            mem.user.displayAvatarURL({
              dynamic: true,
              format: 'png',
              size: 512,
            }),
            'https://discord.com/'
          )
          .setDescription(userFlags.join(' '))
          .addField(language(guild, 'userinfo')[6], mem, true)
          .addField(language(guild, 'userinfo')[7], u.tag, true)
          .addField(
            language(guild, 'userinfo')[8],
            mem.nickname ? `${mem.nickname}` : language(guild, 'userinfo')[9],
            true
          )
          .addField(
            language(guild, 'userinfo')[10],
            moment(u.createdAt).format(
              `[${language(guild, 'userinfo')[11]}] DD/MM/YYYY [${
                language(guild, 'userinfo')[12]
              }] HH:mm:ss`
            ) +
              `\n\`${moment(u.createdAt, 'DD/MM/YYYY')
                .locale(lang)
                .fromNow()}\``,
            true
          )
          .addField(
            language(guild, 'userinfo')[14],
            moment(mem.joinedAt).format(
              `[${language(guild, 'userinfo')[11]}] DD/MM/YYYY [${
                language(guild, 'userinfo')[12]
              }] HH:mm:ss`
            ) +
              `\n\`${moment(mem.joinedAt, 'DD/MM/YYYY')
                .locale(lang)
                .fromNow()}\``,
            true
          )
          .addField(
            language(guild, 'userinfo')[15],
            mem.premiumSince
              ? moment(member.premiumSince).format(
                  `[${language(guild, 'userinfo')[11]}] DD/MM/YYYY [${
                    language(guild, 'userinfo')[12]
                  }] HH:mm:ss`
                ) +
                  `\n\`${moment(mem.premiumSince, 'DD/MM/YYYY')
                    .locale(lang)
                    .fromNow()}\``
              : language(guild, 'userinfo')[13],
            true
          )
          .addField('Presence', status, true)
          .addField(language(guild, 'userinfo')[16], device[0], true)
          .addField(
            language(guild, 'userinfo')[17],
            u.bot ? 'Bot' : language(guild, 'userinfo')[18],
            true
          )
          .addField(
            language(guild, 'userinfo')[19].format(mem.roles.cache.size - 1),
            mem.roles.cache.size - 1 <= 0
              ? language(guild, 'userinfo')[20]
              : mem.roles.cache
                  .filter((r) => r.id !== guild.id)
                  .sort((A, B) => B.rawPosition - A.rawPosition)
                  .map((x) => `${x}`)
                  .splice(0, 50)
                  .join(' | ') || '\u200b'
          )
          .setThumbnail(u.displayAvatarURL({ dynamic: true, size: 4096 }))
          .setFooter(`ID : ${u.id}`)
          .setColor(mem.displayHexColor || 'GREY');
        reply(interaction, embeduser);
        break;
      }
      case 'serverinfo': {
        const guild = client.guilds.cache.get(guild_id);
        const { afkTimeout } = guild;
        const botcount = guild.members.cache.filter(
          (member) => member.user.bot
        ).size;
        const humancount = guild.members.cache.filter(
          (member) => !member.user.bot
        ).size;
        const embedserv = new MessageEmbed()
          .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
          .addField(
            language(guild, 'serverinfo')[7],
            `<@!${guild.ownerID}>\n(\`${guild.owner.user.tag}\`)`,
            true
          )
          .addField(language(guild, 'serverinfo')[0], guild.name, true)
          .addField(language(guild, 'serverinfo')[1], guild.region, true)
          .addField(
            language(guild, 'serverinfo')[2],
            `${guild.memberCount} ${
              language(guild, 'serverinfo')[14]
            }\n${humancount} ${
              language(guild, 'serverinfo')[15]
            }\n${botcount} ${language(guild, 'serverinfo')[16]}`,
            true
          )
          .addField(
            language(guild, 'serverinfo')[3],
            guild.members.cache.filter(
              ({ presence }) => presence.status !== 'offline'
            ).size,
            true
          )
          .addField(
            language(guild, 'serverinfo')[4],
            `${guild.channels.cache.size} ${
              language(guild, 'serverinfo')[17]
            }\n${
              guild.channels.cache.filter((channel) => channel.type === 'text')
                .size
            } ${language(guild, 'serverinfo')[18]}\n${
              guild.channels.cache.filter((channel) => channel.type === 'voice')
                .size
            } ${language(guild, 'serverinfo')[19]}\n${
              guild.channels.cache.filter(
                (channel) => channel.type === 'category'
              ).size
            } ${language(guild, 'serverinfo')[20]}`,
            true
          )
          .addField(
            language(guild, 'serverinfo')[5],
            `${guild.emojis.cache.size} emojis\n${
              guild.emojis.cache.filter((emoji) => !emoji.animated).size
            } ${language(guild, 'serverinfo')[24]}\n${
              guild.emojis.cache.filter((emoji) => emoji.animated).size
            } ${language(guild, 'serverinfo')[21]}`,
            true
          )
          .addField(
            language(guild, 'serverinfo')[8],
            moment(guild.createdAt).format(
              `[${language(guild, 'serverinfo')[22]}] DD/MM/YYYY [${
                language(guild, 'serverinfo')[23]
              }] HH:mm:ss`
            ),
            true
          )
          .addField(
            language(guild, 'serverinfo')[9],
            language(guild, 'serverinfo')[13].format(
              guild.premiumTier,
              guild.premiumSubscriptionCount
            ),
            true
          )
          .addField(language(guild, 'serverinfo')[10], format(afkTimeout), true)
          .addField(
            language(guild, 'serverinfo')[11],
            client.config.verificationLVL[guild.verificationLevel],
            true
          )
          .addField(
            language(guild, 'serverinfo')[6].format(guild.roles.cache.size - 1),
            guild.roles.cache
              .filter((r) => r.id !== guild.id)
              .sort((A, B) => B.rawPosition - A.rawPosition)
              .map((x) => `${x}`)
              .splice(0, 30)
              .join(' | ') || '\u200b',
            false
          )
          .setFooter(language(guild, 'serverinfo')[12].format(guild.id))
          .setThumbnail(guild.iconURL({ dynamic: true }));
        reply(interaction, embedserv);
        const message = await client.api;
        //   .webhooks(client.user.id, interaction.token)
        //   .messages('@original')
        //   .patch({ data: {} });
        // console.log(message); // Discord raw message object
        // const djsMess = new Message(
        //   client,
        //   message,
        //   client.channels.cache.get(message.channel_id)
        // );
        // console.log(djsMess);
        break;
      }
      case 'setlanguage': {
        console.log(member);
        const l = new Permissions(Number(member.permissions)).toArray();
        if (!l.includes('MANAGE_MESSAGES'))
          return replyEphemeral(
            interaction,
            'You need the `MANAGE_MESSAGES` permission'
          );
        const targetedlanguage = args?.language;
        const guild = client.guilds.cache.get(guild_id);
        setLanguage(guild, targetedlanguage);
        await languageSchema
          .findOneAndUpdate(
            {
              _id: guild.id,
            },
            {
              _id: guild.id,
              language: targetedlanguage,
            },
            {
              upsert: true,
            }
          )
          .then(async () => {
            switch (targetedlanguage) {
              case 'english': {
                return await reply(interaction, 'Language has been setted!');
              }
              case 'french': {
                return await reply(
                  interaction,
                  'La langue a bien été définie !'
                );
              }
            }
          });
        break;
      }
      case 'roleinfo': {
        const guild = client.guilds.cache.get(guild_id);
        const role = await new RoleManager(guild).fetch(args?.role);
        let string = String();
        const permsArr = role.permissions.toArray();
        permsArr.forEach((perm) => {
          string += `\`${perm
            .toLowerCase()
            .replace(/(^|"|_)(\S)/g, (z) => z.toUpperCase())
            .replace(/_/g, ' ')
            .replace(/Use Vad/g, 'Use Voice Activity')
            .replace(/Guild/g, 'Server')}\`, `;
        });
        const embed = new MessageEmbed()
          .setDescription('Permissions\n' + string)
          .addField(language(guild, 'roleinfo')[1], role, true)
          .addField(language(guild, 'roleinfo')[2], role.name, true)
          .addField(language(guild, 'roleinfo')[3], role.members.size, true)
          .addField(language(guild, 'roleinfo')[4], role.hexColor, true)
          .addField(
            language(guild, 'roleinfo')[5],
            moment(role.createdAt).format(
              `[${language(guild, 'roleinfo')[6]}] DD/MM/YYYY [${
                language(guild, 'roleinfo')[7]
              }] HH:mm:ss`
            ),
            true
          )
          .addField(
            language(guild, 'roleinfo')[8],
            role.hoist
              ? language(guild, 'roleinfo')[9]
              : language(guild, 'roleinfo')[10],
            true
          )
          .addField(
            language(guild, 'roleinfo')[11],
            role.mentionable
              ? language(guild, 'roleinfo')[9]
              : language(guild, 'roleinfo')[10],
            true
          )
          .setFooter(`ID : ${role.id}`)
          .setColor(role.hexColor);
        reply(interaction, embed);
        break;
      }
      case 'inrole': {
        const mem = await client.users.fetch(member.user.id);
        const guild = client.guilds.cache.get(guild_id);
        const role = await new RoleManager(guild).fetch(args?.role);
        const memRole = guild.roles.cache
          .get(role.id)
          .members.map((m) => `${m.user.tag}${m.user.bot ? '[BOT]' : ''}`)
          .join('\n');
        const embed = new MessageEmbed()
          .setAuthor(
            mem.tag,
            mem.displayAvatarURL({
              dynamic: true,
              size: 512,
              format: 'png',
            })
          )
          .setTitle(language(guild, 'inrole')[0].format(role.name))
          .setColor(role.color)
          .setDescription(`\`\`\`css\n${memRole}\`\`\``);
        reply(interaction, embed);
        break;
      }
    }
  }
);
/**
 *
 * @param {*} interaction
 * @param {object} response
 * @returns {Promise<void>}
 */
const reply = async (interaction, response) => {
  let data = {
    content: response,
  };

  if (typeof response === 'object') {
    data = await createAPIMessage(interaction, response);
  }
  if (typeof response === 'object' && this.args?.target) {
    data = await createAPIMessage(
      interaction,
      response,
      `Heyy <@!${this.args?.target}> voilà quelque chose qui pourrait t'être utile`
    );
  }
  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data,
    },
  });
};

const replyEphemeral = async (interaction, content) => {
  let data = {
    flags: 1 << 6,
    content: content,
  };
  if (typeof content === 'object')
    data = await createAPIMessage(interaction, content);
  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      flags: 1 << 6,
      data,
    },
  });
};

const createAPIMessage = async (interaction, content, str) => {
  const { data, files } = await APIMessage.create(
    client.channels.resolve(interaction.channel_id),
    str,
    content
  )
    .resolveData()
    .resolveFiles();

  return { ...data, files };
};

const format = (time) => {
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
};
