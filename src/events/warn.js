//here the event starts
module.exports = (client) => {
  console.warn();
};
const { Event } = require('../struct/main');

module.exports = class WarnEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'warn',
    });
  }
  execute(info) {
    console.warn(info);
  }
};
