import { Events }  from "../Interfaces";

export const event: Events = {
    name: "ready",
    execute (client) {
        console.log(`${client.user.tag} is online!(ts)`);
    }
}