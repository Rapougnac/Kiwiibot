import Client from '../util/Client';
import { ClientEvents } from "discord.js";

interface Run {
    (client: Client, ...args: any[]);
};

export interface Events {
    name: keyof ClientEvents;
    execute: Run;
    
};