// Creating the client
const Discord = require("discord.js");
// const client = new Discord.Client();
const client = new Discord.Client({
  ws: {
    intents: [
      `GUILDS`,
      `GUILD_MEMBERS`,
      `GUILD_BANS`,
      `GUILD_EMOJIS`,
      `GUILD_INTEGRATIONS`,
      `GUILD_WEBHOOKS`,
      `GUILD_INVITES`,
      `GUILD_VOICE_STATES`,
      `GUILD_PRESENCES`,
      `GUILD_MESSAGES`,
      `GUILD_MESSAGE_REACTIONS`,
      `GUILD_MESSAGE_TYPING`,
      `DIRECT_MESSAGES`,
      `DIRECT_MESSAGE_REACTIONS`,
      `DIRECT_MESSAGE_TYPING`,
    ],
  },
});
const fs = require("fs");
const token = fs.readFileSync("./token.txt").toString();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command-handler", "event-handler"].forEach((handler) => {
  console.log(`>>> handler loaded`);
  require(`./handlers/${handler}`)(client, Discord);
});

// pls leave here thanks
client.login(token);
