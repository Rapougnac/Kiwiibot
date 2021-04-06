import { Events, Command } from "../Interfaces";
import { Message } from "discord.js";

export const event: Events = {
    name: "message",
    execute (client, message: Message) {
        if(message.author.bot || !message.content.startsWith(client.config.discord.default_prefix)) return;

        const args = message.content.slice(client.config.discord.default_prefix.length).trim().split(/ +/g);

        const command = args.shift().toLowerCase()
        if(!command) return;

        const commands = client.commands.get(command) || client.aliases.get(command);

        if (commands) (commands as Command).execute(client, message, args);
    },
};