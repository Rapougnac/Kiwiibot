module.exports = class Utils {
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
};
