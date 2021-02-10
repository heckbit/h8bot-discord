// Creating the client
const Discord = require("discord.js");
const client = new Discord.Client({
  ws: { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_PRESENCES"] },
});
const fs = require("fs");
const token = fs.readFileSync("./token.txt").toString();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command-handler", "event-handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

// pls leave here thanks
client.login(token);
