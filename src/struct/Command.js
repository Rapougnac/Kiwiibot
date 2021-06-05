/// <reference path="../../types/index.d.ts" />
const Client = require('./Client');
const { Collection, MessageEmbed, Message } = require('discord.js');

/**
 * Represents a command
 */
module.exports = class Command {
  /**
   * @param {Client} client
   * @param {Object} options
   * @param {String} options.name The name of the command
   * @param {String} [options.description] The description of the command
   * @param {String} [options.utilisation] The usage of the command
   * @param {String} [options.category] The category of the command
   * @param {['CREATE_INSTANT_INVITE'|'KICK_MEMBERS'|'BAN_MEMBERS'|'ADMINISTRATOR'|'MANAGE_CHANNELS'|'MANAGE_GUILD'|'ADD_REACTIONS'|'VIEW_AUDIT_LOG'
   * |'PRIORITY_SPEAKER'|'STREAM'|'VIEW_CHANNEL'|'SEND_MESSAGES'|'SEND_TTS_MESSAGES'|'MANAGE_MESSAGES'|'EMBED_LINKS'|'ATTACH_FILES'|'READ_MESSAGE_HISTORY'
   * |'MENTION_EVERYONE'|'USE_EXTERNAL_EMOJIS'|'VIEW_GUILD_INSIGHTS'|'CONNECT'|'SPEAK'|'MUTE_MEMBERS'|'DEAFEN_MEMBERS'|'MOVE_MEMBERS'|'USE_VAD'
   * |'CHANGE_NICKNAME'|'MANAGE_NICKNAMES'|'MANAGE_ROLES'|'MANAGE_WEBHOOKS'|'MANAGE_EMOJIS']} [options.permissions] The user's permissions, if no permissions was provided `['SEND_MESSAGES', 'VIEW_CHANNEL']` are the default one.
   * @param {['CREATE_INSTANT_INVITE'|'KICK_MEMBERS'|'BAN_MEMBERS'|'ADMINISTRATOR'|'MANAGE_CHANNELS'|'MANAGE_GUILD'|'ADD_REACTIONS'|'VIEW_AUDIT_LOG'
   * |'PRIORITY_SPEAKER'|'STREAM'|'VIEW_CHANNEL'|'SEND_MESSAGES'|'SEND_TTS_MESSAGES'|'MANAGE_MESSAGES'|'EMBED_LINKS'|'ATTACH_FILES'|'READ_MESSAGE_HISTORY'
   * |'MENTION_EVERYONE'|'USE_EXTERNAL_EMOJIS'|'VIEW_GUILD_INSIGHTS'|'CONNECT'|'SPEAK'|'MUTE_MEMBERS'|'DEAFEN_MEMBERS'|'MOVE_MEMBERS'|'USE_VAD'
   * |'CHANGE_NICKNAME'|'MANAGE_NICKNAMES'|'MANAGE_ROLES'|'MANAGE_WEBHOOKS'|'MANAGE_EMOJIS']} [options.clientPermissions] The client's permissions, if no permissions was provided `['SEND_MESSAGES', 'VIEW_CHANNEL']` are the default one.
   * @param {Number} [options.cooldown] The cooldown of the command, none if the cooldown was not specified
   * @param {String[]} [options.aliases] The aliases of the command, none if aliases was not specified
   * @param {Boolean} [options.guildOnly] If the command can be used inside the guild only or not, `false` by default
   * @param {Boolean} [options.adminOnly] If the command can be only used by user's who have the administrator permission, `false` by default
   * @param {Boolean} [options.ownerOnly] If the command can only be executed by the owner of the bot, `false` by default
   * @param {Boolean} [options.nsfw] If the command is nsfw or not, `false` by default
   * @param {String[]} [options.string] This is used to pass the translation
   */
  constructor(client, options) {
    /**
     * The client used in the command
     * @type {Client}
     */
    this.client = client;

    /**
     * The properties of the command
     * @type {Object}
     */
    this.help = {
      /**
       * The name of the command
       * @type {String}
       */
      name: options.name,
      /**
       * The description of the command
       * @type {String}
       */
      description: options.description,
      /**
       * The usage of the command
       * @type {String}
       */
      utilisation: options.utilisation,
      /**
       * The category of the command
       * @type {String}
       */
      category: options.category,
    };

    this.config = {
      /**
       * The user's permissions, if no permissions was provided
       * ```js
       * ['SEND_MESSAGES', 'VIEW_CHANNEL']
       * ```
       * are the default one
       * @type {PermissionString}
       */
      permissions: options.permissions || ['SEND_MESSAGES', 'VIEW_CHANNEL'],
      /**
       * The client's permissions, if no permissions was provided
       * ```js
       * ['SEND_MESSAGES', 'VIEW_CHANNEL']
       * ```
       * are the default one
       * @type {PermissionResolvable}
       */
      clientPermissions: options.clientPermissions || [
        'SEND_MESSAGES',
        'VIEW_CHANNEL',
      ],
      /**
       * The cooldown of the command, none if the cooldown was not specified
       * @type {Number}
       */
      cooldown: options.cooldown * 1000 || 1 * 1000,
      /**
       * The aliases of the command, none if aliases was not specified
       * @type {String[]}
       */
      aliases: options.aliases || [],
      /**
       * If the command can be used inside the guild only or not, `false` by default
       * @type {Boolean}
       */
      guildOnly: options.guildOnly || false,
      /**
       * If the command can be only used by user's who have the administrator permission, `false` by default
       * @type {Boolean}
       */
      adminOnly: options.adminOnly || false,
      /**
       * If the command can only be executed by the owner of the bot, `false` by default
       * @type {Boolean}
       */
      ownerOnly: options.ownerOnly || false,
      /**
       * If the command is nsfw or not, `false` by default
       * @type {Boolean}
       */
      nsfw: options.nsfw || false,
      /**
       * This is used to pass the translation
       * @type {String[]}
       */
      string: options.string,
    };

    /**
     * A set of the ids of the users on cooldown
     * @type {Collection}
     */
    this.cooldowns = new Collection();
  }
  /**
   * Puts a user on cooldown
   * @param {String} user The ID of the user to put on cooldown
   */
  startCooldown(user, cmd, message) {
    const { guild } = message;
    const now = Date.now(); //get the current time
    const cooldownAmount = cmd.config.cooldown; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it ^^
    if (!this.cooldowns.has(user)) {
      this.cooldowns.set(user, now);
      setTimeout(() => this.cooldowns.delete(user), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
    } else {
      const timestamps = this.cooldowns.get(user); //get the timestamp of the last used commands

      //if the user is on cooldown
      const expirationTime = timestamps + cooldownAmount; //get the amount of time he needs to wait until they can run the cmd again

      this.now = now;
      this.expirationTime = expirationTime;
      
    }
  }

  setMessage(message) {
    this.message = message;
  }

  respond(message) {
    this.message.channel.send(message);
  }
  /**
   *
   * @param {Message} message
   * @param {Command} cmd
   * @param {*} language
   * @param {Client} client
   * @returns {Promise<Message>}
   */
  async checkPerms(message, cmd, language, client) {
    const promise = new Promise((resolve) => {
      const { guild } = message;
      const reasons = [];
      if (message.channel.type === 'dm') {
        if (cmd.config.guildOnly) {
          reasons.push(language(guild, 'PERMS_MESSAGE')[0].join(' - '));
        }
      }

      if (message.channel.type !== 'dm') {
        if (cmd.config.ownerOnly) {
          if (!client.owners.includes(message.author.id)) {
            reasons.push(language(guild, 'PERMS_MESSAGE')[1].join(' - '));
          }
        }
        if (cmd.config.adminOnly) {
          if (!message.member.hasPermission('ADMINISTRATOR')) {
            reasons.push(language(guild, 'PERMS_MESSAGE')[2].join(' - '));
          }
        }
        if (cmd.config.nsfw) {
          if (!message.channel.nsfw) {
            reasons.push(language(guild, 'PERMS_MESSAGE')[3].join(' - '));
          }
        }
        if (Array.isArray(cmd.config.permissions)) {
          if (
            !message.channel
              .permissionsFor(message.member)
              .has(cmd.config.permissions)
          ) {
            reasons.push(
              [
                language(guild, 'PERMS_MESSAGE')[4][0],
                language(guild, 'PERMS_MESSAGE')[4][1],
                Object.entries(
                  message.channel.permissionsFor(message.member).serialize()
                )
                  .filter((p) => cmd.config.permissions.includes(p[0]) && !p[1])
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
        if (Array.isArray(cmd.config.clientPermissions)) {
          if (
            !message.channel
              .permissionsFor(message.guild.me)
              .has(cmd.config.clientPermissions)
          ) {
            reasons.push(
              [
                language(guild, 'PERMS_MESSAGE')[5][0],
                language(guild, 'PERMS_MESSAGE')[5][1],
                Object.entries(
                  message.channel.permissionsFor(message.guild.me).serialize()
                )
                  .filter(
                    (p) => cmd.config.clientPermissions.includes(p[0]) && !p[1]
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
          resolve(false)
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
              `\`\`\`diff\n-${
                language(guild, 'PERMS_MESSAGE')[6]
              }\n\`\`\`\n\n` +
                `\`${language(guild, 'PERMS_MESSAGE')[7]}:\`\n\n${reasons
                  .map((reason) => '• ' + reason)
                  .join('\n')}`
            );
          return message.channel.send(embed);
        } else {
          resolve(true);
        }
      }
    });
    this.promise = promise;
  }
};

