require('dotenv').config();

// Creating the client
const Discord = require("discord.js");
// const client = new Discord.Client();
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"],
});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command-handler", "event-handler"].forEach((handler) => {
  console.log(`>>> handler loaded`);
  require(`./handlers/${handler}`)(client, Discord);
});

// pls leave here thanks
client.login(process.env.TOKEN);
