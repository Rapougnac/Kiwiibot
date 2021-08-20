const { GuildMember, Structures } = require('discord.js');

class ExtendedGuildMember extends GuildMember {
  constructor(client, data, guild) {
    super(client, data, guild);
    this.client.api
      .guilds(this.guild.id)
      .members(data.id)
      .get()
      .then((_data) => {
        if ('avatar' in _data) {
          this.avatar = _data.avatar;
        } else if (typeof this.avatar !== 'string') {
          this.avatar = null;
        }
      });
  }
  /**
   *
   * @param {string} guildId The guild id
   * @param {string} memberId The member id
   * @param {?string} hash The hash of the member's avatar
   * @param {import('discord.js').AllowedImageFormat} format The format of the image
   * @param {import('discord.js').ImageSize} size The size of the image
   * @param {boolean} dynamic If the image should be dynamic
   * @returns {?string} The url to the member's avatar
   * @private
   */
  GuildMemberAvatar(
    guildId,
    memberId,
    hash,
    format = 'webp',
    size,
    dynamic = false
  ) {
    const root = 'https://cdn.discordapp.com';
    if (dynamic) format = hash.startsWith('a_') ? 'gif' : format;
    return this.client.utils.makeImageUrl(
      `${root}/guilds/${guildId}/users/${memberId}/avatars/${hash}`,
      { format, size }
    );
  }

  /**
   * A link to the member's guild avatar.
   * @param {import('discord.js').ImageURLOptions & { dynamic?: boolean }} [options] Options for the image url
   * @returns {?string}
   */
  avatarURL({ format, size, dynamic } = {}) {
    if (!this.avatar) return null;
    return this.GuildMemberAvatar(
      this.guild.id,
      this.id,
      this.avatar,
      format,
      size,
      dynamic
    );
  }
  /**
   *
   * @param {import('discord.js').ImageURLOptions & { dynamic?: boolean }} [options] Options for the image URL
   * @returns {string}
   */
  displayAvatarURL(options) {
    return this.avatarURL(options) || this.user.displayAvatarURL(options);
  }
}

Structures.extend('GuildMember', () => ExtendedGuildMember);
