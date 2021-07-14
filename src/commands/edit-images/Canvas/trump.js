const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../../struct/Command');
const Client = require('../../../struct/Client');
const GifEncoder = require('gifencoder');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const Canvas = require('../../../struct/Canvas');
const frames = require('../../../assets/json/frames.json');
module.exports = class TrumpCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'trump',
      aliases: ['illegal'],
      description: 'Say everything to trump, verbs are: `is`, `are` & `am`, if no verb was provided, the default will be `is`',
      category: 'edit-images',
      cooldown: 5,
      utilisation: '{prefix}trump <verb> [text]',
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, [verb, ...args]) {
    let text = args.join(' ');
    if (text.length > 20)
      return message.inlineReply(
        'Please, insert a sentence that contains 20 characters or less.',
        {
          allowedMentions: {
            repliedUser: false,
          },
        }
      );
    const arrVerbs = ['IS', 'ARE', 'AM'];
    if (!arrVerbs.includes(verb.toUpperCase())) verb = 'IS';
    if(verb.length > 3) verb = 'IS';
    const encoder = new GifEncoder(262, 264);
    const stream = encoder.createReadStream();
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(100);
    encoder.setQuality(200);
    for (const frame of frames) {
      const image = await loadImage(
        path.join(
          process.cwd(),
          'src',
          'assets',
          'images',
          'illegal',
          frame.file
        )
      );
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      if (!frame.show) {
        encoder.addFrame(ctx);
        continue;
      }
      ctx.textBaseline = 'top';
      ctx.font = '20px Open Sans';
      const maxLength = frame.corners[1][0] - frame.corners[0][0];
      ctx.fillText(
        `${text}\n${verb.toUpperCase()} NOW\nILLEGAL`,
        frame.corners[0][0],
        frame.corners[0][1],
        maxLength
      );
      encoder.addFrame(ctx);
    }
    encoder.finish();
    const buffer = await Canvas.streamToArray(stream);
    return message.channel.send({
      files: [
        {
          attachment: Buffer.concat(buffer),
          name: 'illegal.gif',
        },
      ],
    });
  }
};
