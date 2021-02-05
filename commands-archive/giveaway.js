module.exports = {
  name: "giveaway",
  description: "Gets a winner for the giveaway",
  execute(client, message, args, Discord) {
    const fs = require("fs");
    const path = "././votes.json";
    var data;
    var votesData = [];

    if (fs.existsSync(path)) {
      data = fs.readFileSync(path, (err) => {
        if (err) throw err;
      });
      votesData = JSON.parse(data);
    }

    var entries = [];

    for (let i = 0; i < votesData.length; i++) {
      for (let j = 0; j < votesData[i].nominees.length; j++) {
        for (let k = 0; k < votesData[i].nominees[j].votes.length; k++) {
          entries.push(votesData[i].nominees[j].votes[k]);
        }
      }
    }

    var winnerID = entries[Math.floor(Math.random() * entries.length)];

    var winnerEmbed = new Discord.MessageEmbed();
    winnerEmbed.setTitle("🎉🎉Congratulations!!🎉🎉");
    winnerEmbed.setDescription(
      "Hey <@" + winnerID + "> you won the giveaway!!!🎉🎉"
    );
    winnerEmbed.setColor("#B400FF");

    message.channel.send(winnerEmbed);
  },
};
