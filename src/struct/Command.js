/// <reference path="../../types/index.d.ts" />
const Client = require('./Client');
const { Collection, MessageEmbed, Message } = require('discord.js');
/**
 * Represents a command
 */
module.exports = class Command {
  /**
   * @typedef {['CREATE_INSTANT_INVITE'|'KICK_MEMBERS'|'BAN_MEMBERS'|'ADMINISTRATOR'|'MANAGE_CHANNELS'|'MANAGE_GUILD'|'ADD_REACTIONS'|'VIEW_AUDIT_LOG'
   * |'PRIORITY_SPEAKER'|'STREAM'|'VIEW_CHANNEL'|'SEND_MESSAGES'|'SEND_TTS_MESSAGES'|'MANAGE_MESSAGES'|'EMBED_LINKS'|'ATTACH_FILES'|'READ_MESSAGE_HISTORY'
   * |'MENTION_EVERYONE'|'USE_EXTERNAL_EMOJIS'|'VIEW_GUILD_INSIGHTS'|'CONNECT'|'SPEAK'|'MUTE_MEMBERS'|'DEAFEN_MEMBERS'|'MOVE_MEMBERS'|'USE_VAD'
   * |'CHANGE_NICKNAME'|'MANAGE_NICKNAMES'|'MANAGE_ROLES'|'MANAGE_WEBHOOKS'|'MANAGE_EMOJIS']} PermissionString
   */

  /**
   * @param {Client} client
   * @param {object} options
   * @param {string} options.name The name of the command
   * @param {string} [options.description] The description of the command
   * @param {string} [options.utilisation] The usage of the command
   * @param {string} [options.category] The category of the command
   * @param {PermissionString} [options.permissions] The user's permissions, if no permissions was provided `['SEND_MESSAGES', 'VIEW_CHANNEL']` are the default one.
   * @param {PermissionString} [options.clientPermissions] The client's permissions, if no permissions was provided `['SEND_MESSAGES', 'VIEW_CHANNEL']` are the default one.
   * @param {number} [options.cooldown] The cooldown of the command, none if the cooldown was not specified
   * @param {string[]} [options.aliases] The aliases of the command, none if aliases was not specified
   * @param {boolean} [options.guildOnly=false] If the command can be used inside the guild only or not, `false` by default
   * @param {boolean} [options.adminOnly=false] If the command can be only used by user's who have the administrator permission, `false` by default
   * @param {boolean} [options.ownerOnly=false] If the command can only be executed by the owner of the bot, `false` by default
   * @param {boolean} [options.nsfw=false] If the command is nsfw or not, `false` by default
   * @param {string[]} [options.string] This is used to pass the translation
   * @param {boolean} [options.hidden=false] Whether the command should be hidden from the help menu
   */
  constructor(client, options) {
    /**
     * The client used in the command
     * @type {Client}
     */
    this.client = client;

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
       * @type {PermissionString}
       */
      clientPermissions: options.clientPermissions || [
        'SEND_MESSAGES',
        'VIEW_CHANNEL',
      ],
      /**
       * The cooldown of the command, none if the cooldown was not specified
       * @type {number}
       */
      cooldown: options.cooldown * 1000 || -1,
      /**
       * The aliases of the command, none if aliases was not specified
       * @type {string[]}
       */
      aliases: options.aliases || [],
      /**
       * If the command can be used inside the guild only or not, `false` by default
       * @type {boolean}
       */
      guildOnly: options.guildOnly || false,
      /**
       * If the command can be only used by user's who have the administrator permission, `false` by default
       * @type {boolean}
       */
      adminOnly: options.adminOnly || false,
      /**
       * If the command can only be executed by the owner of the bot, `false` by default
       * @type {boolean}
       */
      ownerOnly: options.ownerOnly || false,
      /**
       * If the command is nsfw or not, `false` by default
       * @type {boolean}
       */
      nsfw: options.nsfw || false,
      /**
       * This is used to pass the translation
       * @type {String[]}
       */
      string: options.string,
      /**
       * Whether the command should be hidden from the help menu
       * @type {boolean}
       */
      hidden: options.hidden || false,
    };
    /**
     * A set of the ids of the users on cooldown
     * @type {Collection}
     */
    this.cooldown = new Collection();
  }
  /**
   * Trace the command
   * @private
   */
  trace({ command = this.help.name, dir = false } = {}) {
    let files = glob.sync('./src/commands/**/*.js');
    let Path;
    const exclude = this.client.config.discord.dev.exclude_cmd;
    const include = this.client.config.discord.dev.include_cmd;
    if (this.client.config.discord.dev.active) {
      if (include.length) {
        files = files.filter((file) => include.includes(path.parse(file).base));
      }
      if (exclude.length) {
        files = files.filter(
          (file) => !exclude.includes(path.parse(file).base)
        );
      }
    }
    for (const file of files) {
      const filePath = path.resolve(file);
      const fileName = path.basename(filePath, path.extname(filePath));
      const filePathDir = path.dirname(filePath);
      if (fileName === command)
        return dir ? (Path = filePathDir) : (Path = filePath);
    }
    return Path;
  }
  /**
   * Set the message
   * @param {Message} message
   */
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
  async checkPerms(message, cmd, client) {
    const promise = new Promise((resolve) => {
      const { guild } = message;
      const reasons = [];
      if (message.channel.type === 'dm') {
        if (cmd.config.guildOnly) {
          reasons.push(message.guild.i18n.__mf('PERMS_MESSAGE.guild_only'));
        }
      }

      if (guild) {
        if (cmd.config.ownerOnly) {
          if (!client.owners.includes(message.author.id)) {
            reasons.push(message.guild.i18n.__mf('PERMS_MESSAGE.dev_only'));
          }
        }
        if (cmd.config.adminOnly) {
          if (!message.member.hasPermission('ADMINISTRATOR')) {
            reasons.push(message.guild.i18n.__mf('PERMS_MESSAGE.admin_only'));
          }
        }
        if (cmd.config.nsfw) {
          if (!message.channel.nsfw) {
            reasons.push(message.guild.i18n.__mf('PERMS_MESSAGE.nsfw'));
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
                message.guild.i18n.__mf(
                  'PERMS_MESSAGE.missing_permissions_you'
                ),
                message.guild.i18n.__mf(
                  'PERMS_MESSAGE.missing_permissions1_you'
                ),
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
                message.guild.i18n.__mf('PERMS_MESSAGE.missing_permissions_i'),
                message.guild.i18n.__mf('PERMS_MESSAGE.missing_permissions1_i'),
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
          resolve(false);
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
              `\`\`\`diff\n-${message.guild.i18n.__mf(
                'PERMS_MESSAGE.blocked_cmd'
              )}\n\`\`\`\n\n` +
                `\`${message.guild.i18n.__mf(
                  'PERMS_MESSAGE.reason'
                )}:\`\n\n${reasons.map((reason) => '• ' + reason).join('\n')}`
            );
          return message.channel.send(embed);
        } else {
          resolve(true);
        }
      } else {
        if (cmd.config.ownerOnly) {
          if (!client.owners.includes(message.author.id)) {
            reasons.push(message.guild.i18n.__mf('PERMS_MESSAGE.dev_only'));
          }
        }
        if (cmd.config.nsfw) {
          if (!message.channel.nsfw) {
            reasons.push(message.guild.i18n.__mf('PERMS_MESSAGE.nsfw'));
          }
        }
        if (reasons.length > 0) {
          resolve(false);
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
              `\`\`\`diff\n-${message.guild.i18n.__mf(
                'PERMS_MESSAGE.blocked_cmd'
              )}\n\`\`\`\n\n` +
                `\`${message.guild.i18n.__mf(
                  'PERMS_MESSAGE.reason'
                )}:\`\n\n${reasons.map((reason) => '• ' + reason).join('\n')}`
            );
          return message.channel.send(embed);
        } else {
          resolve(true);
        }
      }
    });
    this.promise = promise;
  }
  /**
   *
   * @param {String} message The message to pass in
   * @param {Object} [options] The options
   * @returns {Promise<Message>}
   */
  async inlineReply(message, options = {}) {
    if (!options)
      options = {
        allowedMentions: {
          repliedUser: false,
        },
      };
    this.message.inlineReply(message, options);
  }
  execute() {
    throw new Error(`${this.help.name} doesn't have an execute() method.`);
  }
};
