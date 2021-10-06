import { BotConfig, config } from "../config/config";
import twit from "twit";

async function twitStream() {
  const options = {
      consumer_key: config.consumer_key,
      consumer_secret: config.consumer_secret,
      access_token: config.access_token,
      access_token_secret: config.access_token_secret
  }

  const t = new twit(options);
  return t;
}

export { twitStream };
