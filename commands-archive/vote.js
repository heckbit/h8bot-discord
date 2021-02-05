module.exports = {
  name: "vote",
  description:
    "Vote in the H8bitties!\n- !vote <number> in the category channel to pick a winner!",
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

    var channelName = message.channel.name;

    if (channelName === "category-one") {
      recordVote(1, args[0]);
    } else if (channelName === "category-two") {
      recordVote(2, args[0]);
    } else if (channelName === "category-three") {
      recordVote(3, args[0]);
    } else if (channelName === "category-four") {
      recordVote(4, args[0]);
    } else if (channelName === "category-five") {
      recordVote(5, args[0]);
    } else if (channelName === "category-six") {
      recordVote(6, args[0]);
    } else if (channelName === "category-seven") {
      recordVote(7, args[0]);
    } else if (channelName === "category-eight") {
      recordVote(8, args[0]);
    } else if (channelName === "category-nine") {
      recordVote(9, args[0]);
    } else if (channelName === "category-ten") {
      recordVote(10, args[0]);
    } else {
      var invalidEmbed = new Discord.MessageEmbed();
      invalidEmbed.setTitle("You used this command in the wrong channel!");
      invalidEmbed.setDescription(
        "Please go to one of the voting category channels to use this command."
      );
      invalidEmbed.setColor("#02A9FF");
      message.channel.send(invalidEmbed);
    }

    fs.writeFileSync(path, JSON.stringify(votesData, null, 2));

    function recordVote(id, vote) {
      var voteEmbed = new Discord.MessageEmbed();
      voteEmbed.setColor("#B400FF");

      if (vote <= votesData[id - 1].nominees.length && vote > 0) {
        var catName = votesData[id - 1].name;
        var nominee = votesData[id - 1].nominees[vote - 1].name;
        var didVote = votesData[id - 1].nominees[vote - 1].votes.includes(
          message.author.id
        );

        console.log(didVote);

        if (didVote) {
          voteEmbed.setTitle("You've already voted for " + nominee + "!");
          voteEmbed.setDescription(
            "You can vote for someone else, or move on the the next category."
          );
        } else {
          votesData[id - 1].nominees[vote - 1].votes.push(message.author.id);

          let fieldDataArray = [];
          for (
            let i = 0;
            i <= votesData[id - 1].nominees.length - 1 && i <= 25;
            i++
          ) {
            let fieldData = {
              name: "",
              value: "",
              inline: false,
            };
            let num = i + 1;
            fieldData.name = num + ". " + votesData[id - 1].nominees[i].name;
            fieldData.value =
              "Votes: " + votesData[id - 1].nominees[i].votes.length;
            fieldDataArray[i] = fieldData;
          }
          voteEmbed.setTitle("Current results:");
          voteEmbed.addFields(fieldDataArray);
        }
      } else {
        voteEmbed.setTitle("Invalid vote!");
        voteEmbed.setDescription(
          "That is not a valid vote. Try using !vote <number below> to cast your vote."
        );

        let fieldDataArray = [];

        for (
          let i = 0;
          i <= votesData[id - 1].nominees.length - 1 && i <= 25;
          i++
        ) {
          let fieldData = {
            name: "",
            value: "",
            inline: false,
          };
          let num = i + 1;
          fieldData.name = num + ". " + votesData[id - 1].nominees[i].name;
          fieldData.value =
            "!vote " + num + " for " + votesData[id - 1].nominees[i].name;
          fieldDataArray[i] = fieldData;
        }

        voteEmbed.addFields(fieldDataArray);
      }

      message.channel.send(voteEmbed);
    }
  },
};
