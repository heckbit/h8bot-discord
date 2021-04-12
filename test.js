const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 'p!'

const fs = require('fs');
const { request } = require('http');

client.commands = new Discord.Collection();




const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
   const command = require(`./commands/${file}`);

   client.commands.set(command.name, command);
}

client.once('ready', () => {
   console.log('Plasm is online for you to use!');
   client.user.setActivity('People type p!help', {type: 'WATCHING'}).catch(console.error);
});

client.on('message', message => {
   if (!message.content.startsWith(prefix) || message.author.bot) return;

   const args = message.content.slice(prefix.length).split(/ +/);
   const command = args.shift().toLowerCase();
   
   

   if (command === 'ping') {
       client.commands.get('ping').execute(message, args);

   } else if (command == 'youtube') {
       client.commands.get('youtube').execute(message, args);

   } else if (command == 'twitch') {
       client.commands.get('twitch').execute(message, args);

   } else if (command == 'tiktok') {
       client.commands.get('tiktok').execute(message, args);

   } else if (command == 'dogwater') {
       client.commands.get('dogwater').execute(message, args);

   } else if (command == 'help') {
      client.commands.get('help').execute(message, args, Discord);

   } else if (command == 'clear') {
       client.commands.get('clear').execute(message, args);

   } else if (command === 'kick') {
       client.commands.get('kick').execute(message, args);

   } else if (command === 'ban') {
       client.commands.get('ban').execute(message, args);

   } else if (command === 'mute') {
       client.commands.get('mute').execute(message, args);

   } else if (command === 'unmute') {
       client.commands.get('unmute').execute(message, args);

   } else if (command == 'hack') {
       client.commands.get('hack').execute(message, args);

   } else if (command == '8ball') {
       client.commands.get('8ball').run(client, message, args);

   } else if (command == 'trivia') {
       client.commands.get('trivia').run(client, message, args, Discord);

   } else if (command == 'creators') {
    client.commands.get('creators').execute(message, args);
   }
});
