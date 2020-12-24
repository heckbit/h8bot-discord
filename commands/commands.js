const { DiscordAPIError } = require("discord.js");

const Discord = require("discord.js");

module.exports = {
  name: 'commands',
  description: "Provides a list of commands in an embed.",
  execute(message, args, commands) {
    const comArray = commands.array();
    let fieldDataArray = [];

    for (i = 0; i <= comArray.length-1 && i <= 25; i++) {
      let fieldData = {
        name: '',
        value: '',
        inline: false,
      };
      fieldData.name = '!' + comArray[i].name;
      fieldData.value = comArray[i].description;
      fieldDataArray[i] = fieldData;
    }
    
    const messageEmbed = new Discord.MessageEmbed();
    messageEmbed.addFields(fieldDataArray);
    messageEmbed.setTitle('Commands');
    messageEmbed.setDescription('A list of all server commands');
    messageEmbed.setColor('#02A9FF');

    message.channel.send(messageEmbed);
  }
}