const { Structures, User } = require('discord.js');

class ExtendedUser extends User {
  /**
   * Get the banner of the user
   * @param {string} userID The user id to pass in.
   * @param {string} hash The hash of the banner
   * @param {import('discord.js').ImageURLOptions} format The format of the image
   * @param {import('discord.js').ImageSize} size The size of the banner
   * @param {boolean} [dynamic] If avaliable and if true, the format will be .gif
   * @param {string} [root] The root url
   * @returns {string} The url of the banner
   */
  BannerUser(
    userID,
    hash,
    format = 'webp',
    size,
    dynamic = false,
    root = 'https://cdn.discordapp.com'
  ) {
    if (dynamic) format = hash.startsWith('a_') ? 'gif' : format;
    return this.client.makeImageUrl(`${root}/banners/${userID}/${hash}`, {
      format,
      size,
    });
  }
  /**
   *
   * @param {object} data The data from the api
   * @param {User} user The user to pass in
   * @param {import('discord.js').ImageURLOptions & { dynamic?: boolean }} ImageURLOptions
   * @returns {string} The url of the banner
   */
   displayUserBannerURL(data, user, { format, size, dynamic }) {
    if (!data.data.banner) return null;
    return user.BannerUser(user.id, data.data.banner, format, size, dynamic);
  }
}

Structures.extend('User', () => ExtendedUser);
