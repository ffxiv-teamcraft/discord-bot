import internal from "events";

/**
 * Discord bot config.
 *
 * Revisions to this file should not be committed to the repository.
 */
export type BotConfig = {
    /** the Discord bot token. */
    token: string,
    /** Prefix used for bot commands. */
    prefix: string,
    /** The name of the role that gives ultimate power over the bot. */
    botOwnerRoleName: string,
    /** The bot will add reactions to the command messages indicating success or failure. */
    enableReactions: boolean,
    /** Twitter Bot Keys*/
    twitter_username: string,
    consumer_key: string,
    consumer_secret: string,
    access_token: string,
    access_token_secret: string,
    /** Optional: HTTP request timeout to apply to all requests */
    timeout_ms?: number,
    /** Optional: requires SSL certificates to be valid */
    strictSSL?: boolean,
};

export let config: BotConfig = {
    token: process.env.DISCORD_TOKEN,
    prefix: process.env.PREFIX || "!!",
    botOwnerRoleName: "TeamcraftBot",
    enableReactions: true,
    twitter_username: "FFXIVTeamcraft",
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN,
};
