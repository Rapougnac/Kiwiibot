export interface Config {
    discord: {
        token: string;
        default_prefix: string;
        text: string;
        activity: string;
        status: string;
        dev: {
            include_cmd: string[];
            exclude_cmd: string[];
            active: boolean;
        };
        owners: string[];
    };
    emojis: {
        off: string;
        error: string;
        queue: string;
        music: string;
        success: string;
    };
    ytsearcher: {
        key: string;
    };
    amethyste: {
        client: string;
    };
    filters: string[];
    allowedFeatures: string[];
    clientMap: {
        web: string;
        mobile: string;
        desktop: string;
    };
    colors: {
        base: string;
        positive: string;
        neutral: string;
        negative: string;
    };
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
        };
    };
    verificationLVL: {
        NONE: string;
        LOW: string;
        MEDIUM: string;
        HIGH: string;
        VERY_HIGH: string;
    };
    chatbot: {
        id: string;
        key: string;
    };
};