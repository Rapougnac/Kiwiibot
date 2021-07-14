const { APIMessage } = require('discord.js');
// eslint-disable-next-line no-unused-vars
const Client = require('./Client');
module.exports = class Utils {
  /**
   * The client
   * @param {Client} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   *
   * @param {*} perms
   */
  formatPerms(perms) {
    return perms
      .toLowerCase()
      .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
      .replace(/_/g, ' ')
      .replace(/Guild/g, 'Server')
      .replace(/Use Vad/g, 'Use Voice Activity');
  }

  formatArray(array, type = 'conjunction') {
    return new Intl.ListFormat('en-US', { style: 'short', type: type }).format(
      array
    );
  }

  /**
   *@typedef {{days: number, hours: number, minutes: number, seconds, number}} TimeData
   */

  /**
   * Parses ms time
   * @param {Number} milliseconds Time to parse
   * @returns {TimeData}
   */
  parseMs(milliseconds) {
    const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;

    return {
      days: roundTowardsZero(milliseconds / 86400000),
      hours: roundTowardsZero(milliseconds / 3600000) % 24,
      minutes: roundTowardsZero(milliseconds / 60000) % 60,
      seconds: roundTowardsZero(milliseconds / 1000) % 60,
    };
  }
  /**
   *
   * @param {Number} time Time
   * @returns {string}
   */
  format(time) {
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

  async createAPIMessage(interaction, content, str) {
    const { data, files } = await APIMessage.create(
      this.client.channels.resolve(interaction.channel_id),
      str,
      content
    )
      .resolveData()
      .resolveFiles();

    return { ...data, files };
  }
  /**
   * Reply to the interaction, but with ephemeral message
   * @param {import('../../types/index').Interaction} interaction
   * @param {string} content
   * @returns {Promise<void>}
   */
  async replyEphemeral(interaction, content) {
    let data = {
      flags: 1 << 6,
      content: content,
    };
    if (typeof content === 'object')
      data = await this.createAPIMessage(interaction, content);
    this.client.api
      .interactions(interaction.id, interaction.token)
      .callback.post({
        data: {
          type: 4,
          flags: 1 << 6,
          data,
        },
      });
  }
  /**
   *
   * @param {import('../../types').Interaction} interaction
   * @param {string|object} response
   * @param {string} [content]
   * @returns {Promise<void>}
   */
  async reply(interaction, response, content) {
    let data = {
      content: response,
    };

    if (typeof response === 'object') {
      data = await this.createAPIMessage(interaction, response, content);
    }
    this.client.api
      .interactions(interaction.id, interaction.token)
      .callback.post({
        data: {
          type: 4,
          data,
        },
      });
  }
  /**
   * Delete a slash command
   * @param {string} id The command id to put on.
   */
  deleteSlash(id) {
    this.client.api.applications(this.client.user.id).commands(id).delete().then(() => console.log('Command has been successfully deleted!'));
  }
};
