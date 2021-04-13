const { Client, Message, MessageEmbed, ReactionCollector, User } = require('discord.js');
const { confirmation } = require('@reconlx/discord.js')
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
    clientPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
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
        const msgawait = await message.channel.send("Veuillez patientez pendant l'ajout des réactions.");
        await Promise.all(['✏️', '💬', '🕵️', '🔻', '🔳', '🕙', '🖼️', '🌐', '🔵', '↩️', '📥', '✅', '📑'].map(x => msgawait.react(x)));
        await msgawait.edit(":pencil2: Modifier le titre\n:speech_balloon: Modifier la description\n:detective: Modifier l'auteur\n:small_red_triangle_down: Modifier le footer\n:white_square_button: Modifier le thumbnail\n:clock10: Ajouter un timestamp\n:frame_photo: Modifier l'image\n:globe_with_meridians: Modifier l'url\n:blue_circle: Modifier la couleur\n:leftwards_arrow_with_hook: Ajouter un field\n:inbox_tray: Copier un embed existant\n:white_check_mark: Envoyer l'embed\n:bookmark_tabs: Modifier un message du bot avec cet embed");

        const filterReaction = (reaction, user) => user.id === message.author.id && !user.bot;

        const filterMessage = (m) => m.author.id === message.author.id && !m.bot;

        const collectorReaction = new ReactionCollector(msgawait, filterReaction);
        collectorReaction.on("collect", async (reaction) => {
            message.delete();
            switch (reaction._emoji.name) {
                case "✏️":
                    let msgQuestionTitle = await message.channel.send("Quel est votre titre ?");
                    const Title = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    msgQuestionTitle.delete();
                    BaseEmbed.setTitle(Title);
                    messageEmbedForEditing.edit(BaseEmbed);
                    Title.delete({ timeout: 5000 });
                break;

                case "💬":
                    const msgQuestionDescription = await message.channel.send("Quelle est votre description ?");
                    const Description = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    msgQuestionDescription.delete();
                    BaseEmbed.setDescription(Description)
                    messageEmbedForEditing.edit(BaseEmbed);
                    break;

                case "🕵️":
                    const msgQuestionAuthor = await message.channel.send("Quel est le nom votre auteur ?");
                    const Author = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    await message.channel.send("Voulez-vous ajouter une image à votre auteur ?").then(async (msg) => {
                        msg.delete({ timeout: 10000 });
                        const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000);
                        if (emoji === "❌") {
                            await message.channel.send("Voulez-vous ajouter une url à votre auteur ?").then(async (m) => {
                                m.delete({ timeout: 10000 });
                                const emoji2 = await confirmation(m, message.author, ['✅', '❌'], 10000);
                                if (emoji2 === "❌") {
                                    BaseEmbed.setAuthor(Author);
                                    messageEmbedForEditing.edit(BaseEmbed);
                                } else if (emoji2 === "✅") {

                                    const msgQuestionUrl = await message.channel.send("Quelle est l'url de votre auteur ?");
                                    const Url = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
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
                                const emoji3 = await confirmation(mess, message.author, ['✅', '❌'], 10000);
                                if (emoji3 === "❌") {
                                    msgQuestionImage.delete();
                                    BaseEmbed.setAuthor(Author, AuthorImage);
                                    messageEmbedForEditing.edit(BaseEmbed);
                                } else if (emoji3 === "✅") {

                                    const msgQuestionUrl = await message.channel.send("Quelle est l'url de votre auteur ?");
                                    const Url = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                                    msgQuestionUrl.delete();
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
                    const Footer = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    msgQuestionFooter.delete();
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
                    const Image = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    if (!(Image.includes("http") || Image.includes("https") || Image.includes("png") || Image.includes("jpg") || Image.includes("jpeg"))) return message.channel.send("fichiers png, jpg et jpeg seulement !")
                    msgQuestionImage.delete();
                    BaseEmbed.setImage(Image)
                    messageEmbedForEditing.edit(BaseEmbed);
                break;

                case "🌐":
                    const msgQuestionURL = await message.channel.send("Quel est votre url ?");
                    const url = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    msgQuestionURL.delete();
                    BaseEmbed.setURL(url)
                    messageEmbedForEditing.edit(BaseEmbed);
                break;

                case "🔵":
                    const msgQuestionColor = await message.channel.send("Quel est votre couleur ?");
                    const color = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    msgQuestionColor.delete();
                    BaseEmbed.setColor(color)
                    messageEmbedForEditing.edit(BaseEmbed);
                    break;

                case "↩️":
                    const msgQuestionField = await message.channel.send("Quel est votre titre du field ?");
                    const titleField = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    msgQuestionField.delete();
                    const msgQuestionFieldValue = await message.channel.send("Quel est votre value du field ?");
                    const valueField = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    msgQuestionFieldValue.delete();
                    const msgQuestionInline = await message.channel.send("Doit-il être aligné ? (true/false)");
                    const inlineField = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    msgQuestionInline.delete();
                    BaseEmbed.addField(titleField, valueField, inlineField)
                    messageEmbedForEditing.edit(BaseEmbed);
                    break;

                case "✅":
                    const msgQuestionEmbed = await message.channel.send("Merci de rentrer l'id du salon où envoyer l'embed");
                    const channel = (await message.channel.awaitMessages(filterMessage, { max: 1, time: 60000 })).first().content;
                    msgQuestionEmbed.delete();
                    if (!message.guild.channels.cache.get(channel)) return message.channel.send("Salon invalide");
                    else message.guild.channels.cache.get(channel).send(BaseEmbed);
                break;
            }
        });
    },
};
