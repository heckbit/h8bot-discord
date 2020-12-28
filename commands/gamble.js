module.exports = {
  name: 'gamble',
  description: "Lets you gamble some coiny boys",
  execute(message, args) {
    const fs = require('fs');
    const Discord = require("discord.js");

    const data = fs.readFileSync('././coins.json', (err) => {
      if (err)
        throw err;
    });

    var coinsData = JSON.parse(data);

    //console.log(JSON.stringify(coinsData, null, 2));
    //if (coinsData.length > 0) {
      var userExists = false;
      var userIndex;

      for (let i = 0; i < coinsData.length; i++) {
        
        if (coinsData[i].id === message.author.id) {
          userExists = true;
          userIndex = i;
          console.log('User found');
        }
      }

      if (userExists) {
        // Logic for gambling
        var gambler = coinsData[userIndex];
        var msgArr = message.content.split(" ");
        let amount = parseInt(msgArr[1]);

        if(amount > gambler.coins){
          let invalidGambleEmbed = new Discord.MessageEmbed();
          invalidGambleEmbed.setTitle("You can't gamble coins you don't have!");
          invalidGambleEmbed.setDescription("You currently have "+gambler.coins+" coins in your account.  Try gambling that amount or less instead.");
          invalidGambleEmbed.setColor('#FFD700');
          message.channel.send(invalidGambleEmbed);
        } else {
          gambler.coins -= amount;
          let multiplier = gambleNumber(10);
          var val;

          if(multiplier < 2) {
            val = 0;
          } else if(multiplier < 3) {
            val = amount * .25;
          } else if(multiplier < 4) {
            val = amount * .5;
          } else if(multiplier < 6) {
            val = amount;
          } else if(multiplier < 8) {
            val = amount * 1.5;
          } else if(multiplier < 9) {
            val = amount * 2;
          } else {
            val = amount * 2.5;
          }

          gambler.coins += val;
          let profit = val - amount;

          let gambleEmbed = new Discord.MessageEmbed();
          if(profit < 0) {
            gambleEmbed.setTitle("You lost!");
            gambleEmbed.setDescription("The house always wins. Proft: " + profit);
          } else {
            gambleEmbed.setTitle("You won!");
            gambleEmbed.setDescription("Looks like you beat the house this time. Proft: " + profit);
          }
          
          gambleEmbed.setColor('#FFD700');

          coinsData[userIndex] = gambler;

          message.channel.send(gambleEmbed);
        }
      } else {
        // Logic for creating a new user
        let newUser = {
          "id": message.author.id,
          "name": message.author.username,
          "coins": 500
        }

        coinsData.push(newUser);
        console.log(coinsData);

        let newUserEmbed = new Discord.MessageEmbed();
        newUserEmbed.setTitle("You haven't gambled before! Ask your parents for permission :)");
        newUserEmbed.setDescription("Who needs parental permission!\nWe snuck 500 coins into your account.\nTo get started, type !gamble <number of coins> to gamble them away!");
        newUserEmbed.setColor('#FFD700');

        message.channel.send(newUserEmbed);
      }

      fs.writeFileSync('././coins.json', JSON.stringify(coinsData, null, 2));
    //}

    function gambleNumber (max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }
}