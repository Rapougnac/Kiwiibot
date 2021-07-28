const { Structures, User } = require('discord.js');

class ExtendedUser extends User {
  constructor(client, data) {
    super(client, data);
    this.client.api
      .users(data.id)
      .get()
      .then((_data) => {
        if ('banner' in _data) {
          /**
           * The ID of the user's banner
           * @type {?string}
           */
          this.banner = _data.banner;
        } else if (typeof this.banner !== 'string') {
          this.banner = null;
        }
      });
  }

  /**
   * Get the banner of the user
   * @param {string} userID The user id to pass in.
   * @param {string} hash The hash of the banner
   * @param {import('discord.js').ImageURLOptions} [format] The format of the image
   * @param {import('discord.js').ImageSize} size The size of the banner
   * @param {boolean} [dynamic] If avaliable and if true, the format will be .gif
   * @param {string} [root] The root url
   * @returns {string} The url of the banner
   */
  Banner(
    userID,
    hash,
    format = 'webp',
    size,
    dynamic = false,
    root = 'https://cdn.discordapp.com'
  ) {
    if (dynamic) format = hash.startsWith('a_') ? 'gif' : format;
    return this.client.utils.makeImageUrl(`${root}/banners/${userID}/${hash}`, {
      format,
      size,
    });
  }
  /**
   *
   * @param {object} data The data from the api
   * @param {User} user The user to pass in
   * @param {import('discord.js').ImageURLOptions & { dynamic?: boolean }} ImageURLOptions
   * @returns {?string} The url of the banner
   */
  displayUserBannerURL({ format, size, dynamic } = {}) {
    if (!this.banner) return null;
    return this.Banner(this.id, this.banner, format, size, dynamic);
  }

  hasBanner() {
    if (this.banner) return true;
    else return false;
  }
}

Structures.extend('User', () => ExtendedUser);

module.exports = ExtendedUser;
