const Discord = require("discord.js");

module.exports = {
	name: 'infobot',
	aliases: [],
	description: '',
	category: 'Infos',
	utilisation: '{prefix}infobot',
	execute(client, message, args) {
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
		});
	},
};
