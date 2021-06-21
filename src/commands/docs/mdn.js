const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const { javascript } = require('@mdn/browser-compat-data');
const { inspect } = require('util');
module.exports = class MDNCommand extends Command {
   /** 
    *@param {Client} client 
    */ 
  constructor(client) {
    super(client, {
      name: 'mdn',
      aliases: [''],
      description: '',
      category: '',
      cooldown: 5,
      utilisation: '{prefix}',
    });
  }
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message) {
    const args = message.content.trim().split(/\s+/g);
    console.log(javascript);
    message.channel.send(`${javascript[args[1]][args.slice(2).join('_')].iterator.__compat.description.replace(/<code>/g, '`').replace(/<\/code>/g, '`')}`);
    // const embed = new MessageEmbed()
    //     .setTitle(javascript[args[0]][args.slice(1).join('_')].__compat.description.replace(/<code>/g, '`').replace(/<\/code>/g, '`'));


  }
};