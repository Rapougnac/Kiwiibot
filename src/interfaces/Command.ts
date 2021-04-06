import Client from "../util/Client";

import { Message } from "discord.js";

export interface Run {
    (client: Client, message: Message, args: string[]);
};

export interface Command {
    name: string;
    description?: string;
    aliases?: string[];
    category?: string;
    cooldown?: number;
    utilisation?: string;
    ownerOnly?: boolean;
    guildOnly?: boolean;
    adminOnly?: boolean;
    nsfw?: boolean;
    permissions?: string[];
    clientPermissions?: string[];
    string?: string[];
    execute: Run;
}