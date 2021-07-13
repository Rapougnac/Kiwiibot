const { Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Command = require('../../struct/Command');
const Client = require('../../struct/Client');
const { stripIndents } = require('common-tags');
module.exports = class TagCommand extends Command {
  /**
   *@param {Client} client
   */
  constructor(client) {
    super(client, {
      name: 'tag',
      aliases: [],
      description: 'Search trough all the tags',
      category: 'docs',
      cooldown: 5,
      utilisation: '{prefix}tag [tag] or {prefix}tag [category] <tag>',
    });
  }
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    // This command is supposed to be for a specifical guild, unless you want to have fun with this command (•_•)
    if (!args[0])
      return message.channel.send({
        embed: {
          color: 'BLUE',
          author: {
            name: message.author.username,
            icon_url: message.author.displayAvatarURL({ dynamic: true }),
          },
          description:
            'Liste de toutes les catégories \n\n`fix`, `unexpected`, `==` alias `===`, `destructure`, `websocket` alias `ws`, `hyperlien` alias `hyperlink`, `purge`, `ping-command`, `intents`, `of-undefined` alias `of-null`, `collector`, `ask`, `swearwords`, `heroku`, `find`, `dashboard`, `avatar`, `bot`, `client`, `template-literal`, `embed`, `does-not-work` alias `dnw`, `embed-limits`',
        },
      });
    switch (args[0]) {
      case 'fix': {
        switch (args[1]) {
          case 'syntaxerror':
          case 'syntax': {
            return message.channel.send(
              "Si vous recevez une `SyntaxError`, c'est généralement dû à un mauvais placement des brackets et/ou des parenthèses. __Votre éditeur doit mettre en surbrillance les brackets/parenthèses correspondantes lorsque vous cliquez dessus.__ Commencez à cliquer de bas en haut pour voir où vous avez manqué une parenthèse/bracket ou éventuellement en avez ajouté trop.\nPlus d'informations sur les erreurs de syntaxe : <https://anidiots.guide/common-errors#unexpected-end-of-input>"
            );
          }
          case 'identifier': {
            return message.channel.send(
              `Si vous recevez une erreur dans l'onglet \`problems\` appelée *Identifier expected*, c'est que vous avez sûrement mis un point en trop
              \`\`\`js\n// Exemple\n<Client>.on('message', (message) => {
                message.author.username.
                                       ^// L'erreur se trouve juste ici\n});\n\`\`\``
            );
          }
        }
        return message.channel.send({
          embed: {
            color: 'BLUE',
            author: {
              name: message.author.username,
              icon_url: message.author.displayAvatarURL({ dynamic: true }),
            },
            description:
              'Liste de tout les tags liés aux erreurs à fix\n\n`syntax`, `identifier`',
          },
        });
      }
      case 'unexpected': {
        switch (args[1]) {
          case 'token': {
            return message.channel.send(
              '**Unexpected Token )/}**\nCette erreur est probablement causée par une incompatibilité entre les brackets ouvrantes et fermantes `{}` et/ou les parenthèses `()` dans votre code.\nExtensions linter et configuration de base: <https://discordjs.guide/preparations/setting-up-a-linter.html>'
            );
          }
          case 'end-of-input': {
            return message.channel.send(
              'Il peut peut-être vous manquer une bracket/parenthèse (bracket = `{}`) à fermer !'
            );
          }
        }
        return message.channel.send({
          embed: {
            color: 'BLUE',
            author: {
              name: message.author.username,
              icon_url: message.author.displayAvatarURL({ dynamic: true }),
            },
            description:
              'Liste de tout les tags liés aux erreurs unexpected\n\n`token`, `end-of-input`',
          },
        });
      }
      case '===':
      case '==': {
        return message.channel.send(
          "En JavaScript, `=` est utilisé pour l'assignement, `==` est pour l'égalité faible, et `===` pour l'égalité stricte.  Pour les comparaisons, === est conseillé.\n```js\nx = 1; // attribuation d'une valeur à x\n'1' == 1 // true\n'1' === 1 // false\n```\n<https://developer.mozilla.org/fr/docs/Web/JavaScript/Equality_comparisons_and_sameness>"
        );
      }
      case 'destructure': {
        return message.channel.send(
          "Qu'est-ce que la destructuration ? Comment ça marche ? Comment l'utiliser ?\nCe tutoriel très court mais concis explique la destructuration, qui ressemble à ceci: `const { Client } = require('discord.js');`\n<https://wesbos.com/destructuring-objects/>"
        );
      }
      case 'websocket':
      case 'ws': {
        switch (args[1]) {
          case 'intents': {
            return message.channel.send(
              "Utilisation des intents websocket, limitation des événements et diminution de l'utilisation de la mémoire:\n<https://discordjs.guide/popular-topics/intents.html>"
            );
          }
          case 'master-intents': {
            return message.channel.send(
              "La branche principale de Discord.js nécessite que vous choisissiez des intents appropriés (car elle utilise une nouvelle version de l'API de Discord).\nPour plus d'informations sur l'utilisation des intents websocket: <https://discordjs.guide/popular-topics/intents.html>\n\nNotez qu'il s'agit d'un guide v12 - dans la branche master, les intents sont fournis directement dans les ClientOptions:\n```diff\n- const client = new Client({ ws : { intents : ['GUILDS', 'GUILD_MESSAGES'] } });\n+ const client = new Client({ intents : ['GUILDS', 'GUILD_MESSAGES'] });\n```"
            );
          }
        }
        return message.channel.send({
          embed: {
            color: 'BLUE',
            author: {
              name: message.author.username,
              icon_url: message.author.displayAvatarURL({ dynamic: true }),
            },
            description:
              'Liste de tout les tags liés au websocket\n\n`intents`, `master-intents`',
          },
        });
      }
      case 'hyperlien':
      case 'hyperlink': {
        return message.channel.send(
          'Vous pouvez utiliser la syntaxe markdown standard pour afficher des liens cliquables dans les embeds sans afficher l\'url:\n```md\n"[texte](url)"\n\'[texte](url "texte optionnel à afficher lorsque la souris passe dessus")\'\n"[texte](url \'texte optionnel à afficher lorsque la souris passe dessus\')"\n```\nCela ne fonctionne que dans la description d\'un embed et les values des fields des embeds. Les Webhooks peuvent également utiliser des liens hypertexte dans le contenu des messages.'
        );
      }
      case 'purge': {
        return message.channel.send(
          "En raison des limitations de l'API Discord, les bots ne peuvent plus bulk delete les messages de plus de 14 jours. Si vous souhaitez supprimer tous les messages d'un channel, il suffit de cloner le channel et supprimer l'ancien."
        );
      }
      case 'ping-command': {
        return message.channel.send(
          `Ping (heartbeat) de la, ou des connexion(s) de la gateway: <Client>.ws.ping\n> Note: Un ping d'un shard spécifique peut être trouvé sur l'instance WebSocketShard à partir de; <Client>.ws.shards -> .ping\n\nUtilisation d'un aller-retour (d'où le nom ping-pong) pour déterminer la latence:\n\`\`\`js\nmessage.channel.send('Pinging...').then(sent => {\n    sent.edit(\`Pong! Took \${sent.createdTimestamp - message.createdTimestamp}ms\`);\n});\n\`\`\``
        );
      }
      case 'intents': {
        return message.channel.send(
          "Si votre bot ne répond pas aux évenements `guildMemberAdd` & `guildMemberRemove` ou bien qu'il ne détecte pas la presence des personnes c'est que vous n'avez pas activé vos intents de gateway\nVoilà comment les activer\nhttps://imgur.com/a/YDEZRIh"
        );
      }
      case 'of-null':
      case 'of-undefined': {
        return message.channel.send(
          "`TypeError: Cannot read property 'bar' of undefined`\nLa variable dont vous essayez d'accéder à la propriété bar est undefined, pas bar lui-même ! | foo.bar - la valeur de foo est undefined.\nLe stack pointe exactement sur la ligne où l'erreur se produit.\nPour plus d'informations: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cant_access_property>"
        );
      }
      case 'collector': {
        return message.channel.send(
          `Un guide sur les collecteurs et la prise en compte des contributions supplémentaires des utilisateurs: <https://discordjs.guide/popular-topics/collectors.html>`
        );
      }
      case 'ask': {
        return message.channel.send(
          "Ne demandez pas si vous pouvez poser une question, posez-la ! Si quelqu'un connaît la réponse, il fera de son mieux pour vous aider."
        );
      }
      case '<>': {
        return message.channel.send(
          'Que signifient ces trucs de `<Class>` et de `Class#method` ? <https://discordjs.guide/additional-info/notation.html>'
        );
      }
      case 'swearwords': {
        return message.channel.send(
          '```js\nconst swearWords = ["darn", "sucks", "frak", "shit"];\nif (swearWords.some(word => message.content.includes(word)))) {\nmessage.reply("Oh no you said a bad word!!!");\n}\n```\nAvec l\'aimabilité de <https://anidiots.guide/examples/miscellaneous-examples#swear-detector>, vous pouvez adapter cette méthode pour qu\'elle fonctionne avec n\'importe quel type de mots dans une black-list.  Vous pouvez également utiliser une expression rationnelle pour plus de flexibilité.'
        );
      }
      case 'heroku': {
        return message.channel.send(
          "Raisons pour lesquelles vous ne devriez pas utiliser Heroku pour votre bot:\n- Les bots ne sont pas ce pour quoi la plateforme est conçue. Heroku est conçu pour fournir des serveurs web (comme Django, Flask, etc.). C'est pourquoi ils vous donnent un nom de domaine et ouvrent un port sur leur émulateur local.\n- L'environnement de Heroku est fortement conteneurisé, ce qui le rend significativement sous-puissant pour un cas d'utilisation standard.\n- L'environnement de Heroku est volatile. Afin de gérer la quantité insensée d'utilisateurs essayant de l'utiliser pour leurs propres applications, Heroku disposera de votre environnement chaque fois que votre application mourra, à moins que vous ne payiez.\n- Et à cause de beaucoup d'autres problèmes...."
        );
      }
      case 'find': {
        return message.channel.send(
          "`[v12] TypeError : fn.bind is not a function`\n```diff\n- someCollection.find('property', value);\n+ someCollection.find(element => element.property === value)\n```Collection#find ne peut être utilisé qu'avec une fonction et non avec une paire propriété-valeur comme dans les versions précédentes."
        );
      }
      case 'dashboard': {
        return message.channel.send(
          "Créer un dashboard n'est pas une mince affaire. Cela nécessite un grand nombre d'éléments mobiles, notamment express, des modèles, oauth2 et un site Web. Si ce genre de choses est essentiel pour vous, consultez <https://github.com/AnIdiotsGuide/guidebot/tree/dashboard> qui est un exemple fonctionnel complet d'un dashboard discord.js intégré à un bot. Remarque: cela ne fonctionnera pas sur un bot shardé, mais c'est un bon point de départ pour les petits bots."
        );
      }
      case 'avatar': {
        return message.channel.send(
          "`[v12]`  `.displayAvatarURL`, `.avatarURL`, et `.iconURL` sont maintenant des méthodes qui autorisent les options d'url d'image\n```diff\n- user.avatarURL\n+ user.avatarURL()\n+ user.avatarURL({ dynamic : boolean, format : string, size : number })\n- guild. iconURL\n+ guild.iconURL()\n+ guild.iconURL({ dynamic : boolean, format : string, size : number })\n```\n<https://discord.js.org/#/docs/main/stable/typedef/ImageURLOptions>"
        );
      }
      case 'bot': {
        return message.channel.send(
          "```js\nconst Discord = require('discord.js');\nconst client = new Discord.Client();\nclient.on('ready', () => {\n  console.log(\"Il fait beau dehors, n'est-ce pas ?\");\n});\nclient.login('votre token');\n```"
        );
      }
      case 'client': {
        return message.channel.send(
          "**Client** est le principal centre d'interaction avec l'API Discord, et le point de départ de tout bot.\n\nPour définir le client, utilisez:\n```js\nconst client = new Discord.Client();\n```\nNe créez pas un nouveau client pour chaque commande, événement ou autre, utilisez le même client pour tout.\nConsultez le guide pour plus d'informations: <https://discordjs.guide/creating-your-bot/>"
        );
      }
      case 'template-literal': {
        return message.channel.send(
          'Au lieu de faire: `let b = a + "some string";` utilisez les templates literals.\nComprendre les templates literals en JavaScript:\n<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals>'
        );
      }
      case 'embed': {
        return message.channel.send(
          "Construction et envoi d'embeds : <https://discordjs.guide/popular-topics/embeds.html>"
        );
      }
      case 'dnw':
      case 'does-not-work': {
        return message.channel.send(
          "Pour vous aider, nous avons besoin de plus d'informations:\n• Que tentez-vous de faire ?\n• Quel est votre code ? \n• Quelles sont les erreurs et les logs dont vous disposez ?"
        );
      }
      case 'embed-limits': {
        return message.channel.send(stripIndents`
        \`\`\`
        Limites de caractères des embeds:
        Titre: 256
        Nom de l'auteur: 256
        Description: 4096
        Titre du field: 256
        Value du field: 1024
        Footer: 2048
        \`\`\`
        • Fields: 25, embeds par message: 10
        • Caractères dans tous les embeds d'un message: 6000
        • <https://discord.com/developers/docs/resources/channel#embed-limits>
        `);
      }
    }
  }
};
