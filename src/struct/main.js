const Client = require('./Client');
const Command = require('./Command');
const SlashCommand = require('./SlashCommand');
const Canvas = require('./Canvas');
const MessageEmbed = require('./MessageEmbed');
const Paginate = require('./Paginate');
const Interaction = require('./Interactions/Interaction');
const CommandInteraction = require('./Interactions/CommandInteraction');

module.exports = {
  Client: Client,
  Command: Command,
  SlashCommand: SlashCommand,
  Canvas: Canvas,
  MessageEmbed: MessageEmbed,
  Paginate: Paginate,
  Interaction: Interaction,
  CommandInteraction: CommandInteraction,
};
