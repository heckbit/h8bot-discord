module.exports = {
  name: "roulette",
  description:
    "Gamble your coins away in a game of roulette!\n- !roulette to see all of the bets and odds\n- !roulette <bet name> <bet value>",
  execute(client, message, args, Discord) {
    const fs = require("fs");
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
    } else {
      fs.writeFileSync(path, JSON.stringify(coinsData, null, 2));
    }

    var userExists = false;
    var userIndex;

    for (let i = 0; i < coinsData.length; i++) {
      if (coinsData[i].id === message.author.id) {
        userExists = true;
        userIndex = i;
        console.log("User found");
      }
    }

    // Handling new and existing users gambling
    if (userExists) {
      // Logic for gambling
      var gambler = coinsData[userIndex];
      var amount = 0;

      if (args[0] === "all") {
        amount = gambler.coins;
      } else if (args[0] === "half") {
        amount = Math.round(gambler.coins / 2);
      } else {
        amount = parseInt(args);
      }

      // Check if amount is a real number
      if (!isNaN(amount)) {
        if (amount > gambler.coins) {
          var invalidGambleEmbed = new Discord.MessageEmbed();
          invalidGambleEmbed.setTitle("You can't bet coins you don't have!");
          invalidGambleEmbed.setDescription(
            "You currently have " +
              gambler.coins +
              " coins in your account.  Try betting that amount or less instead."
          );
          invalidGambleEmbed.setColor("#FFD700");
          message.channel.send(invalidGambleEmbed);
        } else {
          // ROULETTE LOGIC
          var gambleEmbed = new Discord.MessageEmbed();
          if (win) {
            gambleEmbed.setTitle("You lost!");
            gambleEmbed.setDescription(
              "The house always wins. Proft: " +
                profit +
                "\nCoins: " +
                gambler.coins
            );
          } else {
            gambleEmbed.setTitle("You won!");
            gambleEmbed.setDescription(
              "Looks like you beat the house this time. Proft: " +
                profit +
                "\nCoins: " +
                gambler.coins
            );
          }

          gambleEmbed.setColor("#FFD700");

          coinsData[userIndex] = gambler;

          message.channel.send(gambleEmbed);
        }
      } else {
        var invalidGambleEmbed = new Discord.MessageEmbed();
        invalidGambleEmbed.setTitle("Hey, that's not a number!");
        invalidGambleEmbed.setDescription(
          "Please try gambling a valid number instead (like 100 or 100.5)!"
        );
        invalidGambleEmbed.setColor("#FFD700");
        message.channel.send(invalidGambleEmbed);
      }
    } else {
      // Logic for creating a new user
      var newUser = {
        id: message.author.id,
        name: message.author.username,
        coins: 500,
        dailyDate: 0,
        weeklyDate: 0,
      };

      coinsData.push(newUser);

      var newUserEmbed = new Discord.MessageEmbed();
      newUserEmbed.setTitle(
        "You haven't gambled before! Ask your parents for permission :)"
      );
      newUserEmbed.setDescription(
        "Who needs parental permission!\nWe snuck " +
          newUser.coins +
          " coins into your account.\nTo get started, type !gamble <number of coins> or 'all' to gamble them away!"
      );
      newUserEmbed.setColor("#FFD700");

      message.channel.send(newUserEmbed);
    }

    fs.writeFileSync(path, JSON.stringify(coinsData, null, 2));
  },
};
