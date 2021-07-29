import { User } from 'discord.js';
import { Client, ClientOptions, Collection, ImageURLOptions, ImageSize, AllowedImageFormat } from 'discord.js';
import { I18n } from 'i18n';
declare module "discord.js" {
    interface MessageMentionOptions {
        repliedUser?: boolean;
    }

    interface Message {
        inlineReply(
            content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions,
        ): Promise<Message>;
        inlineReply(options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
        inlineReply(options: MessageOptions): Promise<Message | Message[]>;
        inlineReply(content: StringResolvable, options: (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
        inlineReply(content: StringResolvable, options: MessageOptions & { split: true | SplitOptions }): Promise<Message[]>;
        inlineReply(content: StringResolvable, options: MessageOptions): Promise<Message | Message[]>;
    }

    interface Guild {
        i18n: I18n;
        prefix: string;
    }
    interface User {
        BannerUser(userID: string, hash: string, format?: AllowedImageFormat, size: ImageSize, dynamic?: boolean, root?: string): string;
        displayUserBannerURL(ImageURLOptions: ImageURLOptions & { dynamic?: boolean }): ?string;
        hasBanner(): boolean;
    }
}

type SubOptions = {
    name: string;
    type: number;
    value: string;
}

type Options = {
    name: string;
    type: number;
    options: SubOptions[];
}

type Data = {
    name: string;
    id: string;
    content?: string;
    options?: Options[];
    resolved?: {
        user: import('discord.js').User
        member: import('discord.js').GuildMember
    }
}
type Member = {
    avatar?: string;
    deaf: boolean;
    is_pending: boolean;
    joined_at: boolean;
    mute: boolean;
    nick?: string;
    permissions: string;
    premium_since: string;
    roles: Array<string>;
    user: User
}
type InteractionUser = {
    avatar: string;
    discriminator: string;
    id: string;
    public_flags: number;
    username: string;
}
type Interaction = {
    member?: Member;
    user?: InteractionUser;
    guild_id?: string;
    data: Data;
    token: string;
    type: number;
    version: number;
    application_id: string;
    channel_id: string;
    id: string;
}

type CommandOptions = {
    name: string;
    description: string;
    /**
    * One of `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8` and `9`
    * 
    * `1` = SUB_COMMAND
    * 
    * `2` = SUB_COMMAND_GROUP
    * 
    * `3` = STRING
    * 
    * `4` = INTEGER
    * 
    * `5` = BOOLEAN
    * 
    * `6` = USER
    * 
    * `7` = CHANNEL
    * 
    * `8` = ROLE
    * 
    * `9` = MENTIONABLE
    */
    type: number;
    required?: boolean;
    choices: [
        {
            name: string;
            value: string;
        }
    ]
    options: CommandOptions[];
}

type SlashCommand = {
    name: string;
    description: string;
    global: boolean;
    commandOptions?: CommandOptions[];
}

declare namespace Intl {
    class ListFormat {
        public format: (items: [string?]) => string;
    }
}

type Config = {
    domain: string;
    port: number;
    usingCustomDomain: boolean;
    clientSecret: string;
    discord: {
        token: string;
        status: string;
        defaultPerms: string[];
        dev: {
            inculde_cmd: string[];
            exclude_cmd: string[];
            active: boolean;
        }
    }
    emojis: {
        off: string;
        error: string;
        queue: string;
        music: string;
        success: string;
    }
    ytsearcher: {
        key: string;
    }
    genius_lyrics: {
        TOKEN: string;
    }
    amethyste: {
        client: string;
    }
    filters: string[];
    channels: {
        debug: string;
        logs: string;
    }
    clientMap: {
        web: string;
        mobile: string;
        desktop: string;
    }
    colors: {
        base: string;
        positive: string;
        neutral: string;
        negative: string;
    }
    database: {
        enable: boolean;
        URI: string;
        config: {
            useUnifiedTopology: boolean;
            useNewUrlParser: boolean;
            autoIndex: boolean;
            poolSize: number;
            connectTimeoutMS: number;
            family: number;
        }
    }
    verificationLVL: {
        NONE: string;
        LOW: string;
        MEDIUM: string;
        HIGH: string;
        VERY_HIGH: string;
    }
    chatbot: {
        id: string;
        key: string;
    }
}