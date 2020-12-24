// Creating the client
const Discord = require("discord.js");
const client = new Discord.Client();
const token = 'NzkxMDAyNTk4Nzg5MzQ5Mzg2.X-I0kw.Kpo0q_tmL3LpTUml9qGwXlywikI';

// Setting up command handling
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => 
  file.endsWith('.js')
);

for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


// Online message
client.once('ready', () => {
  console.log('h8bot is online!');
});

// Command handling
const prefix = '!';

client.on('message', message => {
  // Check if message uses command prefix or if the message was sent by the bot
  if(!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'youtube') {
    client.commands.get('youtube').execute(message, args);
    console.log(message.content + ' ran successfully!');
  } else if (command === 'twitter') {
    client.commands.get('twitter').execute(message, args);
    console.log(message.content + ' ran successfully!');
  } else if (command === 'mod') {
    client.commands.get('mod').execute(message, args);
    console.log(message.content + ' ran successfully!');
  } else if (command === 'plsgivemod') {
    client.commands.get('plsgivemod').execute(message, args);
    console.log(message.content + ' ran successfully!');
  } else if (command === 'commands') {
    client.commands.get('commands').execute(message, args, client.commands);
    console.log(message.content + ' ran successfully!');
  } else {
    message.channel.send('Invalid command detected OOF');
    console.log('Invalid command: \"' + message.content + '\"');
  }
});

// Must be last line, pls n thank
client.login(token);
