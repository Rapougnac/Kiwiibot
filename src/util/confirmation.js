// eslint-disable-next-line no-unused-vars
const { Message, User } = require('discord.js')

/**
 * @param {Message} message The message
 * @param {User} author The author of the message
 * @param {String[]} validReactions The reaction to react to the message
 * @param {Number} time The time to wait to collect the reactions, default is set to `60000`
 * @returns {Promise<string|void>}
 */
const confirmation = async (message, author, validReactions, time = 60000) => {
  if (!message)
    throw new ReferenceError('confirmation => "message" is not defined');
  if (!validReactions || validReactions.length !== 2)
    throw new ReferenceError(
      'confirmation => Invalid form body [validReactions]'
    );
  if (typeof time !== 'number')
    throw new SyntaxError('confirmation => typeof "time" must be a number');
  if (!message.guild.me.hasPermission('MANAGE_MESSAGES'))
    return console.log(
      `confirmation err: Discord Client has to have "MANAGE_MESSAGES" permission.`
    );

  for (const reaction of validReactions) await message.react(reaction);

  const filter = (reaction, user) =>
    validReactions.includes(reaction.emoji.name) && user.id === author.id;

  return message
    .awaitReactions(filter, { max: 1, time: time })
    .then((collected) => collected.first() && collected.first().emoji.name);
};
 

module.exports = { confirmation };