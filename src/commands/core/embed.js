const { Client, Message, MessageEmbed, ReactionCollector, User, ReactionEmoji } = require('discord.js');
//const { Console } = require('node:console');
module.exports = {
    name: 'embedbuilder',
    aliases: ["embed"],
    description: 'Create an embed of your choice',
    category: 'Core',
    utilisation: '{prefix}embedbuilder',
    cooldown: 5,
    nsfw: false,
    ownerOnly: false,
    adminOnly: true,
    guildOnly: false,
    permissions: [],
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES"],
    string: [],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args) {
        message.delete();
        let BaseEmbed = new MessageEmbed()
            .setDescription("\u200b")
        let messageEmbedForEditing = await message.channel.send(BaseEmbed);
        const msgawait = await message.channel.send(this.string[0]);
        await Promise.all(['✏️', '💬', '🕵️', '🔻', '🔳', '🕙', '🖼️', '🌐', '🔵', '↩️', '📥', '✅', '📑', '❌'].map(x => msgawait.react(x)));
        await msgawait.edit(this.string[1]);
        /**
         * 
         * @param {ReactionEmoji} reaction 
         * @param {User} user 
         * @returns The filter of the reactions
         */
        const filterReaction = (reaction, user) => user.id === message.author.id && !user.bot;
        /**
         * 
         * @param {User} m 
         * @returns The filter of the message
         */
        const filterMessage = (m) => m.author.id === message.author.id && !m.bot;

        const collectorReaction = new ReactionCollector(msgawait, filterReaction);
        collectorReaction.on("collect", async (reaction) => {
            switch (reaction._emoji.name) {
                case "✏️":
                    let msgQuestionTitle = await message.channel.send("Quel est votre titre ?");
                    const Title = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                    const noNoWords = [Title];

                    const { content } = message;

                    for (var i = 0; i < noNoWords.length; i++) {
                        if (content.includes(noNoWords[i])) {
                            message.delete();
                        break;
                        }
                    }
                    Title.delete();
                    msgQuestionTitle.delete();
                    BaseEmbed.setTitle(Title);
                    messageEmbedForEditing.edit(BaseEmbed);
                break;

                case "💬":
                    const msgQuestionDescription = await message.channel.send("Quelle est votre description ?");
                    const Description = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                    msgQuestionDescription.delete();
                    Description.delete();
                    BaseEmbed.setDescription(Description)
                    messageEmbedForEditing.edit(BaseEmbed);
                break;

                case "🕵️":
                    const msgQuestionAuthor = await message.channel.send("Quel est le nom votre auteur ?");
                    const Author = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first()
                    await message.channel.send("Voulez-vous ajouter une image à votre auteur ?").then(async (msg) => {
                        msg.delete({ timeout: 10000 });
                        const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000);
                        if (emoji === "❌") {
                            await message.channel.send("Voulez-vous ajouter une url à votre auteur ?").then(async (m) => {
                                m.delete({ timeout: 10000 });
                                const emoji2 = await confirmation(m, message.author, ['✅', '❌'], 10000);
                                if (emoji2 === "❌") {
                                    Author.delete();
                                    BaseEmbed.setAuthor(Author);
                                    messageEmbedForEditing.edit(BaseEmbed);
                                } else if (emoji2 === "✅") {
                                    const msgQuestionUrl = await message.channel.send("Quelle est l'url de votre auteur ?");
                                    const Url = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                                    Author.delete();
                                    Url.delete();
                                    msgQuestionUrl.delete();
                                    BaseEmbed.setAuthor(Author, "", Url)
                                    messageEmbedForEditing.edit(BaseEmbed);
                                };
                            });
                        } else if (emoji === "✅") {
                            const msgQuestionImage = await message.channel.send("Quelle est l'url de votre image à ajouter ?")
                            const AuthorImage = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                            if (!(AuthorImage.includes("http") || AuthorImage.includes("https") || AuthorImage.includes("png") || AuthorImage.includes("jpg") || AuthorImage.includes("jpeg"))) return message.channel.send("fichiers png, jpg et jpeg seulement !");
                            await message.channel.send("Voulez-vous ajouter une url à votre auteur ?").then(async (mess) => {
                                mess.delete({ timeout: 10000 });
                                const emoji3 = await confirmation(mess, message.author, ['✅', '❌'], 10000);
                                if (emoji3 === "❌") {
                                    Author.delete();
                                    msgQuestionImage.delete();
                                    BaseEmbed.setAuthor(Author, AuthorImage);
                                    messageEmbedForEditing.edit(BaseEmbed);
                                } else if (emoji3 === "✅") {
                                    const msgQuestionUrl = await message.channel.send("Quelle est l'url de votre auteur ?");
                                    const Url = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                                    msgQuestionUrl.delete();
                                    Author.delete();
                                    Url.delete();
                                    //AuthorImage.delete();
                                    BaseEmbed.setAuthor(Author, AuthorImage, Url)
                                    messageEmbedForEditing.edit(BaseEmbed);
                                };
                            });
                        };
                    });
                    msgQuestionAuthor.delete();
                break;

                case "🔻":
                    const msgQuestionFooter = await message.channel.send("Quel est votre footer ?");
                    const Footer = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                    msgQuestionFooter.delete();
                    Footer.delete();
                    BaseEmbed.setFooter(Footer)
                    messageEmbedForEditing.edit(BaseEmbed);
                break;

                case "🔳":
                    const msgQuestionThumbnail = await message.channel.send("Quel est votre thumbnail ?");
                    const Thumbnail = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    if (!(Thumbnail.includes("http") || Thumbnail.includes("https") || Thumbnail.includes("png") || Thumbnail.includes("jpg") || Thumbnail.includes("jpeg"))) return message.channel.send("fichiers png, jpg et jpeg seulement !")
                    msgQuestionThumbnail.delete();
                    BaseEmbed.setThumbnail(Thumbnail)
                    messageEmbedForEditing.edit(BaseEmbed);
                break;

                case "🕙":
                    BaseEmbed.setTimestamp()
                    messageEmbedForEditing.edit(BaseEmbed);
                break;

                case "🖼️":
                    const msgQuestionImage = await message.channel.send("Quel est votre image ?");
                    const Image = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content
                    if (!(Image.includes("http") || Image.includes("https") || Image.includes("png") || Image.includes("jpg") || Image.includes("jpeg"))) return message.channel.send("fichiers png, jpg et jpeg seulement !")
                    msgQuestionImage.delete();
                    BaseEmbed.setImage(Image)
                    messageEmbedForEditing.edit(BaseEmbed);
                break;

                case "🌐":
                    const msgQuestionURL = await message.channel.send("Quel est votre url ?");
                    const url = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                    msgQuestionURL.delete();
                    url.delete();
                    BaseEmbed.setURL(url)
                    messageEmbedForEditing.edit(BaseEmbed);
                break;

                case "🔵":
                    const msgQuestionColor = await message.channel.send("Quel est votre couleur ?");
                    const color = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                    color.delete();
                    msgQuestionColor.delete();
                    BaseEmbed.setColor(color)
                    messageEmbedForEditing.edit(BaseEmbed);
                break;

                case "↩️":
                    const msgQuestionField = await message.channel.send("Quel est votre titre du field ?");
                    const titleField = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                    msgQuestionField.delete();
                    const msgQuestionFieldValue = await message.channel.send("Quel est votre value du field ?");
                    const valueField = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                    msgQuestionFieldValue.delete();
                    const msgQuestionInline = await message.channel.send("Doit-il être aligné ? (true/false)");
                    const inlineField = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                    msgQuestionInline.delete();
                    titleField.delete();
                    valueField.delete();
                    inlineField.delete();
                    BaseEmbed.addField(titleField, valueField, inlineField)
                    messageEmbedForEditing.edit(BaseEmbed);
                break;

                case "✅":
                    const msgQuestionEmbed = await message.channel.send("Merci de rentrer l'id du salon où envoyer l'embed");
                    const channel = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first();
                    msgQuestionEmbed.delete();
                    channel.delete();
                    if (!message.guild.channels.cache.get(channel)) return message.channel.send("Salon invalide");
                    else message.guild.channels.cache.get(channel).send(BaseEmbed);
                break;

                case "📥":
                    const msgQuestionEmbedCopy = await message.channel.send("Veuillez envoyer votre object d'embed");
                    const objectEmbed = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    const obj = JSON.parse(objectEmbed)
                    msgQuestionEmbedCopy.delete();
                    BaseEmbed.edit(obj);
                    messageEmbedForEditing.edit(BaseEmbed)
                    //obj.delete();
                    //message.channel.send({ embed: obj });
                break;

                case "❌":
                    msgawait.delete();
                    messageEmbedForEditing.delete();
                break;
            }
        });
    },
};

async function confirmation(message, author, validReactions, time = 60000) {
    if (!message) throw new ReferenceError('confirmation => "message" is not defined')
    if (!validReactions || validReactions.length !== 2) throw new ReferenceError('confirmation => Invalid form body [validReactions]')
    if (typeof time !== "number") throw new SyntaxError('confirmation => typeof "time" must be a number')
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return console.log(`confirmation err: Discord Client has to have "MANAGE_MESSAGES" permission.`)

    for (const reaction of validReactions) await message.react(reaction)

    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id

    return message
        .awaitReactions(filter, { max: 1, time: time })
        .then((collected) => collected.first() && collected.first().emoji.name);
}

