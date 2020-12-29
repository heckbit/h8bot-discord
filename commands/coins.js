module.exports = {
  name: "coins",
  description: "Checks how many coins you have",
  execute(message, args) {
    const fs = require("fs");
    const Discord = require("discord.js");
    const path = "././coins.json";
    var data;
    var coinsData = [];

    // Checks if coins.json exists, if it does the data is pulled
    // If coins.json does not exist, writes a new json formatted file
    if (fs.existsSync(path)) {
      data = fs.readFileSync(path, (err) => {
        if (err) throw err;
      });
      coinsData = JSON.parse(data);
    }

    // Determines if user is in the coin database
    var userExists = false;
    var userIndex;

    for (let i = 0; i < coinsData.length; i++) {
      if (coinsData[i].id === message.author.id) {
        userExists = true;
        userIndex = i;
        console.log("User found");
      }
    }

    if (userExists) {
      var gambler = coinsData[userIndex];
      var coinsEmbed = new Discord.MessageEmbed();
      coinsEmbed.setTitle(gambler.name + "'s Account");
      coinsEmbed.setDescription(
        "Name: " + gambler.name + "\nCoins: " + gambler.coins
      );
      coinsEmbed.setColor("#FFD700");

      message.channel.send(coinsEmbed);
    } else {
      var notFoundEmbed = new Discord.MessageEmbed();
      notFoundEmbed.setTitle("Hey, " + message.author.username + "!");
      notFoundEmbed.setDescription(
        "We noticed you don't have an account yet.\nIf you would like to make one, type !gamble"
      );
      notFoundEmbed.setColor("#FFD700");

      message.channel.send(notFoundEmbed);
    }
  },
};
