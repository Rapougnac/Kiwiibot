const { executionAsyncResource } = require('async_hooks');
const { constants } = require("buffer");
const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const { createInterface } = require("readline");
const { EILSEQ } = require("constants");
const fs = require("fs");
require('events').EventEmitter.prototype._maxListeners = 300;
const sql = require("sqlite");
"use strict";
const { hangman } = require('reconlx')
const thing = require('mathjs')
const maths = thing.parser()
const started = Date()
const Canvas = require('canvas')
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();
const os = require('os')
const client = new Discord.Client()
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const lyricsFinder = require("lyrics-finder");
const prefix = "m?";
const configg = require('./config/bot.js')
const queues = {}
const search = require('youtube-search')
const rb = "```"
var list = [];
const cpuStat = require("cpu-stat")
const { YTSearcher } = require('ytsearcher');
var servers = {};
const searcher = new YTSearcher({
  key: "AIzaSyCl4x1A_TgDtP2zdmWYvtUHu_DsYbysF88",
  revealed: true
});
const moment = require('moment')
require("moment-duration-format");
let beingApplied = new Set()
const Enmap = require('enmap')
let cooldown = new Set()
client.on("ready", async () => {
  //client.user.setPresence({ activity: { name: 'm?help/m?commands', type: 'PLAYING' }});
  client.user.setPresence({ activity: { name: 'm?help/m?commands', type: 'PLAYING' }, status: 'dnd' })
    .then(console.log)
    .catch(console.error);
  console.log("bot lancé");
  client.guilds.cache.find(guild => guild.id === '692311924448297011').channels.cache.find(channel => channel.id === '692313173189197824').messages.fetch('799960750684635156').then(message => {
    console.log('message ajouté à la mémoire : ' + message.content);
  }).catch(err => {
    console.log(err)
  })
});
client.db = require('./db_warns.json')
client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;

  if (message.member.hasPermission("ADMINISTRATOR")) {
    if (message.content.toLowerCase().startsWith(prefix + "ban")) {
      const args = message.content.trim().split(/ +/g)
      let mention = message.mentions.members.first();
      const member = message.mentions.members.first();
      const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
      if (mention == undefined) {
        message.reply(" Erreur : mention du membre incomplète ou inexacte.");
      }
      else {
        if (mention.bannable) {
          mention.ban();
          message.channel.send(mention.displayName + " a été(e) banni(e) par " + message.author.username + " avec succès !");
        }
        else {
          message.reply(" Impossible de bannir ce membre.");
        }
      }
      message.channels.guild.cache.find(général).send(new Discord.MessageEmbed()
        .setAuthor(`[BAN] ${member.user.tag}`, member.user.displayAvatarURL())
        .addField('Utilisateur', member, true)
        .addField('Modérateur', message.author, true)
        .addField('Raison', reason, true)
        .addField('Durée', '∞', true)

      )
    }
    else if (message.content.startsWith(prefix + "kick")) {
      let mention = message.mentions.members.first();

      if (mention == undefined) {
        message.reply("Erreur : mention du membre incomplète ou inexacte.");
      }
      else {
        if (mention.kickable) {
          mention.kick();
          message.channel.send(mention.displayName + " a été(e) kické(e) avec succès !");
        }
        else {
          message.reply(" Impossible de kicker ce membre.");
        }
      }

    }
    else if (message.content.startsWith(prefix + "mute")) {
      let mention = message.mentions.members.first();

      if (mention == undefined) {
        message.reply("Erreur : mention du membre incomplète ou inexacte.");
      }
      else {
        mention.roles.add("773948291091922955");
        mention.roles.remove("714160630264889436");
        message.reply(mention.displayName + " a été(e) mute avec succès !");
      }
    }
    else if (message.content.startsWith(prefix + "unmute")) {
      let mention = message.mentions.members.first();

      if (mention == undefined) {
        message.reply("Erreur : mention du membre incomplète ou inexacte.");
      }
      else {
        mention.roles.remove("773948291091922955");
        mention.roles.add("714160630264889436");
        message.reply(mention.displayName + " a été(e) unmute avec succès !");
      }
    }
    else if (message.content.startsWith(prefix + "tempmute")) {
      let mention = message.mentions.members.first();

      if (mention == undefined) {
        message.reply("Erreur : mention du membre incomplète ou inexacte.")
      }
      else if (message.content.startsWith(prefix + "tempmute")) {
        let mention = message.mentions.members.first();

        if (mention == undefined) {
          message.reply("Erreur : mention du membre incomplète ou inexacte.")
        }
        else {
          let args = message.content.split(" ");

          mention.roles.add("773948291091922955");
          mention.roles.remove("714160630264889436");
          setTimeout(function () {
            mention.roles.remove("773948291091922955");
            mention.roles.add("714160630264889436");
            message.channel.send("<@" + mention.id + "> tu est libéré(e) de tes chaînes à toi la liberté de flood le serveur ! ");
          }, args[2] * 1000);
        }
      }
    }
    else if (message.content.startsWith(prefix + "reload")) {
      console.clear();
      client.destroy()
      client.login('Nzc2ODI1NzQ3ODk3MzE5NDI0.X66hWw.2ntzeEcelErqsAVy_3gampZn0C0');
      message.channel.send("Reloaded :white_check_mark:");
      return;
    }
  }

  else {
    if (message.content == prefix + "ban") {
      message.reply("Hé non je ne suis pas stupide quand même ;)");
    }
    if (message.content == prefix + "mute") {
      message.reply("Hé non je ne suis pas stupide quand même ;)");
    }
    if (message.content == prefix + "kick") {
      message.reply("Hé non je ne suis pas stupide quand même ;)");
    }
    if (message.content == prefix + "tempmute") {
      message.reply("Hé non je ne suis pas stupide quand même ;)");
    }
    if (message.content == prefix + "reload") {
      message.reply("Hé non seulement pour les admins")
    }
  }
  if (message.content == prefix + "u are the best") {
    message.reply("no u :3");
  }
});

if (Number(process.version.slice(1).split(".")[0]) < 8) {
  console.log("Node 8.0.0 or higher is required. Update Node on your system.");
}
// client.on("message", message => {
//   if (message.author.bot) return;
//   const embed = new Discord.MessageEmbed()
//   if (message.content.startsWith(prefix + 'avatar')) {
//     const user = !message.mentions.users.first() ? message.author : message.mentions.users.first()
//     if (user == message.author) {
//       embed.setTitle("Votre avatar")
//     }
//     else {
//       embed.setTitle(`Avatar de ${user.tag}:`)
//     }
//     embed.setImage(user.displayAvatarURL())
//     embed.setColor("RANDOM")
//     return message.channel.send(embed)

//   }
//   // if (!user)
//   // {
//   //   if (message.content == prefix + 'avatar') {
//   //     embed.setTitle("Votre avatar")
//   //     embed.setImage(message.author.displayAvatarURL())
//   //     embed.setDescription("C'est votre avatar")
//   //     embed.setColor("RANDOM")
//   //     return message.channel.send(embed)
//   //   }
//   // }
//   // else if (message.content == prefix + 'avatar ' + `<@!${user.id}>`){
//   //   embed.setTitle(`Avatar de ${user.tag}:`)
//   //   embed.setDescription(`C'est l'avatar de ${user.tag}`)
//   //   embed.setColor('RANDOM')
//   //   embed.setImage(user.displayAvatarURL())
//   // return message.channel.send(embed)
//   // }
// });
client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase().startsWith(prefix + 'help')) {
    const embed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Commandes disponibles pour le moment :")
      .setFooter("Kiwii est un bot créé et maintenu par Rapougnac#0304")
      .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/0/09/Wiki_tan_help_me.png")
      .addField(`${prefix}u are the best`, "reply: no u :3")
      .addField(`${prefix}avatar`, "reply the user's avatar")
      .addField(`${prefix}commands`, "reply the commands module")
      .addField(`${prefix}commandsnsfw`, 'reply the nsfw commands module')
      .addField(`${prefix}xp`, "show the current user's xp")
      .addField(`${prefix}adcmds`, "reply the admin commands module")
      .addField(`${prefix}infobot`, 'show the bot infos')
      .addField(`${prefix}sexyrate`, 'shows how you\'re sexy')
      .addField(`${prefix}8ball`, 'allows you to make decisive choices')
      .addField(`${prefix}poll`, 'allow you to create a survey EX : m?poll <question> | answer A |answer B | ect ONLY WORK FOR MODS, ADMINS AND THE OWNER')
      .addField(`${prefix}trigger`, 'Trigger yourself :)')
      .addField(`${prefix}changemymind`, 'C H A N G E  Y O U R  M I N D   EX : m?changemymind <put your sentence here>')
      .addField(`${prefix}owofy`, 'Returns a owofied version of your text')
      .addField(`${prefix}cattext`, 'Returns a cattext emoji')
      .addField(`${prefix}fact`, 'Returns a random fact')
      .addField(`${prefix}spoiler`, 'Returns a message with a unique spoiler for ever text letter')
      .addField(`${prefix}why`, 'Returns a random question')
      .addField(`${prefix}serverinfo`, 'Show the server info')
      .addField(`${prefix}userinfo`, 'Show a mentionned user infos (if no mention provided it\'ll be your profile')
      .addField(`${prefix}roleinfo`, 'Infos about a role')
      .addField(`${prefix}meme`, 'Send some memes found in r/meme, r/dankmeme, r/memes')
    message.channel.send(embed);
  }
  else return;
});
client.on("message", message => {
  if (message.author.bot) return;
  if (message.member.hasPermission("ADMINISTRATOR")) {
    if (message.content.toLowerCase().startsWith(prefix + 'adcmds')) {
      const embedad = new Discord.MessageEmbed()
        .setColor("#FFFF00")
        .setTitle("Commandes admin")
        .setFooter("Kiwii est un bot créé et maintenu par Rapougnac#0304")
        .setThumbnail("https://instagram.fgva1-1.fna.fbcdn.net/v/t51.2885-15/e35/s480x480/64401107_322266778717102_2060848623411303219_n.jpg?_nc_ht=instagram.fgva1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=6X3dZcxQ7xgAX9SRyGb&tp=1&oh=5ab3181e8db6926b5fc140fb2115f92d&oe=600BD13C")
        .addField(`${prefix}ban`, "ban the mentionned person(logic lol)")
        .addField(`${prefix}kick`, "kick the mentionned person(are you starting to understand?)")
        .addField(`${prefix}mute`, "mute the mentionned person(simple no ?)")
        .addField(`${prefix}tempmute`, `tempmute the mentionned person EX: ${prefix}tempmute @User#0000 5 (seconds)`)
        .addField(`${prefix}unmute`, 'unmute the mentionned person (yaay u did it)')
        .addField(`${prefix}purge`, 'clear the messages EX: m?purge 5 (it will be 4 messages cleared + the command (m?purge)')
        .addField(`${prefix}warn`, 'warn a user EX : m?warn @User#0000 <reason>')
        .addField(`${prefix}infractions`, 'Show the infractions of a user EX :  m?infractions @User#0000')
        .addField(`${prefix}unwarn`, 'delete a warn of a user EX : m?unwarn @User#0000 <number of the infraction>')
        .addField(`${prefix}hackban`, 'hackban someone who\'s not in the server')
        .addField(`${prefix}reload`, 'Reloads the bot')
      message.channel.send(embedad)
    }
  } else {
    if (message.content.toLowerCase().startsWith(prefix + 'adcmds')) {
      message.channel.send('Erreur vous n\'avez pas les permissions requises pour afficher ce panel de commandes')
    }
  }
})
client.on("message", message => {
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
    if (message.content.toLowerCase().startsWith(prefix + "purge")) {
      let arguments = message.content.split(" ");

      if (arguments[1] == undefined) {
        message.reply("Nombre du message non ou mal défini.")
      }
      else {
        let number = parseInt(arguments[1]);

        if (isNaN(number)) {
          message.reply("C'est pas un nombre ça -_-")
        }
        else {
          message.channel.bulkDelete(number).then(messages => {
            console.log(messages.size + " messages ont étés supprimmés !")
          }).catch(err => {
            console.log("Erreur lors du clear : " + err)
          });
        }
      }
    }
  }
});
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapters = new FileSync('db_xp.json');
const db = low(adapters);

db.defaults({ histoires: [], xp: [] }).write()

client.on('message', message => {

  var msgauthor = message.author.id

  if (message.author.bot) return;

  if (!db.get("xp").find({ user: msgauthor }).value()) {
    db.get("xp").push({ user: msgauthor, xp: 1 }).write();
  } else {
    var userxpdb = db.get("xp").filter({ user: msgauthor }).find("xp").value();
    console.log(userxpdb)
    var userxp = Object.values(userxpdb)
    console.log(userxp)
    console.log(`Nombre d'xp: ${userxp[1]}`)

    db.get("xp").find({ user: msgauthor }).assign({ user: msgauthor, xp: userxp[1] += 1 }).write();

    if (message.content.toLowerCase().startsWith(prefix + "xp")) {
      var xp = db.get("xp").filter({ user: msgauthor }).find("xp").value();
      var xpfinal = Object.values(xp);
      const embed2 = new Discord.MessageEmbed()
        .setColor('#F4D03F')
        .setTitle(`Stat des XP de : ${message.author.username}`)
        .setFooter("Enjoy :p")
        .addField("XP", `${xpfinal[1]} xp`)
      message.channel.send(embed2);
    }
  }
});
client.on('message', message =>{
  const owner = client.user.tag
  if (message.author.bot) return;
  if (message.content == `${prefix}test`)
  message.reply(owner)
})
client.on("message", async message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase().startsWith(prefix + 'infobot')) {

    const client = this.client
    const guilds = client.guilds.cache.size
    const users = client.users.cache.size
    const color = 'DEFAULT'
    const owner = client.user.tag
    const duration = moment.duration(client.uptime).format(" dd[d] hh[h] mm[m] ss[s]")
    cpuStat.usagePercent(function (err, percent, seconds) {
      const embed = new Discord.MessageEmbed()
        .setColor(color)
        //.setThumbnail("https://images-ext-2.discordapp.net/external/gLz09AFgWmMbGyAk42-jFTNhVgpvG7uWDs9beywKDoA/https/cdn.discordapp.com/attachments/549244834721038348/557057944001314826/dchclth-ff495fe4-6a33-4da7-afb7-1fe2d42d7041.png?width=471&height=471")
        .setDescription(("commands:botinfo.description", { clientName: client.user.username, clientcreatedAt: moment.utc(client.user.createdAt).format("LLLL"), guildName: message.guild.name, clientUptime: moment.duration(client.uptime).format("D[d], H[h], m[m], s[s]"), clientGuildSize: Number(guilds).toLocaleString(), clientUserSize: Number(users).toLocaleString(), clientJoinedAt: moment.utc(message.guild.me.joinedAt).format("LLLL") }))
        .setFooter(("commands:createdBy", { clientName: client.user.username, owner: owner.tag }), owner.displayAvatarURL({ format: "png", dynamic: true }))
        .addField(("Prefix"), prefix, true)
        .addField(("commands:botinfo.github"), t("commands:botinfo.github-desc"), true)
      const statusEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(("commands:status.title"))
        .addField(("commands:status.version"), `\`\`\`${require("../../../package.json").version}\`\`\``, true)
        .addField(("commands:status.discord"), `\`\`\`${version}\`\`\``, true)
        .addField(("commands:status.uptime"), `\`\`\`${duration}\`\`\``, true)
        .addField(("commands:status.memory"), `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\`\`\``, true)
        .addField(("commands:status.cpu-status"), `\`\`\`${percent.toFixed(2)}%\`\`\``, true)
        .addField(("commands:status.system"), `\`\`\`${os.platform()} ${os.arch()}\`\`\``, true)
        .addField(("commands:status.cpu"), `\`\`\`${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)

      switch (args[0]) {
        case "extended": {
          message.channel.send(statusEmbed)
        }
          break
        default: {
          message.channel.send(embed).then(msg => {
            msg.react("chino_chibi:574337895838777374")

            const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "chino_chibi" && (u.id !== client.user.id && u.id === message.author.id)))
            collector.on("collect", r => {
              switch (r.emoji.name) {
                case "chino_chibi": {
                  r.remove(r.emoji.id)
                  msg.edit(statusEmbed)
                }
              }
            })
          })
        }
      }
    })
    // const embed = new Discord.MessageEmbed()
    //   .setColor("0000FF")
    //   .setTitle("Informations du bot:")
    //   .addField("Version: 3.0.4", "Before: 3.0.3")
    //   .addField("Changelogs:", "added the hackban, 8ball, poll, warn and sexyrate features :)")
    //   .addField("\u200B", "\u200B")
    //   .addField("**WARNING:**", "this bot is in beta it can contain some bugs and crashes.")
    //   .setThumbnail("https://cdn.discordapp.com/attachments/772106096713924671/787292214215835688/anime-original-brown-hair-girl-green-eyes-hd-wallpaper-preview.jpg")
    //   .addField("To access to the help commands please type", "m?help")
    //   .setFooter("Kiwii est un bot créé et maintenu par Rapougnac#0304")
    //   .setTimestamp()
    // message.channel.send(embed);

  }
  else return;
});
const snekfetch = require('snekfetch');
const superagent = require('superagent')

const nekoclient = require('nekos.life');
const neko = new nekoclient();
// Hug
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'hug')) {
    if (message.mentions.members.size === 0) {
      const GIF = await neko.sfw.hug();
      const embed = new Discord.MessageEmbed()
        .setColor('#202225')
        .setTitle(`${message.author.tag} hugged themselves`)
        .setImage(GIF.url)
      message.channel.send(embed);
    }
    const member = message.mentions.members.first();
    const GIF = await neko.sfw.hug();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} hugged ${member.user.tag}`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Kiss
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'kiss')) {
    if (message.mentions.members.size === 0) {
      const GIF = await neko.sfw.kiss();
      const embed = new Discord.MessageEmbed()
        .setColor('#202225')
        .setTitle(`${message.author.tag} kissed themsselves`)
        .setImage(GIF.url)
      message.channel.send(embed);
    }
    const member = message.mentions.members.first();
    const GIF = await neko.sfw.kiss();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} kissed ${member.user.tag}`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Pat
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'pat')) {
    if (message.mentions.members.size === 0) {
      const GIF = await neko.sfw.pat();
      const embed = new Discord.MessageEmbed()
        .setColor('#202225')
        .setTitle(`${message.author.tag} patted themsselves`)
        .setImage(GIF.url)
      message.channel.send(embed);
    }
    const member = message.mentions.members.first();
    const GIF = await neko.sfw.pat();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} patted ${member.user.tag}`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Slap
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'slap')) {
    if (message.mentions.members.size === 0) {
      const GIF = await neko.sfw.slap();
      const embed = new Discord.MessageEmbed()
        .setColor('#202225')
        .setTitle(`${message.author.tag} slapped themsselves`)
        .setImage(GIF.url)
      message.channel.send(embed);
    }
    const member = message.mentions.members.first();
    const GIF = await neko.sfw.slap();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} slapped ${member.user.tag}`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Tickle
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'tickle')) {
    if (message.mentions.members.size === 0) {
      const GIF = await neko.sfw.tickle();
      const embed = new Discord.MessageEmbed()
        .setColor('#202225')
        .setTitle(`${message.author.tag} tickled themsselves`)
        .setImage(GIF.url)
      message.channel.send(embed);
    }
    const member = message.mentions.members.first();
    const GIF = await neko.sfw.tickle();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} tickled ${member.user.tag}`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Poke
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'poke')) {
    if (message.mentions.members.size === 0) {
      const GIF = await neko.sfw.poke();
      const embed = new Discord.MessageEmbed()
        .setColor('#202225')
        .setTitle(`${message.author.tag} poked themsselves`)
        .setImage(GIF.url)
      message.channel.send(embed);
    }
    const member = message.mentions.members.first();
    const GIF = await neko.sfw.poke();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} poked ${member.user.tag}`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Cuddle
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'cuddle')) {
    if (message.mentions.members.size === 0) {
      const GIF = await neko.sfw.cuddle();
      const embed = new Discord.MessageEmbed()
        .setColor('#202225')
        .setTitle(`${message.author.tag} cuddled themsselves`)
        .setImage(GIF.url)
      message.channel.send(embed);
    }
    const member = message.mentions.members.first();
    const GIF = await neko.sfw.cuddle();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} cuddled ${member.user.tag}`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Feed
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'feed')) {
    if (message.mentions.members.size === 0) {
      const GIF = await neko.sfw.feed();
      const embed = new Discord.MessageEmbed()
        .setColor('#202225')
        .setTitle(`${message.author.tag} feeded themsselves`)
        .setImage(GIF.url)
      message.channel.send(embed);
    }
    const member = message.mentions.members.first();
    const GIF = await neko.sfw.feed();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} feeded ${member.user.tag}`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Cat
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'cat')) {
    if (message.content.includes("cattext")) return undefined;
    const GIF = await neko.sfw.meow();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random cat image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Dog
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'dog')) {
    const GIF = await neko.sfw.woof();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random dog image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Goose
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'goose')) {
    const GIF = await neko.sfw.goose();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random goose image`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Smug
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'smug')) {
    const GIF = await neko.sfw.smug();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random smug image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Baka
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'baka')) {
    // const GIF = await neko.sfw.baka();
    // const embed = new Discord.MessageEmbed()
    //   .setColor('#202225')
    //   .setTitle(`${message.author.tag} here's a random baka image/gif`)
    //   .setImage(GIF.url)
    // message.channel.send(embed);

    if (message.mentions.members.size === 0) {
      const GIF = await neko.sfw.baka();
      const embed = new Discord.MessageEmbed()
        .setColor('#202225')
        .setTitle(`${message.author.tag} said baka to him/herself`)
        .setImage(GIF.url)
      message.channel.send(embed);
    }
    const member = message.mentions.members.first();
    const GIF = await neko.sfw.baka();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} said baka to ${member.user.tag}`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Neko
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'neko')) {
    if (message.content.includes("nekogif")) return undefined;
    const GIF = await neko.sfw.neko();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random neko image`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// NekoGIF
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'nekogif')) {
    const GIF = await neko.sfw.nekoGif();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random neko gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Lizard
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'lizard')) {
    const GIF = await neko.sfw.lizard();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random lizard image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// FoxGirl
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase().startsWith(prefix + 'foxgirl')) {
    const GIF = await neko.sfw.foxGirl();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random foxgirl image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Holo
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'holo')) {
    const GIF = await neko.sfw.holo();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random holo image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Wallpaper
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'wallpaper')) {
    const GIF = await neko.sfw.wallpaper();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random wallpaper`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Gecg
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'gecg')) {
    const GIF = await neko.sfw.gecg();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random genetically engineered catgirl image`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Avatar
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'anime avatar')) {
    const GIF = await neko.sfw.avatar();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random anime avatar`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Waifu
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'waifu')) {
    const GIF = await neko.sfw.waifu();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random waifu image`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// OwOfy
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'owofy')) {
    const owoTEXT = await neko.sfw.OwOify({ text: message.content.split(' ').slice(1).join(' ') });
    message.channel.send(owoTEXT.owo);
  }
});

// CatText
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'cattext')) {
    const catTEXT = await neko.sfw.catText();
    message.channel.send(catTEXT.cat);
  }
});

// Fact
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'fact')) {
    const factTEXT = await neko.sfw.fact();
    message.channel.send(factTEXT.fact);
  }
});

// Spoiler
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'spoiler')) {
    const spoilerTEXT = await neko.sfw.spoiler({ text: message.content.split(' ').slice(1).join(' ') });
    message.channel.send(spoilerTEXT.owo);
  }
});

// Why
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'why')) {
    const whyTEXT = await neko.sfw.why();
    message.channel.send(whyTEXT.why);
  }
});

// Pussy
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.endsWith(prefix + 'pussy')) {
    if (message.content.includes("pussywankgif")) return undefined;
    if (message.content.includes("pussyart")) return undefined;
    const GIF = await neko.nsfw.pussy();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random pussy image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Lesbian
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'lesbian')) {
    const GIF = await neko.nsfw.lesbian();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random lesbian image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Cumsluts
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'cumsluts')) {
    const GIF = await neko.nsfw.cumsluts();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random cumsluts image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Boobs
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'boobs')) {
    const GIF = await neko.nsfw.boobs();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random boobs image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Blowjob
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'blowjob')) {
    const GIF = await neko.nsfw.bJ();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random blowjob image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Anal
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'anal')) {
    const GIF = await neko.nsfw.anal();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random anal image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Trap
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'trap')) {
    const GIF = await neko.nsfw.trap();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random trap image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Tits
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'tits')) {
    const GIF = await neko.nsfw.tits();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random tits image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Spank
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'spank')) {
    const GIF = await neko.nsfw.spank();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random spanking image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Cumart
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'cumart')) {
    const GIF = await neko.nsfw.cumArts();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random cumart image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Femdom
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'femdom')) {
    const GIF = await neko.nsfw.femdom();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random femdom image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Yuri
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'yuri')) {
    const GIF = await neko.nsfw.yuri();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random yuri image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Avatar
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'nsfwavatar')) {
    const GIF = await neko.nsfw.avatar();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random nsfw avatar`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// HentaiGIF
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'hentaigif')) {
    const GIF = await neko.nsfw.randomHentaiGif();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random hentai gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// NekoGIF
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'nsfwnekogif')) {
    const GIF = await neko.nsfw.nekoGif();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random nsfw neko gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Neko
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'nsfwneko')) {
    if (message.content.includes("nsfwnekogif")) return undefined;
    const GIF = await neko.nsfw.neko();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random nsfw neko image`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Kuni
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'cuni')) {
    const GIF = await neko.nsfw.kuni();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random kuni image`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// GirlSolo
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'girlsolo')) {
    if (message.content.includes("girlsologif")) return undefined;
    const GIF = await neko.nsfw.girlSolo();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random solo girl image`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// GirlSoloGIF
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'girlsologif')) {
    const GIF = await neko.nsfw.girlSoloGif();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random solo girl gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// PussyWankGIF
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.endsWith(prefix + 'pussywank')) {
    const GIF = await neko.nsfw.pussyWankGif();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random pussy wank gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Pussyart
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'pussyart')) {
    const GIF = await neko.nsfw.pussyArt();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random pussyart image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Kitsune
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'kitsune')) {
    const GIF = await neko.nsfw.kitsune();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random kitsune image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Hentai
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'hentai')) {
    if (message.content.includes("hentaigif")) return undefined;
    const GIF = await neko.nsfw.hentai();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random hentai image`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});
// Futanari
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'futanari')) {
    const GIF = await neko.nsfw.futanari();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random futanari image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Keta
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'keta')) {
    const GIF = await neko.nsfw.keta();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random keta image/gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Gasm
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'gasm')) {
    const GIF = await neko.nsfw.gasm();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random orgasm image`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// FeetGIF
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'feetgif')) {
    const GIF = await neko.nsfw.feetGif();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random feet gif`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});

// Feet
client.on('message', async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'feet')) {
    if (message.content.includes("feetgif")) return undefined;
    const GIF = await neko.nsfw.feet();
    const embed = new Discord.MessageEmbed()
      .setColor('#202225')
      .setTitle(`${message.author.tag} here's a random feet image`)
      .setImage(GIF.url)
    message.channel.send(embed);
  }
});
//r34
// client.on('message', message => {
//   if (message.author.bot) return;
//   if (message.content.startsWith(prefix + 'r34')) {
//     const https = require("https");
//     const xml2js = require("xml2js");
//     const args = message.content.trim().split(/ +/g)

//     try {
//       var argR = "";
//       if (message.channel.nsfw) {
//         if (args[0] != undefined) {
//           argR = args;
//         }

//         var url = "https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=" + argR;
//         console.log(url);
//         https.get(url, function (res) {
//           var body = "";

//           res.on("data", function (chunk) {
//             body += chunk;
//           });

//           res.on("end", function () {
//             var parser = new xml2js.Parser();
//             parser.parseString(body, function (err, result) {
//               var postCount = result.posts.$.count - 1;
//               if (postCount > 100) {
//                 postCount = 100;
//               }
//               if (postCount > 0) {
//                 var picNum = Math.floor(Math.random() * postCount) + 0;
//                 var r34Pic = result.posts.post[picNum].$.file_url;
//                 // console.log(result.posts.post[picNum].$.file_url);
//                 message.channel.send({
//                   files: [r34Pic]
//                 });

//               } else {
//                 console.log("Nothing found:", argR);
//                 message.channel.send("Nobody here but us chickens!");
//               }

//             });
//           });
//         }).on("error", function (e) {
//           console.log("Got an error: ", e);
//         });
//       } else {
//         message.channel.send(":warning: This channel is not NSFW!");
//       }
//     } catch (e) {
//       console.log(e);

//     }
//   }
// });
// Commands
client.on('message', async message => {
  if (message.content.endsWith(prefix + 'commands')) {
    const embed = new Discord.MessageEmbed()
      .setColor('#00FF00')
      .setTitle('Safe For Work - Commands')
      .addField(prefix + 'help', 'Returns a help module', true)
      .addField(prefix + 'hug', 'Hug a user', true)
      .addField(prefix + 'kiss', 'Kiss a user', true)
      .addField(prefix + 'pat', 'Pat a user', true)
      .addField(prefix + 'slap', 'Slap a user', true)
      .addField(prefix + 'tickle', 'Tickle a user', true)
      .addField(prefix + 'poke', 'Poke a user', true)
      .addField(prefix + 'cuddle', 'Cuddle a user', true)
      .addField(prefix + 'feed', 'Feed a user', true)
      .addField(prefix + 'cat', 'Returns a cat image/gif', true)
      .addField(prefix + 'dog', 'Returns a dog image/gif', true)
      .addField(prefix + 'goose', 'Returns a goose image', true)
      .addField(prefix + 'smug', 'Returns a smug image/gif', true)
      .addField(prefix + 'baka', 'Returns a baka image/gif', true)
      .addField(prefix + 'neko', 'Returns a neko image', true)
      .addField(prefix + 'nekogif', 'Returns a neko gif', true)
      .addField(prefix + 'lizard', 'Returns a lizard image/gif', true)
      .addField(prefix + 'foxgirl', 'Returns a foxgirl image/gif', true)
      .addField(prefix + 'holo', 'Returns a holo image/gif', true)
      .addField(prefix + 'wallpaper', 'Returns a wallpaper', true)
      .addField(prefix + 'gecg', 'Returns a genetically genetically engineered catgirl image', true)
      .addField(prefix + 'anime avatar', 'Returns an anime avatar', true)
      .addField(prefix + 'waifu', 'Returns a waifu image/gif', true)
      .setFooter("Kiwii est un bot créé et maintenu par Rapougnac#0304")
    message.channel.send(embed);
  }
  if (message.content.startsWith(prefix + 'commandsnsfw')) {
    const embed3 = new Discord.MessageEmbed()
      .setColor('#FFC0CB')
      .setTitle('Not Safe For Work - Commands')
      .addField(prefix + 'pussy', 'Returns a pussy image/gif', true)
      .addField(prefix + 'lesbian', 'Returns a lesbian image/gif', true)
      .addField(prefix + 'cumsluts', 'Returns a cumsluts image/gif', true)
      .addField(prefix + 'boobs', 'Returns a boobs image/gif', true)
      .addField(prefix + 'blowjob', 'Returns a blowjob image/gif', true)
      .addField(prefix + 'anal', 'Returns a anal image/gif', true)
      .addField(prefix + 'trap', 'Returns a trap image/gif', true)
      .addField(prefix + 'tits', 'Returns a tits image/gif', true)
      .addField(prefix + 'spank', 'Returns a spank image/gif', true)
      .addField(prefix + 'cumart', 'Returns a cumart image/gif', true)
      .addField(prefix + 'femdom', 'Returns a femdom image/gif', true)
      .addField(prefix + 'yuri', 'Returns a yuri image/gif', true)
      .addField(prefix + 'nsfwavatar', 'Returns an nsfw avatar', true)
      .addField(prefix + 'hentaigif', 'Returns a hentai gif', true)
      .addField(prefix + 'hentai', 'Returns a hentai image', true)
      .addField(prefix + 'nsfwnekogif', 'Returns a nsfw neko gif', true)
      .addField(prefix + 'nsfwneko', 'Returns a nsfw neko image', true)
      .addField(prefix + 'cuni', 'Returns a cuni image', true)
      .addField(prefix + 'girlsolo', 'Returns a girlsolo image', true)
      .addField(prefix + 'girlsologif', 'Returns a girlsolo gif', true)
      .addField(prefix + 'pussywank', 'Returns a pussywank gif', true)
      .addField(prefix + 'pussyart', 'Returns a pussyart image/gif', true)
      .addField(prefix + 'kitsune', 'Returns a kitsune image/gif', true)
      .addField(prefix + 'futanari', 'Returns a futanari image/gif', true)
      .addField(prefix + 'keta', 'Returns a keta image/gif', true)
      .addField(prefix + 'gasm', 'Returns a gasm image', true)
      .addField(prefix + 'feetgif', 'Returns a feet gif', true)
      .addField(prefix + 'feet', 'Returns a feet image', true)
      .addField(prefix + 'loli', 'chotto mate ! that\'s illegal !', true)
      .addField(prefix + 'panties', 'Returns a pantsu image', true)
      .addField(prefix + 'school', 'Return a hentai image in a school', true)
      .addField(prefix + 'feetgif', 'Returns a feet gif', true)
      .addField(prefix + 'feet', 'Returns a feet image', true)
      .addField(prefix + 'loli', 'chotto mate ! that\'s illegal !', true)
      .addField(prefix + 'panties', 'Returns a pantsu image')
      .addField(prefix + 'school', 'Returns a hentai image in a school', true)
      .addField(prefix + 'tentacles', 'Returns a tentacles image', true)
      .addField(prefix + 'tighs', 'Returs a thighs image', true)
      .addField(prefix + 'ub', 'JUST DON\'T', true)
      .addField(prefix + 'uniform', 'Returns an image w/ girls w/ uniforms', true)
      .addField(prefix + 'zettai', 'Return a image by zettai', true)
      .addField(prefix + 'ass', 'If u need some ass', true)
      .addField(prefix + 'glasses', 'Why not ?', true)
      .addField(prefix + 'bdsm', 'That\'s your fetishes', true)
      .addField(prefix + 'doujin', 'Yeah a random page of a random doujin', true)
      .addField(prefix + 'gifs', 'Hentai but animated :)', true)
      .addField(prefix + 'netorare', 'Well no...', true)
      .addField(prefix + 'maid', 'Y E S  maids', true)
      .addField(prefix + 'masturbation', 'Returns a masturbation image', true)
      .addField(prefix + 'orgy', 'It\'s just an orgy', true)
    const embed2 = new Discord.MessageEmbed()
      .setColor('#FFC0CB')
      .addField(prefix + 'gasm', 'Returns a gasm image', true)
      .addField(prefix + 'feetgif', 'Returns a feet gif', true)
      .addField(prefix + 'feet', 'Returns a feet image', true)
      .addField(prefix + 'loli', 'chotto mate ! that\'s illegal !', true)
      .addField(prefix + 'panties', 'Returns a pantsu image', true)
      .addField(prefix + 'school', 'Return a hentai image in a school', true)
      .addField(prefix + 'feetgif', 'Returns a feet gif', true)
      .addField(prefix + 'feet', 'Returns a feet image', true)
      .addField(prefix + 'loli', 'chotto mate ! that\'s illegal !', true)
      .addField(prefix + 'panties', 'Returns a pantsu image')
      .addField(prefix + 'school', 'Returns a hentai image in a school', true)
      .addField(prefix + 'tentacles', 'Returns a tentacles image', true)
      .addField(prefix + 'tighs', 'Returs a thighs image', true)
      .addField(prefix + 'ub', 'JUST DON\'T', true)
      .addField(prefix + 'uniform', 'Returns an image w/ girls w/ uniforms', true)
      .addField(prefix + 'zettai', 'Return a image by zettai', true)
      .addField(prefix + 'ass', 'If u need some ass', true)
      .addField(prefix + 'glasses', 'Why not ?', true)
      .addField(prefix + 'bdsm', 'That\'s your fetishes', true)
      .addField(prefix + 'doujin', 'Yeah a random page of a random doujin', true)
      .addField(prefix + 'gifs', 'Hentai but animated :)', true)
      .addField(prefix + 'netorare', 'Well no...', true)
      .addField(prefix + 'maid', 'Y E S  maids', true)
      .addField(prefix + 'masturbation', 'Returns a masturbation image', true)
      .addField(prefix + 'orgy', 'It\'s just an orgy', true)
    message.channel.send(embed3);
    message.channel.send(embed2);
  }
});
const { Player } = require('discord-player');

client.player = new Player(client);
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.command = new Discord.Collection();

fs.readdirSync('./command').forEach(dirs => {
  const commandss = fs.readdirSync(`./command/${dirs}`).filter(files => files.endsWith('.js'));

  for (const file of commandss) {
    const commands = require(`./command/${dirs}/${file}`);
    console.log(`Loading command ${file}`);
    var test = commands.name.toLowerCase();
    client.commands.set(test, commands);
  };
});
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
  console.log(`Loading discord.js event ${file}`);
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
  console.log(`Loading discord-player event ${file}`);
  const event = require(`./player/${file}`);
  client.player.on(file.split(".")[0], event.bind(null, client));
};
client.db = require('./db_warns.json')
client.command = new Discord.Collection()
client.on('ready', async () => {
  console.log('ahas')
});
/*fs.readdir('./commands', (err, files) => {
  if (err) throw err
  files.forEach(file => {
      if (!file.endsWith('.js')) return
      const command = require(`./commands/${file}`)
      console.log(`Loading command ${file}`);
      client.commands.set(command.name, command)
  })
})*/
client.on('message', message => {
  if (message.author.bot) return;
  const mention = message.mentions.members.first();
  if (message.content.startsWith(prefix + '8ball')) {
    const mention = message.mentions.members.first();
    const args = message.content.trim().split(/\s+/g)
    const question = message.content.split(prefix + '8ball')[1]
    if (message.content.endsWith(prefix + '8ball')) return message.channel.send('Veuillez indiquer une question.')
    const replies = ['Oui', 'Non', 'Peut être', 'Evidemment', "Pas sûr", "Que nenni !", "Bien sûr !", "Non connard !", "JAMAIS", "Non parce que je t'aimes pas :)", 'Je ne sais pas', 'Ça tombe sous le sens', 'Je regrette mais non', 'Oui, ça me paraît logique', 'Non désolé t\'es trop moche', 'Jamais de la vie', 'LOL tu crois quoi bien sûr que non', 'C\'est une possibilité', 'Alors ça non']
    const embed8 = new Discord.MessageEmbed()
      .setThumbnail('https://cdn.discordapp.com/attachments/692311925098414134/793453658184220692/pngegg.png')
      .setColor('RANDOM')
      .addField(`**Question**`, `${question}`, false)
      .addField(`**Réponse**`, `${replies[Math.floor(Math.random() * replies.length)]}`, false)
    message.channel.send(embed8)
  }
});
client.on('message', message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'infractions')) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
    const member = message.mentions.members.first()
    if (!member) return message.channel.send('Veuillez mentionner le membre dont voir les warns.')
    if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn.')
    const embedinf = new Discord.MessageEmbed()
      .setDescription(`**Total de warns :** ${client.db.warns[member.id].length}\n\n__**10 derniers warns**__\n\n${client.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`)
    message.channel.send(embedinf)
  }
})
client.on('message', message => {
  if (message.author.bot) return;
  const args = message.content.trim().split(/\s+/g)
  if (message.content.startsWith(prefix + 'warn')) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
    const member = message.mentions.members.first()
    if (!member) return message.channel.send('Veuillez mentionner le membre à warn.')
    if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn le propriétaire du serveur.')
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn ce membre.')
    const reason = message.content.split(prefix + 'warn ' + args[1])[1]
    if (!reason) return message.channel.send('Veuillez indiquer une raison.')
    if (!client.db.warns[member.id]) client.db.warns[member.id] = []
    client.db.warns[member.id].unshift({
      reason,
      date: Date.now(),
      mod: message.author.id
    })
    fs.writeFileSync('./db_warns.json', JSON.stringify(client.db))
    const embedwar = new Discord.MessageEmbed()
      .setTitle(`**${member.user.tag}**`)
      .addField(`**Utilisateur**`, `${member}`, true)
      .addField(`**Mod**`, `${message.author}`, true)
      .addField(`**Raison**`, `${reason}`, true)
    message.channel.send(embedwar)
    //message.channel.send(`${member} a été warn pour la raison : ${reason} !`)
  }
})
client.on('message', message => {
  if (message.author.bot) return;
  const args = message.content.trim().split(/ +/g)
  if (message.content.startsWith(prefix + 'unwarn')) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
    const member = message.mentions.members.first()
    if (!member) return message.channel.send('Veuillez mentionner le membre à unwarn.')
    if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn.')
    const warnIndex = args[2] - 1
    if (warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.channel.send('Ce warn n\'existe pas.')
    const { reason } = client.db.warns[member.id].splice(warnIndex, 1)[0]
    if (!client.db.warns[member.id].length) delete client.db.warns[member.id]
    fs.writeFileSync('./db_warns.json', JSON.stringify(client.db))
    message.channel.send(`${member} a été unwarn pour ${reason} !`)
  }
})
client.on("message", message => {
  if (message.author.bot) return;
  const sexyrate = Math.floor(Math.random() * 100)
  const user = !message.mentions.users.first() ? message.author : message.mentions.users.first()
  const embed = new Discord.MessageEmbed()
  if (message.content.startsWith(prefix + 'sexyrate')) {
    if (user == message.author) {
      embed.addField(':heart_decoration: Sexy Rate :heart_decoration: ', `I rate you a ${sexyrate} out of 100 on the sexy scale`)
    }
    else {
      embed.addField(`:heart_decoration: Sexy Rate :heart_decoration: `, `I rate ${user.tag} rated ${sexyrate} out of 100 on the sexy scale`)
    }
    return message.channel.send(embed);
  }
  // const member = message.mentions.members.first();
  // if (message.content.endsWith(prefix + 'sexyrate ' + member)) {
  //   const sexyrate = Math.floor(Math.random() * 100)
  //   const embed = new Discord.MessageEmbed()
  //     .setColor('#202225')
  //     .addField(':heart_decoration: Sexy Rate :heart_decoration: ', `I rate ${member.user.tag} rated ${sexyrate} out of 100 on the sexy scale`)
  //   message.channel.send(embed);
  // }
});
client.on('message', async message => {
  const reactions = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻']
  if (message.author.bot) return;
  const args = message.content.trim().split(/ +/g)
  if (message.content.startsWith(prefix + 'poll')) {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
    const choices = args.join(' ').split(' | ').slice(1)
    const question = args.slice(1).join(' ').split('|')[0]

    if (!question) return message.channel.send('Veuillez indiquer la question à poser.')
    if (!choices.length) return message.channel.send('Veuillez indiquer au moins 1 choix.')
    if (choices.length > 20) return message.channel.send('Il ne peut pas y avoir plus de 20 choix.')
    message.delete()
    const sent = await message.channel.send(new Discord.MessageEmbed()
      .setTitle(question)
      .setDescription(choices.map((choice, i) => `${reactions[i]} ${choice}`).join('\n\n')))
    for (i = 0; i < choices.length; i++) await sent.react(reactions[i])
  }
})
client.on('message', message => {
  const args = message.content.trim().split(/ +/g)
  const member = message.mentions.members.first() || message.member
  if (message.author.bot) return;
  if (message.content.toLowerCase().startsWith(prefix + 'userinfo') || message.content.toLowerCase().startsWith(prefix + 'ui')) {
    const embeduser = new Discord.MessageEmbed()
      .addField('Membre', member, true)
      .addField('Tag', member.user.tag, true)
      .addField('Date de création du compte', moment(member.user.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Date d\'arrivée sur le serveur', moment(member.joinedAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Date de début de boost', member.premiumSince ? moment(member.premiumSince).format('[Le] DD/MM/YYYY [à] HH:mm:ss') : 'Ne boost pas', true)
      .addField('Infractions', client.db.warns[member.id] ? client.db.warns[member.id].length : 'Aucune', true)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(`ID : ${member.id}`)
    message.channel.send(embeduser)
  }
});
client.on('message', message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase().startsWith(prefix + 'roleinfo') || message.content.toLowerCase().startsWith(prefix + 'ri')) {
    const role = message.mentions.roles.first()
    if (!role) return message.channel.send('Veuillez mentionner le rôle dont vous voulez voir les infos.')
    message.channel.send(new Discord.MessageEmbed()
      .addField('Rôle', role, true)
      .addField('Membres le possédant', role.members.size, true)
      .addField('Couleur', role.hexColor, true)
      .addField('Date de création', moment(role.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Affiché séparément', role.hoist ? 'Oui' : 'Non', true)
      .addField('Mentionnable', role.mentionable ? 'Oui' : 'Non', true)
      .setFooter(`ID : ${role.id}`)
      .setColor(role.hexColor))
  }
});
client.on('message', message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase().startsWith(prefix + 'serverinfo') || message.content.toLowerCase().startsWith(prefix + 'si')) {
    const embedserv = new Discord.MessageEmbed()
      .addField('Nom', message.guild.name, true)
      .addField('Région', message.guild.region, true)
      .addField('Membres', `${message.guild.memberCount} membres\n${message.guild.members.cache.filter(member => !member.user.bot).size} humains\n${message.guild.members.cache.filter(member => member.user.bot).size} bots`, true)
      .addField('Salons', `${message.guild.channels.cache.size} salons\n${message.guild.channels.cache.filter(channel => channel.type === 'text').size} salons textuels\n${message.guild.channels.cache.filter(channel => channel.type === 'voice').size} salons vocaux\n${message.guild.channels.cache.filter(channel => channel.type === 'category').size} catégories`, true)
      .addField('Emojis', `${message.guild.emojis.cache.size} emojis\n${message.guild.emojis.cache.filter(emoji => !emoji.animated).size} emojis statiques\n${message.guild.emojis.cache.filter(emoji => emoji.animated).size} emojis animés`, true)
      .addField('Rôles', message.guild.roles.cache.size, true)
      .addField('Propriétaire', message.guild.owner, true)
      .addField('Date de création', moment(message.guild.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
      .addField('Nitro boost', `Tier : ${message.guild.premiumTier}\nNombre de boosts : ${message.guild.premiumSubscriptionCount}`, true)
      .setFooter(`ID : ${message.guild.id}`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setImage(message.guild.bannerURL())
    message.channel.send(embedserv)
  }
});
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase().startsWith(prefix + 'hackban') || message.content.toLowerCase().startsWith(prefix + 'hb')) {

    if (!message.member.hasPermission("BAN_MEMBERS")) {

      return message.channel.send("Quelque chose c'est mal passé tu as besoin de la permission : (BAN_MEMBERS)");

    }
    const args = message.content.trim().split(/ +/g)

    let userID = args[1];

    let reason = args.slice(2).join(" ");


    if (!userID) return message.channel.send("Merci de rentrer une id valide");

    if (isNaN(userID)) return message.channel.send("L'id doit être un nombre");

    if (userID === message.author.id) return message.channel.send("Vous ne pouvez pas vous bannir vous même.");

    if (userID === client.user.id) return message.channel.send("Tu ne peux pas me bannir.. en plus pourquoi le ferais-tu ?");


    if (!reason) reason = "No reason provided";


    client.users.fetch(userID).then(async user => {

      await message.guild.members.ban(user.id, { reason: reason });

      return message.channel.send(`**${user.tag}** a été banni du serveur.`);

    }).catch(error => {
      return message.channel.send(`Une erreur est survenue: **${error}**`);
    })
  }
});
client.on('message', async message => {
  const canva = require('canvacord');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'trigger')) {
    const args = message.content.trim().split(/ +/g)
    const avatar = message.author.displayAvatarURL({ dynamic: false, format: "png" });

    const image = await canva.Canvas.trigger(avatar);

    const triggered = new Discord.MessageAttachment(image, "triggered.gif")

    message.channel.send(triggered);
  }
});
client.on('message', async message => {
  const canva = require('canvacord');
  const { changemymind } = require('canvacord');
  const args = message.content.trim().split(/ +/g)
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'changemymind')) {


    const text = message.content.split(prefix + 'changemymind')[1]

    if (!args[0]) return message.channel.send('Veuillez mettre un texte valide');

    const image = await canva.Canvas.changemymind(text);

    const changeMyMind = new Discord.MessageAttachment(image, "cmm.png")

    message.channel.send(changeMyMind);
  }
});
// client.on('message', message => {
//   if (message.author.bot) return;
//   if (message.content.startsWith(prefix + 'say')) {
//     const args = message.content.trim().split(/ +/g)
//     let msg;
//     const textChannel = message.mentions.channels.first()
//     message.delete()

//     if (textChannel) {
//       msg = args.slice(0).join(" ");
//       textChannel.send(msg)
//     } else {
//       msg = args.slice(0).join(" ");
//       message.channel.send(msg)
//     }
//   }
// });
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'say')) {
    const args = message.content.trim().substring(prefix.length).split(/ +/g);
    const botmessage = args.join(" ").slice(0).slice(1).slice(2);
    message.delete().catch();
    message.channel.send(botmessage)

  }
});
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'meme')) {
    const randomPuppy = require('random-puppy');
    const args = message.content.trim().substring(prefix.length).split(/ +/g);
    const subReddits = ["dankmemes", "meme", "memes"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)]

    const img = await randomPuppy(random);

    const memeEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setImage(img)
      .setTitle(`Your meme. From r/${random}`)
      .setURL(`https://reddit.com/r/${random}`)

    message.channel.send(memeEmbed);
  }
});
// client.on('message', async message => {
//   const akaneko = require('akaneko');
//   if (message.author.bot) return;
//   if (message.content.startsWith(prefix + 'loli')) {
//     const emebed = new Discord.MessageEmbed()
//       .setTitle(`${message.author.tag} here some lolis`)
//       .setImage(await akaneko.nsfw.loli());
//     message.channel.send(emebed);
//   }
// });
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'panties')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some panties`)
      .setImage(await akaneko.nsfw.panties());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'school')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some school uniforms :)`)
      .setImage(await akaneko.nsfw.school());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'tentacles')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some tentacles (I don't judge you but...)`)
      .setImage(await akaneko.nsfw.tentacles());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'tighs')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some tighs (this is great)`)
      .setImage(await akaneko.nsfw.thighs());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'ub')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some ugly bastard (WHYYYY ????)`)
      .setImage(await akaneko.nsfw.uglyBastard());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'uniform')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some uniforms (Military, Konbini, Work, Nurse Uniforms, etc!~ Sexy~)`)
      .setImage(await akaneko.nsfw.uniform());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'zettai')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some zettaiRyouiki (That one part of the flesh being squeeze in thigh-highs~<3)`)
      .setImage(await akaneko.nsfw.zettaiRyouiki());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'glasses')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some glasses (I'm a bot but I'm horny...)`)
      .setImage(await akaneko.nsfw.glasses());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'ass')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some ass (T H I C C)`)
      .setImage(await akaneko.nsfw.ass());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'bdsm')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some bdsm (I will leave you with your weird delusions)`)
      .setImage(await akaneko.nsfw.bdsm());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'doujin')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some doujin (hanime is better)`)
      .setImage(await akaneko.nsfw.doujin());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'gifs')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some gifs (Basically an animated image, so yes :3)`)
      .setImage(await akaneko.nsfw.gifs());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'netorare')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some netorare (Wow, I won't even question your fetishes.)`)
      .setImage(await akaneko.nsfw.netorare());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'maid')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some maids (Maids, Maid Uniforms, etc, you know what maids are :3)`)
      .setImage(await akaneko.nsfw.maid());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'masturbation')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some masturbstion (Solo Queue in CSGO!)`)
      .setImage(await akaneko.nsfw.masturbation());
    message.channel.send(emebed);
  }
});
client.on('message', async message => {
  const akaneko = require('akaneko');
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'orgy')) {
    const emebed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} here some orgy (An orgy of food sure :))`)
      .setImage(await akaneko.nsfw.orgy());
    message.channel.send(emebed);
  }
});
// client.on('message', message => {
//   if(message.author.bot)return;
//   if(message.content.startsWith(prefix + 'death')){
//   let user;
//   if (message.mentions.users.first()) {
//     user = message.mentions.users.first().username;
//   } else {
//     return message.channel.send("You need to mention a user.");
//   }
//   let Image = Canvas.Image,
//     canvas = new Canvas(520, 283),
//     ctx = canvas.getContext('2d');
//   fs.readFile('./images/death.png', (err, image) => {
//     if (err) return console.log(err);
//       let img = new Image
//       img.src = image;
//       ctx.drawImage(img, 0, 0, 520, 283);
//       ctx.font = "18px Papyrus";
//       ctx.fillText(user, 275, 80)
//       canvas.toBuffer((err, buff) => {
//         if (err) return console.log(err);
//         message.channel.send("**" + message.author.username + "** *has added*  **" + user + "** *to their death note*")
//         message.channel.sendFile(buff)
//       })
//   })
// }
// })
/*
If you want to make discord-economy guild based you have to use message.author.id + message.guild.id as ID for example:
eco.Daily(message.author.id + message.guild.id)
 
This will create a unique ID for each guild member
*/

const eco = require("discord-economy");


//Whenever someone types a message this gets activated.
//(If you use 'await' in your functions make sure you put async here)
client.on('message', async message => {

  //This reads the first part of your message behind your prefix to see which command you want to use.
  const command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];

  //These are the arguments behind the commands.
  const args = message.content.split(' ').slice(1);

  //If the message does not start with your prefix return.
  //If the user that types a message is a bot account return.
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (command === 'balance') {

    var output = await eco.FetchBalance(message.author.id)
    message.channel.send(`Hey ${message.author.tag}! Tu as actuellement ${output.balance} coins.`);
  }

  if (command === 'daily') {

    var output = await eco.Daily(message.author.id)
    //output.updated will tell you if the user already claimed his/her daily yes or no.

    if (output.updated) {

      var profile = await eco.AddToBalance(message.author.id, 100)
      message.reply(`Tu as réclamé ta récompense quotidienne ! Tu as maintenant ${profile.newbalance} coins.`);

    } else {
      message.channel.send(`Désolé mais tu as déjà réclamé ta récompense quotidienne !\nMais ne t'inquiètes pas, il reste encore ${output.timetowait} avant que tu puisses réclamer ta récompense`)
    }

  }

  if (command === 'leaderboard') {

    //If you use discord-economy guild based you can use the filter() function to only allow the database within your guild
    //(message.author.id + message.guild.id) can be your way to store guild based id's
    //filter: x => x.userid.endsWith(message.guild.id)

    //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
    if (message.mentions.users.first()) {

      var output = await eco.Leaderboard({
        filter: x => x.balance > 50,
        search: message.mentions.users.first().id
      })
      message.channel.send(`L'utilisateur ${message.mentions.users.first().tag} est placé ${output} dans le classement !`);

    } else {

      eco.Leaderboard({
        limit: 3, //Only takes top 3 ( Totally Optional )
        filter: x => x.balance > 50 //Only allows people with more than 100 balance ( Totally Optional )
      }).then(async users => { //make sure it is async

        if (users[0]) var firstplace = await client.user.fetch(users[0].userid) //Searches for the user object in discord for first place
        if (users[1]) var secondplace = await client.user.fetch(users[1].userid) //Searches for the user object in discord for second place
        if (users[2]) var thirdplace = await client.user.fetch(users[2].userid) //Searches for the user object in discord for third place

        message.channel.send(`My Global leaderboard:
 
1 - ${firstplace && firstplace.tag || 'Nobody Yet'} : ${users[0] && users[0].balance || 'None'}
2 - ${secondplace && secondplace.tag || 'Nobody Yet'} : ${users[1] && users[1].balance || 'None'}
3 - ${thirdplace && thirdplace.tag || 'Nobody Yet'} : ${users[2] && users[2].balance || 'None'}`)

      })

    }
  }

  if (command === 'transfer') {

    const user = message.mentions.users.first()
    const amount = args[1]

    if (!user) return message.reply('Ping l\'utilisateur a qui tu veux donner de l\'argent !')
    if (!amount) return message.reply('Spécifie le montant que tu vrux lui donner !')

    const output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Tu as moins de coins que le montant à transférer !')

    const transfer = await eco.Transfer(message.author.id, user.id, amount)
    message.reply(`Transfert des coins réussi !\nPortefeuille de  ${message.author.tag}: ${transfer.FromUser}\nPortefeuille de ${user.tag}: ${transfer.ToUser}`);
  }

  if (command === 'coinflip') {

    const flip = args[0] //Heads or Tails
    const amount = args[1] //Coins to gamble

    if (!flip || !['pile', 'face'].includes(flip)) return message.reply('S\'il te plaît choisi entre pile ou face !')
    if (!amount) return message.reply('Specifie le montant que tu veux parier !')

    const output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Tu as moins de coins que le montant à transférer !')

    const gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
    message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)

  }

  if (command === 'dice') {

    const roll = args[0] //Should be a number between 1 and 6
    const amount = args[1] //Coins to gamble

    if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Spécifie le nombre, il doit être compris entre 1 et 6')
    if (!amount) return message.reply('Specifie le montant que tu veux parier !')

    var output = eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Tu as moins de coins que le montant à transférer !')

    const gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)
    message.reply(`The dice rolled ${gamble.dice}. So you ${gamble.output}! New balance: ${gamble.newbalance}`)

  }

  if (command === 'work') { //I made 2 examples for this command! Both versions will work!

    //     const output = await eco.Work(message.author.id)
    //     //50% chance to fail and earn nothing. You earn between 1-100 coins. And you get one out of 20 random jobs.
    //     if (output.earned == 0) return message.reply('Awh, you did not do your job well so you earned nothing!')
    //     message.channel.send(`${message.author.username}
    // You worked as a \` ${output.job} \` and earned :money_with_wings: ${output.earned}
    // You now own :money_with_wings: ${output.balance}`)


    const output = await eco.Work(message.author.id, {
      failurerate: 30,
      money: Math.floor(Math.random() * 500),
      jobs: ['caissier(ière)', 'commerçant(e)', 'strip-teaser(euse)', 'manager', 'barman', 'pornstar']
    })
    //10% chance to fail and earn nothing. You earn between 1-500 coins. And you get one of those 3 random jobs.
    if (output.earned == 0) return message.reply('Ah, malheuruesement tu as mal fait ton travail tu n\'as rien gagné !')

    message.channel.send(`${message.author.username}
Tu as travaillé en tant que \` ${output.job} \` et tu as gagné :money_with_wings: ${output.earned}
Tu as maintenant :money_with_wings: ${output.balance}`)

  }

  if (command === 'slots') {

    const amount = args[0] //Coins to gamble

    if (!amount) return message.reply('Specifie le montant que tu veux parier !')

    const output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('Tu as moins de coins que le montant à transférer !')

    const gamble = await eco.Slots(message.author.id, amount, {
      width: 3,
      height: 1
    }).catch(console.error)
    message.channel.send(gamble.grid)//Grid checks for a 100% match vertical or horizontal.
    message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)

  }

});
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'scary')) {
    const AmeClient = require('amethyste-api');
    const AmeAPI = new AmeClient('666703a31e32bb7b294a531293711476c207b7b9949aa1cc5c8892fc2475dfb8f521d832e47974d4f7c0e83bebaaadc3ad351c3e1ec8837fab4b3cecccf0b139'); {

      const args = message.content.trim().split(/ +/g)
      const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        || message.member; let m = await message.channel.send("**Please Wait...**");
      const buffer = await AmeAPI.generate("scary", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
      const attachment = new Discord.MessageAttachment(buffer, "scary.png");
      m.delete({ timeout: 5000 });
      message.channel.send(attachment);
    }
  }
})
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'challenger')) {
    const AmeClient = require('amethyste-api');
    const AmeAPI = new AmeClient('666703a31e32bb7b294a531293711476c207b7b9949aa1cc5c8892fc2475dfb8f521d832e47974d4f7c0e83bebaaadc3ad351c3e1ec8837fab4b3cecccf0b139'); {

      const args = message.content.trim().split(/ +/g)
      const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        || message.member; let m = await message.channel.send("**Please Wait...**");
      const buffer = await AmeAPI.generate("challenger", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
      const attachment = new Discord.MessageAttachment(buffer, "challenger.png");
      m.delete({ timeout: 5000 });
      message.channel.send(attachment);
    }
  }
})
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'beautiful')) {
    const AmeClient = require('amethyste-api');
    const AmeAPI = new AmeClient('666703a31e32bb7b294a531293711476c207b7b9949aa1cc5c8892fc2475dfb8f521d832e47974d4f7c0e83bebaaadc3ad351c3e1ec8837fab4b3cecccf0b139'); {

      const args = message.content.trim().split(/ +/g)
      const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        || message.member; let m = await message.channel.send("**Please Wait...**");
      const buffer = await AmeAPI.generate("beautiful", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
      const attachment = new Discord.MessageAttachment(buffer, "beautiful.png");
      m.delete({ timeout: 5000 });
      message.channel.send(attachment);
    }
  }
})
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'brazzers')) {
    const AmeClient = require('amethyste-api');
    const AmeAPI = new AmeClient('666703a31e32bb7b294a531293711476c207b7b9949aa1cc5c8892fc2475dfb8f521d832e47974d4f7c0e83bebaaadc3ad351c3e1ec8837fab4b3cecccf0b139'); {

      const args = message.content.trim().split(/ +/g)
      const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        || message.member; let m = await message.channel.send("**Please Wait...**");
      const buffer = await AmeAPI.generate("brazzers", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
      const attachment = new Discord.MessageAttachment(buffer, "brazzers.png");
      m.delete({ timeout: 5000 });
      message.channel.send(attachment);
    }
  }
})
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'blurple')) {
    const AmeClient = require('amethyste-api');
    const AmeAPI = new AmeClient('666703a31e32bb7b294a531293711476c207b7b9949aa1cc5c8892fc2475dfb8f521d832e47974d4f7c0e83bebaaadc3ad351c3e1ec8837fab4b3cecccf0b139'); {

      const args = message.content.trim().split(/ +/g)
      const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        || message.member; let m = await message.channel.send("**Please Wait...**");
      const buffer = await AmeAPI.generate("blurple", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
      const attachment = new Discord.MessageAttachment(buffer, "blurple.png");
      m.delete({ timeout: 5000 });
      message.channel.send(attachment);
    }
  }
})
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'blur')) {
    const AmeClient = require('amethyste-api');
    const AmeAPI = new AmeClient('666703a31e32bb7b294a531293711476c207b7b9949aa1cc5c8892fc2475dfb8f521d832e47974d4f7c0e83bebaaadc3ad351c3e1ec8837fab4b3cecccf0b139'); {

      const args = message.content.trim().split(/ +/g)
      const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        || message.member; let m = await message.channel.send("**Please Wait...**");
      const buffer = await AmeAPI.generate("blur", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
      const attachment = new Discord.MessageAttachment(buffer, "blur.png");
      m.delete({ timeout: 5000 });
      message.channel.send(attachment);
    }
  }
})
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'approved')) {
    const AmeClient = require('amethyste-api');
    const AmeAPI = new AmeClient('666703a31e32bb7b294a531293711476c207b7b9949aa1cc5c8892fc2475dfb8f521d832e47974d4f7c0e83bebaaadc3ad351c3e1ec8837fab4b3cecccf0b139'); {

      const args = message.content.trim().split(/ +/g)
      const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        || message.member; let m = await message.channel.send("**Please Wait...**");
      const buffer = await AmeAPI.generate("approved", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
      const attachment = new Discord.MessageAttachment(buffer, "approved.png");
      m.delete({ timeout: 5000 });
      message.channel.send(attachment);
    }
  }
})
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + '3000y')) {
    const AmeClient = require('amethyste-api');
    const AmeAPI = new AmeClient('666703a31e32bb7b294a531293711476c207b7b9949aa1cc5c8892fc2475dfb8f521d832e47974d4f7c0e83bebaaadc3ad351c3e1ec8837fab4b3cecccf0b139'); {

      const args = message.content.trim().split(/ +/g)
      const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        || message.member; let m = await message.channel.send("**Please Wait...**");
      const buffer = await AmeAPI.generate("3000years", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
      const attachment = new Discord.MessageAttachment(buffer, "3000years.png");
      m.delete({ timeout: 5000 });
      message.channel.send(attachment);
    }
  }
})
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'badge')) {
    const AmeClient = require('amethyste-api');
    const AmeAPI = new AmeClient('666703a31e32bb7b294a531293711476c207b7b9949aa1cc5c8892fc2475dfb8f521d832e47974d4f7c0e83bebaaadc3ad351c3e1ec8837fab4b3cecccf0b139'); {

      const args = message.content.trim().split(/ +/g)
      const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        || message.member; let m = await message.channel.send("**Please Wait...**");
      const buffer = await AmeAPI.generate("badge", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
      const attachment = new Discord.MessageAttachment(buffer, "badge.png");
      m.delete({ timeout: 5000 });
      message.channel.send(attachment);
    }
  }
})
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'facebook')) {
    const AmeClient = require('amethyste-api');
    const AmeAPI = new AmeClient('666703a31e32bb7b294a531293711476c207b7b9949aa1cc5c8892fc2475dfb8f521d832e47974d4f7c0e83bebaaadc3ad351c3e1ec8837fab4b3cecccf0b139'); {

      const args = message.content.trim().split(/ +/g)
      const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        || message.member; let m = await message.channel.send("**Please Wait...**");
      const buffer = await AmeAPI.generate("facebook", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
      const attachment = new Discord.MessageAttachment(buffer, "facebook.png");
      m.delete({ timeout: 5000 });
      message.channel.send(attachment);
    }
  }
})
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'ps4')) {
    const AmeClient = require('amethyste-api');
    const AmeAPI = new AmeClient('666703a31e32bb7b294a531293711476c207b7b9949aa1cc5c8892fc2475dfb8f521d832e47974d4f7c0e83bebaaadc3ad351c3e1ec8837fab4b3cecccf0b139'); {

      const args = message.content.trim().split(/ +/g)
      const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        || message.member; let m = await message.channel.send("**Please Wait...**");
      const buffer = await AmeAPI.generate("ps4", { url: User.user.displayAvatarURL({ format: "png", size: 2048 }) });
      const attachment = new Discord.MessageAttachment(buffer, "ps4.png");
      m.delete({ timeout: 5000 });
      message.channel.send(attachment);
    }
  }
})
client.on(`message`, message => {

  if (message.content === `m?join`)
    client.emit(`guildMemberAdd`, message.member);
});

client.on(`guildMemberAdd`, async member => {
  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${fontSize -= 10}px sans-serif`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
  };
  const channel = member.guild.channels.cache.find(ch => ch.name === "welcome-chat");
  if (!channel) return;
  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext(`2d`);
  const guild = client.guilds.cache.get("714158237406199899");
  const memberCount = guild.memberCount;


  const background = await Canvas.loadImage(`./bannierew.png`);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = `45px Calvert MT Std`
  ctx.fillStyle = `#000000`
  ctx.fillText('Bienvenue :', canvas.width / 2.7, canvas.height / 2.7)

  ctx.font = applyText(canvas, member.user.tag)
  ctx.fillStyle = `#ffffff`;
  ctx.fillText(/*member.user.tag*/member.displayName, canvas.width / 2.7, canvas.height / 1.7)

  ctx.font = '25px sans-serif';
  ctx.fillStyle = '#000000';
  ctx.fillText(`Nous sommes ${memberCount} \n sur le serveur`, canvas.width / 2.7, canvas.height / 1.25)

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: `jpg` }));
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), './bannierew.png');

  channel.send(`Hey ${member} ! Bienvenue dans le serveur Discord d'Akane-Nightcore ! Merci d'avoir rejoint ce serveur, n'oublie pas de valider le règlement mais n'oublie surtout pas de t'amuser ! :Akanechan_happy: !`, attachment);
});
client.on(`guildMemberRemove`, async member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === "goodbye-chat");
  if (!channel) return;
  channel.send(`**${member.user.tag}** vient de quitter le serveur~ :facepalm:`)
})

// client.db = require("quick.db");
// client.request = new (require("rss-parser"))();
// client.config = require("./configyt.js");

// client.on("ready", () => {
//     console.log("test yt");
//     handleUploads();
// });

// function handleUploads() {
//     if (client.db.fetch(`postedVideos`) === null) client.db.set(`postedVideos`, []);
//     setInterval(() => {
//         client.request.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${client.config.channel_id}`)
//         .then(data => {
//             if (client.db.fetch(`postedVideos`).includes(data.items[0].link)) return;
//             else {
//                 client.db.set(`videoData`, data.items[0]);
//                 client.db.push("postedVideos", data.items[0].link);
//                 let parsed = client.db.fetch(`videoData`);
//                 let channel = client.channels.cache.get(client.config.channel);
//                 if (!channel) return;
//                 let message = client.config.messageTemplate
//                     .replace(/{author}/g, parsed.author)
//                     .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
//                     .replace(/{url}/g, parsed.link);
//                 channel.send(message);
//             }
//         });
//     }, client.config.watchInterval);
// }
client.on('message', message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase().startsWith(`${prefix}iwgp`)) {
    const args = message.content.trim().split(/ +/g)
    let userID = args[1];
    const fetch = require('node-fetch')
    if (!userID) return message.channel.send("Merci de rentrer une id valide");


    client.users.fetch(userID).then(async user => {


      fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
        .then(res => res.json())
        .then(json => {
          const roastEmbed = new Discord.MessageEmbed()
            .setTitle(`**${user.tag}** ` + `${json.insult}`)
          message.channel.send(roastEmbed);
        });

      //**${user.tag}**
    });
  }
});
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase().startsWith(prefix + 'hm')) {
    const args = message.content.trim().split(/ +/g)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Tu as besoin des permissions MANAGE_MESSAGES !')
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if (!channel) return message.channel.send('S\'il te plaît spécifie un channel !')
    const word = args.slice(2).join(" ")
    if (!word) return message.channel.send('Spécifie un mot a deviner !')

    const hang = new hangman({
      message: message,
      word: word,
      client: client,
      channelID: channel.id,
    })

    hang.start();
  }

})
client.on('message', message => {
  const Kitsu = require('kitsu.js');
  const kitsu = new Kitsu();
  var aq = require('animequote');
  const args = message.content.trim().split(/ +/g)
  //checking args
  if (message.author.bot) return;
  if (message.content.toLowerCase().endsWith(prefix + 'anime')) {
    if (!args[1]) {
      return message.channel.send("S'il te plaît spécifie un animé !");

    }
    //main part 
    var search = message.content.split(/\s+/g).slice(1).join(" ");
    kitsu.searchAnime(search).then(async result => {
      if (result.length === 0) {
        return message.channel.send(`Aucun résultat pour : **${search}**!`);
      }

      var anime = result[0]

      const embed = new Discord.MessageEmbed()
        .setColor('#FF2050')
        .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
        .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
        .addField('❯\u2000\ Informations', `•\u2000\ **Nom en japonais:** ${anime.titles.romaji}\n\•\u2000\ **Age du public:** ${anime.ageRating}\n\•\u2000\ **NSFW:** ${anime.nsfw ? 'Oui' : 'Non'}`, true)
        .addField('❯\u2000\ Stats', `•\u2000\ **Note globale:** ${anime.averageRating}\n\•\u2000\ **Classement:** ${anime.ratingRank}\n\•\u2000\ **Popularité:** ${anime.popularityRank}`, true)
        .addField('❯\u2000\ Status', `•\u2000\ **Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\ **Début:** ${anime.startDate}\n\•\u2000\ **Fin:** ${anime.endDate ? anime.endDate : "En cours.."}`, true)

        .setThumbnail(anime.posterImage.original, 100, 200);


      return message.channel.send(embed)
    }).catch(err => {
      console.log(err) //cathing error
      return message.channel.send(`Aucun résultat pour : **${search}**!`);
    });
  }
})
const { gifu } = require("gifu");

// client.on('message', message => {
// const args = message.content.trim().split(/ +/g)
// if (!args[1]) {
//   return message.channel.send("S'il te plaît spécifie un gif !");

// }
// gifu("bite")
//   .then(result => console.log(result))
// })


// client.on('message', async message => {
//   const NanaAPI = require('nana-api');
//   const nhentai = new NanaAPI;
//   const args = message.content.trim().split(/ +/g)
//   if (message.author.bot) return;
//   if (message.content.startsWith(prefix + 'search')) {
//     //DEFINITION OF VARIABLES
//     const query = args[1];
//     const content = message.content.split(" ").slice(2).join(" ");
//     var result;

//     const embed = new Discord.MessageEmbed()
//       .setColor('EC2854')

//     //PRE-CONDITIONS
//     if (!content) return message.channel.send("S'il te plaît spécifie ce que tu cherches")

//     switch (query.toLowerCase()) {
//       case 'tag':
//         result = await nhentai.tag(content.toLowerCase())
//         break;
//       case 'artist':
//         result = await nhentai.artist(content.toLowerCase())
//         break;
//       case 'character':
//         result = await nhentai.character(content.toLowerCase())
//         break;
//       case 'parodies':
//         result = await nhentai.parody(content.toLowerCase())
//         break;
//       default:
//         message.channel.send("S'il te plaît spécifie ce que tu cherches. \n I.E `tag / artist / character`")
//         break;
//     }
//     if (result == 'No book founded!') return message.channel.send("Aucun résultat trouvé :/")
//     embed.addFields(
//       { name: `\`#\`${result.results[0].id}`, value: `[${result.results[0].title}](https://www.nhentai.net/g/${result.results[0].id})` },
//       { name: `\`#\`${result.results[1].id}`, value: `[${result.results[1].title}](https://www.nhentai.net/g/${result.results[1].id})` },
//       { name: `\`#\`${result.results[2].id}`, value: `[${result.results[2].title}](https://www.nhentai.net/g/${result.results[2].id})` },
//       { name: `\`#\`${result.results[3].id}`, value: `[${result.results[3].title}](https://www.nhentai.net/g/${result.results[3].id})` },
//       { name: `\`#\`${result.results[4].id}`, value: `[${result.results[4].title}](https://www.nhentai.net/g/${result.results[4].id})` }
//     )
//     embed.setFooter(`Showing 5 results out of ${result.num_results}`)
//     embed.setAuthor(`Searching for character ${content.toLowerCase()}:`, "https://cdn.discordapp.com/attachments/657043167279054898/764912603679293480/nhentai_1.png")
//     message.channel.send(embed)
//   }
// })
const Booru = require('booru')
const { BooruError, sites } = require('booru')
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'



// Search with promises
// client.on('message', message => {
//   const argTags = process.argv.slice(3)
//   const site = process.argv[1] || 'rule34'
//   //const args = message.content.trim().split(/ +/g).slice(0)

//   if (message.author.bot) return;
//   if (message.content.startsWith(prefix + 'search')) {
//     const args = message.content.split(prefix + 'search')[1]
//     const tags = args
//     Booru.search(site, tags, { limit: 1, random: true })
//       .then(posts => {
//         if (posts.length === 0) {
//           message.channel.send('No images found.')
//         }

//         for (let post of posts) {
//           const embedr34 = new Discord.MessageEmbed()
//             .setImage(post.fileUrl)
//           message.channel.send(embedr34)
//         }
//       })
//       .catch(err => {
//         if (err instanceof BooruError) {
//           // It's a custom error thrown by the package
//           // Typically results from errors the boorus returns, eg. "too many tags"
//           console.error(err)
//         } else {
//           // This means something pretty bad happened
//           console.error(err)
//         }
//       })
//   }
// })
const booru = require('booru')
client.on('message', async msg => {
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().startsWith(prefix + 'r34')) {
    const quer = msg.content.slice(prefix + 'r34')[1]
    const que = msg.content.split(/\s+/g).slice(1).join(" ");
    const arg = msg.content.slice(prefix.length + 'r34').trim().split(/ +/g).slice(0);
    const query = arg.join(' ');
    //const qu = args.shift().toLowerCase();

    booru.search('rule34', [query], { nsfw: true, limit: 1, random: true })
      .then(booru.commonfy)
      .then(images => {
        for (let image of images) {
          const embed = new Discord.MessageEmbed()
            .setTitle("Rule34:")
            .setImage(image.common.file_url)
            .setColor('#FF0000')
            .setFooter(`Tags: ${query}`)
            .setURL(image.common.file_url);
          return msg.channel.send(embed);
        }

      }).catch(err => {
        if (err.name === 'booruError') {
          return msg.channel.send(`No results found for **${query}**!`);
        } else {
          return msg.channel.send(`No results found for **${query}**!`);
        }
      })
    if (!query) return msg.channel.send('Please specify at least one tag')
  }
});

client.on('message', async message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const figlet = require("figlet"); // MAKE SURE TO INSTALL FIGLET PACKAGE OR CODE WONT WORK

  let text = args.slice(1).join(" ");
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix + 'ascii')) {
    if (!text) {
      return message.channel.send('Please provide text for the ascii conversion!')
    }
    let maxlen = 20
    if (text.length > 20) {
      return message.channel.send("Please put text that has 20 characters or less because the conversion won't be good!")
    }
    // AGAIN, MAKE SURE TO INSTALL FIGLET PACKAGE!
    figlet(text, function (err, data) {
      message.channel.send(data, {
        code: 'AsciiArt'
      });
    });
  }
})
client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix + 'eject')) {
    const fetch = require('node-fetch')
    const user = message.mentions.users.first()
    const imp = [true, false];
    const imposter = imp[Math.floor(Math.random() * imp.length)];
    const crew = ["black", "blue", "brown", "cyan", "darkgreen", "lime", "orange", "pink", "purple", "red", "white", "yellow"]
    const crewmate = crew[Math.floor(Math.random() * crew.length)];

    if (!user) {
      return message.channel.send(`${message.author} Please specify a user to eject by mentioning them!`)
    }

    const data = await fetch(`https://vacefron.nl/api//ejected?name=${user.username}&impostor=${imposter}&crewmate=${crewmate}`)

    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL())
      .setTitle(`${message.author.username} decided to eject ${user.username}`)
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(`[Click here, if the image didn't load!](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send(embed);
  }
});
client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix + 'avatar')) {

    let user = !message.mentions.users.first() ? message.author : message.mentions.users.first()

    let embed = new Discord.MessageEmbed()
      .setTitle(`Avatar de ${user.username}!`)
      //.setDescription(/*`[Click here if the image didn't load](${user.displayAvatarURL})`*/user.avatarURL)
      .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }))
      .setColor("RANDOM");
    message.channel.send(embed);
  }
});

// client.on('message', async message => {
//   const { MessageEmbed } = require("discord.js");
//   const Color = 'RANDOM';
//   const genius = require('genius-lyrics')
//   const Genius = new genius ('nPzP2wq9j1BrNMxfRZdg2KzfX9n5mIAMgsb5YMScWETuK6Q1jxKvxmJ9ekLL7PNk')
//   const args = message.content.trim().split(/ +/g)
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.startsWith(prefix + 'lyrics')) {

//     if (!args[0]) return message.channel.send(`Please Give Me A Song Name!`);

//     const Name = args.join(" ");

//     Genius.tracks.get(Name).then(results => {
//       const song = results[0];
//       song
//         .lyrics()
//         .then(lyrics => {
//           message.channel.send(
//             new MessageEmbed()
//               .setColor(Color)
//               .setTitle(`${song.title} Lyrics`)
//               .setDescription(`lyrics.length > 1900 ? ${lyrics.substr(0, 1900)}... : lyrics`)
//               .setFooter(`Song Creator : ${song.artist.name}`)
//               .setThumbnail(song.humbnail)
//               .setTimestamp()
//           );
//         })
//         .catch(err => console.error(err))
//     });
//   }
// })
client.on('message', async message => {
  const args = message.content.trim().split(/ +/g)
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix + 'fake')) {

    let member = message.mentions.users.first() //|| this.client.users.cache.get(args[0])
    if (!member) return message.channel.send('Utilisateur non défini')
    let botmsg = args.slice(0).slice(1).join(" ")
    if (!botmsg) return message.channel.send('hzedvbzt')
    message.channel.createWebhook(member.username, { avatar: member.displayAvatarURL({ format: "png" }) }).then(webhook => {
      if (message.member.hasPermission("MENTION_EVERYONE")) {
        webhook.send(botmsg, {
          disableEveryone: false
        })
        setTimeout(() => webhook.delete(), 5000)
      } else {
        webhook.send(botmsg, {
          disableEveryone: true
        })
        setTimeout(() => webhook.delete(), 5000)
      }
    })
    message.delete().catch();
  }
});
client.on('message', async message => {
  const args = message.content.trim().split(/ +/g)
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix + 'clap')) {
    let clap = args.join(" ").split(" ").join("<a:clap:554482751542132736>").slice(0).slice(1).slice(2).slice(3);
    if (!clap) return message.channel.send("Truc et flemme de dire l'erreur")

    if (message.member.hasPermission("MENTION_EVERYONE")) {
      message.channel.send(clap, {
        disableEveryone: false
      })
    } else {
      message.channel.send(clap, {
        disableEveryone: true
      })
    }
  }
});
client.on('message', async message => {
  const fetch = require("node-fetch");
  const args = message.content.trim().split(/ +/g)
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix + 'clyde')) {
    const text = args.slice(1).join(' ')
    if (!text) return message.reply("Please provide text");

    const data = await fetch(`
      https://nekobot.xyz/api/imagegen?type=clyde&text=${text}
    `).then((res) => res.json());

    const embed = new Discord.MessageEmbed()
      .setTitle("Clyde")
      .setImage(data.message)
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(`
        [Click here if the image failed to load.](${data.message})
      `);
    message.channel.send(embed);
  }
});
client.on('message', async message => {
  const mapping = {
    ' ': '   ',
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
    '!': ':grey_exclamation:',
    '?': ':grey_question:',
    '#': ':hash:',
    '*': ':asterisk:'
  };

  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
  });
  const args = message.content.trim().split(/ +/g)
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix + 'emojify')) {


    if (!args) {
      message.channel.send('You must provide some text to emojify!');
    }
    await message.delete();
    message.channel.send(args.join(' ').slice(9).split('').map(c => mapping[c] || c).join(''));

  }
});
// client.on('message', async message => {
//   const args = message.content.trim().split(/ +/g)
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.endsWith(prefix + 'emoji')) {
//     try {
//       let Emojis = [];
//       let EmojisAnimated = [];
//       const lyric = Emojis.join(' ');
//       const lyrics = EmojisAnimated.join(' ');
//       let OverallEmojis = 0;
//       function Emoji(id) {
//         return client.emojis.cache.get(id).toString();
//       }
//       message.guild.emojis.cache.forEach(emoji => {
//         OverallEmojis++;
//         if (emoji.animated) {
//           lyric.push(Emoji(emoji.id))
//         } else {
//           lyrics.push(Emoji(emoji.id))
//         }
//       })
//       // let string=[''];
//       // for(let i =0; i< Emoji.length;i++){
//       //   if(string[i].length >1800)
//       //   {
//       //     string.push(Emoji[i]);
//       //   }
//       //   string[i]+=Emoji[i];

//       // }

//       // for(let i=0; i< string.length;i++){
//       //   let emn = new Discord.MessageEmbed()
//       //   emn.setTitle(`Emojis of [ ${message.guild.name} ] server`)
//       //   emn.setThumbnail(message.guild.iconURL({ dynamic: true, format: 'png', size: 512 }))
//       //   emn.setDescription(`**Animated []**\n${string[i]}`)
//       // }
//       for (let i = 0; i < lyrics.length, lyric.length; i += 2000) {
//         const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 2000)) && lyric.substring(i, Math.min(lyric.length, i + 2000));
//         let emn = new Discord.MessageEmbed()
//         emn.setTitle(`Emojis of [ ${message.guild.name} ] server`)
//         emn.setThumbnail(message.guild.iconURL({ dynamic: true, format: 'png', size: 512 }))
//         //emn.setDescription(`**Animated []**\n${EmojisAnimated}\n**Standard []**\n${Emojis}`)
//         // emn.setFooter(`**Animated [${Animated}]**`, `${EmojisAnimated}`)
//         // emn.setFooter(`**Standard [${EmojiCount}]**`, `${Emojis}`)
//         emn.setDescription(toSend)
//         emn.setColor(0x2f3136)
//         message.channel.send(emn);
//       }
//     } catch (err) {
//       if (err) return message.channel.send(`The error occuring currently is : ${err.message}`)
//     }
//   }

// });
// client.on('message', async message => {
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.endsWith(prefix + 'search')) {
//     const args = message.content.trim().split(/ +/g)
//     const Kitsu = require('kitsu.js');
//     const kitsu = new Kitsu();
//     const { GraphQLClient, gql } = require('graphql-request'); const { MessageEmbed } = require('discord.js');

//     const endpoint = 'https://kitsu.io/api/graphql';

//     const graphQLClient = new GraphQLClient(endpoint, { headers: { authorization: `Bearer ${kitsu}`, }, });
//     const query = gql`{   searchAnimeByTitle(first: 1, title: "${args.join(' ')}") {     totalCount    nodes {    titles {      canonical    }    id    season    #The season this was relase on    ageRating    # age Rating    ageRatingGuide    # Explains why it recive the age rating    averageRating    # AverageRating among kitsu users    description    # A brief Description    startDate    # The day that this Anime was release    endDate    # Final Release    nextRelease    # The time for the next release        episodeCount    # Numbers of Episodes    episodeLength    # The Length of the episode in seconds    favoritesCount    # Favorite Count that users have as there favorite    totalLength    # How long the anime is on seconds        sfw    # if the anime is nsfw or not    status    # Current Status    subtype    # Type to categorize anime    userCount    # the Number Of User added this to there library    categories(first: 10) {      totalCount      nodes {     title      }    }    staff(first: 2) {      nodes {     person {       name       description     }      }    }    bannerImage {      original {     url      }    }    posterImage {      original {     url      }    }     }   }    }    `; const data = await graphQLClient.request(query); if (data.searchAnimeByTitle.totalCount < 0) return message.channel.send('No Anime has been found with that name'); const body = data.searchAnimeByTitle.nodes[0];
//     function time(n) { const mins = Math.floor(n / 60) % 60; const hours = Math.floor(Math.floor(n / 60) / 60) % 24; const days = Math.floor(Math.floor(Math.floor(n / 60) / 60) / 24) % 31; const rmonths = Math.floor(Math.floor(Math.floor(Math.floor(n / 60) / 60) / 24) / 31) % 30; const tb = []; if (rmonths > 0) tb.push(` ${rmonths} Month${rmonths > 1 ? 's' : ''}`); if (days > 0) tb.push(` ${days} day${days > 1 ? 's' : ''}`); if (hours > 0) tb.push(` ${hours} hour${hours > 1 ? 's' : ''}`); if (mins > 0) tb.push(` ${mins} min${mins > 1 ? 's' : ''}`); if (n == 0) tb.push('No Time Found'); return tb; } message.channel.send(`Searching information about **${args.join(' ')}** on Kitsu.io!. This may take a hot second`).then(msg => {
//       if (body.sfw == false && !message.channel.nsfw) return msg.edit('Please use this command on a NSFW channel ;w;').then(msg.delete({ timeout: 4500 })); let episode = body.episodeCount; if (episode == null) episode = ['??']; let episodeLength = body.episodeLength; if (episodeLength == null) episodeLength = ['??']; let totalLength = body.totalLength; if (totalLength == null) totalLength = ['??']; let endDate = body.endDate; if (endDate == null) endDate = ['??']; let startDate = body.startDate; if (startDate == null) startDate = ['??']; let ageGuide = body.ageRatingGuide; if (ageGuide == '') ageGuide = ['??']; let ageRating = body.ageRating; if (ageRating == null) ageRating = ['??']; let averageRating = body.averageRating; if (averageRating == null) averageRating = ['??']; let status = body.status; if (status == null) status = ['??']; let popularityRank = body.userCount; if (popularityRank == null) popularityRank = ['??']; let subtype = body.subtype; if (subtype == null) subtype = ['??']; let nextRelease = body.nextRelease; if (nextRelease == null) nextRelease = ['??'];   // eslint-disable-next-line no-unused-vars
//       try { const embed = new MessageEmbed().setTitle(body.titles.canonical).setURL(`https://kitsu.io/anime/${body.id}`).setColor('#4286f4').setDescription(body.description.en).setThumbnail(body.posterImage.original.url).addField('INFO', [`â ¯ Avarage Rating: **${averageRating}**`, `â ¯ Age Rating: **${ageRating}**`, `â ¯ Age guide: **${ageGuide}**`,], true).addField('STATS', [`â ¯ Type: **${subtype}**`, `â ¯ Popularity Rank: **#${popularityRank}**`, `â ¯ Status: **${status}**`,], true).addField('\u200b', '\u200b').addField('EPISODES', [`â ¯ Episodes length: **${time(episodeLength)}**`, `â ¯ Episodes: **${episode}**`, `â ¯ Total Length: **${time(totalLength)}**`, `â ¯ Started on **${startDate}**`, `â ¯ Ended on **${endDate}**`,], true); const MAX_GENRES = 10; if (body.categories && body.categories.totalCount) { const max = Math.min(MAX_GENRES, body.categories.totalCount); const genres = []; let i = 0; while (i < max) { genres.push(body.categories.nodes[i].title.en); i += 1; } embed.addField('GENRES', [`â ¯ ${genres.join(', ')}`,], true); } if (body.bannerImage.original.url != '/cover_images/original/missing.png') { embed.setImage(body.bannerImage.original.url); } message.channel.send(embed); msg.delete(); } catch (err) { return msg.edit('Unable to find this anime').then(msg.delete({ timeout: 4500 })); }
//     });
//   }
// });
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix + 'sm')) {
    const args = message.content.trim().split(/ +/g)
    const amount = parseInt(args[1])
    if (message.member.hasPermission("MANAGE_CHANNEL"))
      if (isNaN(amount)) return message.channel.send("It doesn't seem to be valid number")
    if (args[1] === amount + "s") {
      message.channel.setRateLimitPerUser(amount)
      if (amount > 1) {
        message.channel.send("slowmode is now " + amount + " seconds")
        return
      }
      else {
        message.channel.send("slowmode is now " + amount + " second")
        return
      }
    } if (args[1] === amount + "min") {
      message.channel.setRateLimitPerUser(amount * 60)
      if (amount > 1) {
        message.channel.send("slowmode is now " + amount + " minutes")
        return
      } else {
        message.channel.send("slowmode is now " + amount + " minute")


        return
      }
    } if (args[1] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60)
      if (amount > 1) {
        message.channel.send("slowmode is now " + amount + " hours")
        return
      } else {
        message.channel.send("slowmode is now " + amount + " hour")
        return
      }
    } else {
      message.channel.send("You can only set seconds(s), minutes(min) and hours(h)")
    }

  }
})
client.on('message', async message => {
  const covid = require('novelcovid')
  //api.countries({ country: ['austria', 'china', 'switzerland', 'france', 'germany'] }).then(console.log)
  if (message.content.endsWith(`${prefix}covid`)) {
    const covidStats = await covid.all()

    return message.channel.send(new Discord.MessageEmbed()
      .setTitle('covid19 stats')
      .setColor("BLUE")
      .addFields(
        { name: `Cases`, value: covidStats.cases.toLocaleString(), inline: true },
        { name: `Cases Today`, value: covidStats.todayCases.toLocaleString(), inline: true },
        { name: `Deaths`, value: covidStats.deaths.toLocaleString(), inline: true },
        { name: `Deaths today`, value: covidStats.todayDeaths.toLocaleString(), inline: true },
        { name: `Recovered`, value: covidStats.recovered.toLocaleString(), inline: true },
        { name: `Recovered today`, value: covidStats.todayRecovered.toLocaleString(), inline: true },
        { name: `Infected right now`, value: covidStats.active.toLocaleString(), inline: true },
        { name: `Critical condition`, value: covidStats.critical.toLocaleString(), inline: true },
        { name: `Tested`, value: covidStats.tests.toLocaleString(), inline: true },
      )
    )
  }
  // if (message.content.startsWith(`${prefix}covid`)) {
  //   return message.channel.send(new Discord.MessageEmbed()
  //     .setTitle('covid19 stats')
  //     .setColor("BLUE")
  //     .addFields(
  //       { name: `Cases`, value: covidStats.cases.toLocaleString(), inline: true },
  //       { name: `Cases Today`, value: covidStats.todayCases.toLocaleString(), inline: true },
  //       { name: `Deaths`, value: covidStats.deaths.toLocaleString(), inline: true },
  //       { name: `Deaths today`, value: covidStats.todayDeaths.toLocaleString(), inline: true },
  //       { name: `Recovered`, value: covidStats.recovered.toLocaleString(), inline: true },
  //       { name: `Recovered today`, value: covidStats.todayRecovered.toLocaleString(), inline: true },
  //       { name: `Infected right now`, value: covidStats.active.toLocaleString(), inline: true },
  //       { name: `Critical condition`, value: covidStats.critical.toLocaleString(), inline: true },
  //       { name: `Tested`, value: covidStats.tests.toLocaleString(), inline: true },



})
client.on('message', async message => {
  const axios = require("axios");
  const args = message.content.trim().split(/ +/g)
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix + 'trash')) {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    const url = `https://api.no-api-key.com/api/v1/trash?image=${user.user.displayAvatarURL({ format: "png" })}`;

    let response, data;
    try {
      response = await axios.get(url);
      data = response.data;
    } catch (e) {
      return message.channel.send(`An error occured!`);
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.guild.name} was used in!`,
        message.guild.iconURL({ dynamic: true })
      )
      .setImage(data.url)
      .setColor("RANDOM")
      .setFooter(
        `${message.author.username} asked this`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    await message.channel.send(embed);
  }
})
// client.on('message', async message => {
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.startsWith(prefix + 'lyrics')) {
//     const args = message.content.slice(prefix.length + 'lyrics').trim().split(/ +/g)
//     // const command = args.shift().toLowerCase();

//     // const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
//     // if (!cmd) return;
//     if (args.length < 2)
//       return message.channel.send("Please enter the artist name first.")
//     let artist = args.join(' ');
//     let songName = '';
//     let pages = [];
//     let currentPage = 0;

//     const messageFilter = m => m.author.id === message.author.id;
//     const reactionFilter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && (message.author.id === user.id)

//     message.channel.send('Please enter a song name now')
//     await message.channel.awaitMessages(messageFilter, { max: 1, time: 15000 }).then(async collected => {
//       songName = collected.first().content;
//       await finder(artist, songName, message, pages)
//     });

//     const lyricsembed = await message.channel.send(`Lyrics pages: ${currentPage + 1}/${pages.length}`, pages[currentPage])
//     await lyricsembed.react('⬅️');
//     await lyricsembed.react('➡️');

//     const collector = lyricsembed.createReactionCollector(reactionFilter);

//     collector.on('collect', (reaction, user) => {
//       if (reaction.emoji.name === '➡️') {
//         if (currentPage < page.length - 1) {
//           currentPage + -1
//           lyricsembed.edit(`Lyrics pages: ${currentPage + 1}/${pages.length}`, pages[currentPage]);
//         }
//       }
//       else if (reaction.emoji.name === '⬅️') {
//         if (currentPage !== 0) {
//           currentPage -= 1;
//           lyricsembed.edit(`Lyrics pages: ${currentPage + 1}/${pages.length}`, pages[currentPage])
//         }
//       }
//     })

//   }

//   async function finder(artist, songName, /*message,*/ pages) {
//     let fullLyrics = await lyricsFinder(artist, songName) || 'Not found !'

//     for (let i = 0; i < fullLyrics.length; i += 2048) {

//       const lyricss = fullLyrics.substring(i, Math.min(fullLyric.length, i + 2048))

//       const msg = new Discord.MessageEmbed()
//         .setDescription(lyricss)
//       pages.push(msg);
//     }

//   }

// })
const config = require('./config.json')
// client.on('message', async message => {
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.startsWith(prefix + 'lyrics')) {
//     const genius = require('genius-lyrics') 
//     const G = new genius.Client(config.genius)

//     G.songs.search(message.content.split(' ').slice(1).join(' '), {limit: 1}).then((results) => {
//       const song = results[1]
//       message.channel.send(`**${song.artist.name} - ${song.title}**\n<${song.url}>`)
//     }).catch((err) => message.reply(`Erreur : ${err}`))

//   }
//});
// client.on('message', async message => {
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.startsWith(prefix + 'lyrics')) {
//     const genius = require('genius-lyrics')
//     const G = new genius.Client(config.genius)
//     const getArtistTitle = require('get-artist-title');
//     const axios = require('axios');
//     const cheerio = require('cheerio');
//     const args = message.content.slice(prefix.length + 'lyrics').trim().split(/ +/g);

//     const baseURL = `https://api.genius.com/search?access_token=${config.genius}`;
//     let playlist;

//     const scrapeLyrics = path => {
//       return axios.get(path)
//         .then(response => {
//           let $ = cheerio.load(response.data);
//           return [$('.header_with_cover_art-primary_info-title').text().trim(), $('.lyrics').text().trim()];
//         })
//         .catch(err => {
//           console.warn(err);
//         });
//     };

//     const searchLyrics = url => {
//       return Promise.resolve(axios.get(url, { 'Authorization': `Bearer ${config.genius}` })
//         //.then(response => checkSpotify(response.data.response.hits))
//         .then(path => scrapeLyrics(path))
//         .catch(err => {
//           console.warn(err);
//         })
//       );
//     };

//     // const checkSpotify = hits => {
//     //   return hits[0].result.primary_artist.name === 'Spotify' ? hits[1].result.url : hits[0].result.url;
//     // };

//     const createQuery = arg => {
//       if (arg === 'np') {
//         const query = [artist, title] = getArtistTitle(playlist.current, {
//           defaultArtist: ' '
//         });
//         console.log(query)
//         return query.join(' ')
//       } else return args.slice(1).join(' ');
//     };

//     playlist = client.playlist;

//     if (!args[0]) return message.reply(`Chanson non définie`);

//     const query = createQuery(args[0]);
//     searchLyrics(`${baseURL}&q=${encodeURIComponent(query)}`)
//       .then(songData => {
//         const embed = new Discord.MessageEmbed()
//           .setColor(0x00AE86)
//           .setTitle(`Lyrics for: ${/*songData[0]*/query}`)
//           .setDescription(songData[1]);
//         return message.channel.send({ embed });
//       })
//       .catch(err => {
//         message.channel.send(`No lyrics found for: ${query} 🙁`, { code: 'asciidoc' });
//         console.warn(err);
//       });
//   }

// });
// client.on('message', async message => {
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.startsWith(prefix + 'lyrics')) {
//     const music = require('telk-music');

//   }
// });
client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix + 'lyrics')) {
    const args = message.content.slice(prefix.length + (6)).trim().split(/ +/g);
    //const args = message.content.split(prefix + 'lyrics')[1]
    if (!args[0]) {
      const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle(':x: Song title not provided!')
      return message.channel.send(embed)
    }
    const lyrics = await lyricsFinder(args.join(' ')) || "Not Found!";
    for (let i = 0; i < lyrics.length; i += 2000) {
      const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 2000));
      const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(toSend)
      message.channel.send(embed).catch(e => {
        console.log(e)
      });
    }
  }
});
// client.on('message', async message => {
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.startsWith(prefix + 'lyrics')) {
//     const Color = `RANDOM`; const Genius = new (require("genius-lyrics")).Client(config.genius);
//     const args = message.content.slice(prefix.length + (6)).trim().split(/ +/g);
//     if (!args[0]) return message.channel.send(`Please Give Me A Song Name!`); 
//      let Name = args.join(" ");
//     Genius.tracks.search(Name).then(results => { 
//       const song = results[0]; song.lyrics().then(lyrics => { message.channel.send(new MessageEmbed()
//         .setColor(Color)
//         .setTitle(`${song.title} Lyrics`)
//         .setDescription(lyrics.length > 1900 ? `${lyrics.substr(0, 1900)}...` : lyrics)
//         .setFooter(`Song Creator : ${song.artist.name}`)
//         .setThumbnail(song.humbnail)
//         .setTimestamp()); })
//         .catch(err => console.error(err)) });
//   }
// });
// client.on('message', message => {
//   const randomPuppy = require('random-puppy');
//   var subreddits = [
//     'NSFW_Wallpapers',
//     'SexyWallpapers',
//     'HighResNSFW',
//     'nsfw_hd',
//     'UHDnsfw'
//   ]
//   var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.startsWith(prefix + '4knsfw')) {

//     randomPuppy(sub)
//       .then(url => {
//         const embed = new Discord.MessageEmbed()
//           .setFooter(`4kNSFW`)
//           .setDescription(`[Image URL](${url})`)
//           .setImage(url)
//           .setColor('#A187E0');
//         return message.channel.send({ embed });
//       })
//   }
// });
// client.on('message', message => {
//   const randomPuppy = require('random-puppy');
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.startsWith(prefix + 'cosplay')) {
//     const subreddits = [
//       'nsfwcosplay',
//       'cosplayonoff',
//       'cosporn',
//       'cosplayboobs'
//     ]

//     const sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

//     randomPuppy(sub)
//       .then(url => {
//         const embed = new Discord.MessageEmbed()
//           .setFooter('cosplay')
//           .setDescription(`[Image URL](${url})`)
//           .setImage(url)
//           .setColor('#A187E0');
//         return message.channel.send({ embed });
//       })
//   }
// });
// client.on('message', async message => {
//   var superagent = require("superagent");
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.endsWith(prefix + '4k')) {
//     if (!message.channel.nsfw)
//       return message.channel.send(
//         ":underage:  This Command Is Only Allowed In NSFW Channels Only!"
//       );
//     var lo = new Discord.MessageEmbed()
//       .setDescription(`🔃 Loading...`)
//       .setTimestamp();

//     message.channel.send(lo).then((m) => {
//       superagent
//         .get("https://nekobot.xyz/api/image")
//         .query({ type: "4k" })
//         .end((err, response) => {
//           var embed_nsfw = new Discord.MessageEmbed()
//             .setURL(`${response.body.message}`)
//             .setImage(response.body.message);

//           m.edit(embed_nsfw);
//         });
//     });

//   }
// });
// client.on('message', async message => {
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.startsWith(prefix + '4knsfw')) {
//     if (!message.channel.nsfw)
//       return message.channel.send(
//         ":underage:  This Command Is Only Allowed In NSFW Channels Only!"
//       );
//       const image = await nsfw.fourk();
//       const embed = new Discord.MessageEmbed()
//           .setTitle(`Pussy Image`)
//           .setColor("GREEN")
//           .setImage(image);
//       message.channel.send(embed);
//   }
// });
// const Lolibooru = require("node-lolibooru");
// const loli = new Lolibooru();

// client.on('message', message => {
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.startsWith(prefix + 'loli')) {
//   loli.getLoli(1, 1, "1girl").then((data) => { console.log(data)/*message.channel.send(data)*/ })
//   }
// });
// client.on('message', message => {
//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (message.content.startsWith(prefix + 'test')) {
//     message.react('721739722174627901')
//   }
// });
// client.on('messageReactionAdd', (reaction, user) => {
//   console.log('réaction ajoutée par ! ' + user.username + '\nNom de l\'emoji ' + reaction.emoji.name + ` c'est la ${reaction.count}ème réaction !`);

//   reaction.users.remove(user.id );
// })
// client.on('messageReactionRemove', (reaction, user) => {
//   console.log('réaction retirée !')
// })
fs.readdirSync('./src').forEach(dirs => {
  const commandss = fs.readdirSync(`./src/${dirs}`).filter(files => files.endsWith('.js'));

  for (const file of commandss) {
    const commands = require(`./src/${dirs}/${file}`);
    console.log(`Loading command ${file}`);
    var test = commands.name.toLowerCase();
    client.commands.set(test, commands);
  };
  for (const file of commandss) {
    const commands = require(`./src/commands/misc/Botinfocommand`);
    console.log(`Loading command ${commands.name}`);
    var test = commands.name.toLowerCase();
    client.commands.set(test, commands);
  };
});
client.login(config.token);