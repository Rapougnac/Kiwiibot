module.exports = class LoadingBar {
  /**
   * Start the loading bar event
   * @param {object} [options] The options of the loading bar
   * @param {number} [options.length] The length of the loading bar
   * @param {number} [options.time] The time to wait in milliseconds before each refresh of the bar
   * @param {boolean} [options.allowMessage] If it should send with message using discord.js
   * @param {Message} [options.message] The message object
   * @param {string} [options.start] The start of the progress bar
   * @param {string} [options.end] The end of the progress bar
   * @param {string} [options.empty] The empty string of the progress bar
   * @param {string} [options.full] The full string of the progress bar
   * @param {boolean} [options.deleteMessage] If it should delete the bar after completed
   * @param {number} [options.timeoutMessage] If it should delete the message after a time
   * @returns {Promise<void>}
   */
  async start({
    length = 20,
    time = 250,
    allowMessage = false,
    message,
    start = '[',
    end = ']',
    empty = '\u2591',
    full = '\u2588',
    deleteMessage = false,
    timeoutMessage = 0,
  } = {}) {
    if (!allowMessage && !message) {
      for (let i = 0; i <= length; i++) {
        const Full = full.repeat(i);
        const left = length - i;
        const Empty = empty.repeat(left);
        const nbr = length * (100 / length);
        const percentage = (i * nbr) / length;
        console.log(
          `\r${start}${Full}${Empty}${end} ${
            Number.isInteger(percentage) ? percentage : percentage.toFixed(2)
          }%`
        );
        await this.constructor.wait(time);
      }
    } else {
      for (let i = 0; i <= length; i++) {
        const Full = full.repeat(i);
        const left = length - i;
        const Empty = empty.repeat(left);
        // Get the number to multiply after
        const nbr = length * (100 / length);
        // Get the percentage with the constant nbr
        const percentage = (i * nbr) / length;
        // If this is the 1st time, send the message
        if (i === 0) {
          // Reassign message
          message = await message.channel.send(
            `\r${start}${Full}${Empty}${end} ${
              Number.isInteger(percentage) ? percentage : percentage.toFixed(2)
            }%`
          );
        } else {
          // Edit message
          message.edit(
            `\r${start}${Full}${Empty}${end} ${
              Number.isInteger(percentage) ? percentage : percentage.toFixed(2)
            }%`
          );
        }
        // If this is the end of the progress, and deleteMessage has been enabled, delete the message
        if (i === length && deleteMessage && allowMessage && message) {
          setTimeout(() => {
            message.delete();
          }, timeoutMessage);
        }
        await this.constructor.wait(time);
      }
    }
  }

  /**
   * Method to wait
   * @param {number} [milliseconds] The time in ms to wait
   * @returns {Promise<*>}
   */
  static wait(milliseconds = 250) {
    return new Promise((res) => setTimeout(res, milliseconds));
  }
};
