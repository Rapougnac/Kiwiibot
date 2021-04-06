const path = require('path');
const commons = require('../../util/common');
//const { __dirname } = require('../../util/common');
const { MessageAttachment } = require('discord.js');
const Jimp = require('jimp');
let font;
let meme;
module.exports = {
    name: 'trump',
	aliases: [],
	description: '',
	category: 'Misc',
	utilisation: '{prefix}trump',
  async execute(client, message, args) {
    if (!args[0]) return message.channel.send("Put something...");
    message.channel.startTyping();
    if(!font) font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    if(!meme) meme = await Jimp.read(path.join(__dirname, "../../assets/images/TrumpApi.png"));
    const realtext = getWellText(args.join(" "), 14, 88);
    meme.rotate(7);
    meme.print(font, 670, 320, realtext, 260);
    meme.rotate(-7, false);
    meme.autocrop();
    const render = await meme.getBufferAsync(Jimp.MIME_PNG);
    const attachment = new MessageAttachment(render, "trump.png");
    await message.channel.send(attachment);
    message.channel.stopTyping();
  }
}

/**
 * Obtenez un texte avec les sauts de ligne corrects lorsqu'un seul mot dépasse la limite spécifiée.
 *
 * @param {string} text - Le texte à vérifier.
 * @param {number} maxWordLength - Longueur que le mot doit avoir avant de le diviser et de faire des sauts de ligne.
 * @param {Number} maxTextLength - Si le texte résultant est plus long que cette longueur, arrêtez la boucle.
 * @returns {String} Le texte à envoyer
 */
function getWellText(text, maxWordLength, maxTextLength = Infinity) {
  let realtext = "", post_text = "";
  for (let i = 0; i < text.length; i++) {
    if (realtext.length > maxTextLength) break;
    post_text += text[i];
    if (text[i] === " ") {
      post_text = " ";
      realtext += text[i];
      continue;
    }
    if (post_text.length > maxWordLength) {
      realtext += " " + text[i];
      post_text = " ";
    } else {
      realtext += text[i];
    }
  }
  return realtext;
}