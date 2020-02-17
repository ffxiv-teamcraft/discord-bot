# Teamcraft discord bot
Teamcraft Discord bot is an assistant focused bot designed to help moderators and troubleshooters assist Teamcraft users in the [Community Discord](https://discord.gg/RVxxUDu).

## Install Dependencies and Run
```
npm install
npm start
```

## Setting Up A Discord Bot

1. Please navigate to the [Discord Developer Portal](https://discordapp.com/developers/applications/) and sign in.
2. Create a new application and name it whatever you want.
3. Click the Bot tab and then click Add Bot.
4. On your bot page there will be a Token to copy. That will be the way your bot connects to discord.
5. Open up the [config](https://github.com/ArcaneDisgea/discord-bot/blob/master/src/config/config.ts#L18) and edit the line 18 to add your bot token. It should look something like the following. ``token: "YOURTOKENHERE",``
6. At this point you will need to invite the bot using a url similar to the following. ``https://discordapp.com/api/oauth2/authorize?client_id=YOURCLIENTID&permissions=2112&scope=bot`` It is very important that you use your client id **NOT** the bot token. You can find your client id back on your discord applications main tab.
7. Run ``npm start`` to start the bot up and you should be good to start playing around and testing things out.

## Contributing
Feel free to assist in any way! This bot is focused toward assisting the moderators and troubleshooters of the Teamcraft Discord, so please keep that in mind when making pull requests that expand the bots functionality. If you need help with anything please contact ArcaneDisgea#9124 or Miu#1568 in the [Teamcraft Discord](https://discord.gg/RVxxUDu)
