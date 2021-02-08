module.exports = {
  name: "coins",
  aliases: ['c', 'coin'],
  description:
    "Shows your current number of coins.\n- !coins daily to get your daily reward.\n- !coins weekly to get your weekly reward.",
  execute(client, message, args, Discord) {
    const fs = require("fs");
    const path = "././coins.json";
    var data;
    var coinsData = [];
    const dailyRedemption = 100;
    const weeklyRedemption = 1000;
    const oneDay = 86400000;
    const oneWeek = 604800000;

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
        console.log(`${message.author.username} has a coins account!`);
      }
    }

    if (userExists) {
      var gambler = coinsData[userIndex];
      if (args[0] === "daily") {
        var date = Date.now();
        var dailyEmbed = new Discord.MessageEmbed();
        if (gambler.dailyDate + oneDay <= date) {
          var coins = gambler.coins + dailyRedemption;
          gambler.coins = coins;
          gambler.dailyDate = date;
          coinsData[userIndex] = gambler;

          dailyEmbed.setTitle("Here's your daily reward!");
          dailyEmbed.setThumbnail('https://img.pngio.com/pixel-coin-png-png-collections-at-sccprecat-pixel-coin-png-1800_1900.png');
          dailyEmbed.setDescription(
            "You redeemed your daily 100 coins.\nCoins: " + gambler.coins
          );
          dailyEmbed.setColor("#FFD700");
          message.channel.send(dailyEmbed);
        } else {
          var dateNow = Date.now();
          var timeInt = oneDay - (dateNow - gambler.dailyDate);

          let hours = Math.floor(timeInt / 3600000);
          timeInt = timeInt % 3600000;
          let minutes = Math.floor(timeInt / 60000);
          timeInt = timeInt % 60000;
          let seconds = Math.floor(timeInt / 1000);

          var nextRedeem = hours + ":" + minutes + ":" + seconds;

          dailyEmbed.setTitle("You already redeemed your daily reward!");
          dailyEmbed.setThumbnail('https://img.pngio.com/pixel-coin-png-png-collections-at-sccprecat-pixel-coin-png-1800_1900.png');
          dailyEmbed.setDescription("Next daily reward: " + nextRedeem);
          dailyEmbed.setColor("#FFD700");
          message.channel.send(dailyEmbed);
        }
      } else if (args[0] === "weekly") {
        var date = Date.now();
        var weeklyEmbed = new Discord.MessageEmbed();
        if (gambler.weeklyDate + oneWeek <= date) {
          var coins = gambler.coins + weeklyRedemption;
          gambler.coins = coins;
          gambler.weeklyDate = date;
          coinsData[userIndex] = gambler;

          weeklyEmbed.setTitle("Here's your weekly reward!");
          weeklyEmbed.setThumbnail('https://img.pngio.com/pixel-coin-png-png-collections-at-sccprecat-pixel-coin-png-1800_1900.png');
          weeklyEmbed.setDescription(
            "You redeemed your weekly 1000 coins.\nCoins: " + gambler.coins
          );
          weeklyEmbed.setColor("#FFD700");
          message.channel.send(weeklyEmbed);
        } else {
          var dateNow = Date.now();
          var timeInt = oneWeek - (dateNow - gambler.weeklyDate);

          let days = Math.floor(timeInt / 86400000);
          timeInt = timeInt % 86400000;
          let hours = Math.floor(timeInt / 3600000);
          timeInt = timeInt % 3600000;
          let minutes = Math.floor(timeInt / 60000);
          timeInt = timeInt % 60000;
          let seconds = Math.floor(timeInt / 1000);

          var nextRedeem = days + ":" + hours + ":" + minutes + ":" + seconds;
          weeklyEmbed.setTitle("You already redeemed your weekly reward!");
          weeklyEmbed.setThumbnail('https://img.pngio.com/pixel-coin-png-png-collections-at-sccprecat-pixel-coin-png-1800_1900.png');
          weeklyEmbed.setDescription("Next weekly reward: " + nextRedeem);
          weeklyEmbed.setColor("#FFD700");
          message.channel.send(weeklyEmbed);
        }
      } else {
        var coinsEmbed = new Discord.MessageEmbed();
        coinsEmbed.setTitle(gambler.name + "'s Account");
        coinsEmbed.setThumbnail('https://img.pngio.com/pixel-coin-png-png-collections-at-sccprecat-pixel-coin-png-1800_1900.png');
        coinsEmbed.setDescription(
          "Name: " + gambler.name + "\nCoins: " + gambler.coins
        );
        coinsEmbed.setColor("#FFD700");

        message.channel.send(coinsEmbed);
      }
    } else {
      var notFoundEmbed = new Discord.MessageEmbed();
      notFoundEmbed.setTitle("Hey, " + message.author.username + "!");
      notFoundEmbed.setThumbnail('https://img.pngio.com/pixel-coin-png-png-collections-at-sccprecat-pixel-coin-png-1800_1900.png');
      notFoundEmbed.setDescription(
        "We noticed you don't have an account yet.\nIf you would like to make one, type !gamble"
      );
      notFoundEmbed.setColor("#FFD700");

      message.channel.send(notFoundEmbed);
    }

    fs.writeFileSync(path, JSON.stringify(coinsData, null, 2));
  },
};
