module.exports = {
  name: "results",
  description:
    "Vote in the H8bitties!\n- !results in the category channel to see who's winning!",
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
      getResults(1);
    } else if (channelName === "category-two") {
      getResults(2);
    } else if (channelName === "category-three") {
      getResults(3);
    } else if (channelName === "category-four") {
      getResults(4);
    } else if (channelName === "category-five") {
      getResults(5);
    } else if (channelName === "category-six") {
      getResults(6);
    } else if (channelName === "category-seven") {
      getResults(7);
    } else if (channelName === "category-eight") {
      getResults(8);
    } else if (channelName === "category-nine") {
      getResults(9);
    } else if (channelName === "category-ten") {
      getResults(10);
    } else {
      var invalidEmbed = new Discord.MessageEmbed();
      invalidEmbed.setTitle("You used this command in the wrong channel!");
      invalidEmbed.setDescription(
        "Please go to one of the voting category channels to use this command."
      );
      invalidEmbed.setColor("#02A9FF");
      message.channel.send(invalidEmbed);
    }

    function getResults(id) {
      var resultsEmbed = new Discord.MessageEmbed();
      resultsEmbed.setColor("#B400FF");

      let resultsArr = votesData[id - 1].nominees;

      let fieldDataArray = [];

      for (i = 0; i <= resultsArr.length - 1 && i <= 25; i++) {
        let fieldData = {
          name: "",
          value: "",
          inline: false,
        };

        var num = i + 1;
        fieldData.name = num + ". " + resultsArr[i].name;
        fieldData.value = "Votes: " + resultsArr[i].votes.length;
        fieldDataArray[i] = fieldData;
      }

      resultsEmbed.setTitle(votesData[id - 1].name + " results:");
      resultsEmbed.addFields(fieldDataArray);

      message.channel.send(resultsEmbed);
    }
  },
};
