// Creating the client
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const token = fs.readFileSync("./token.txt").toString();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command-handler", "event-handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

client.login(token);
