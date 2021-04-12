module.exports = {
  name: "agerole",
  description: "Sets up reaction role message for age roles",
  async execute(client, message, args, Discord) {
    const channel = message.guild.channels.cache.find((chan) =>
      chan.name.includes("personal")
    );

    const ageRange1 = message.guild.roles.cache.find(
      (role) => role.name === "13-18"
    );
    const ageRange2 = message.guild.roles.cache.find(
      (role) => role.name === "18-21"
    );
    const ageRange3 = message.guild.roles.cache.find(
      (role) => role.name === "21-25"
    );
    const ageRange4 = message.guild.roles.cache.find(
      (role) => role.name === "25+"
    );

    const ageRange1Emote = "👶";
    const ageRange2Emote = "🧒";
    const ageRange3Emote = "🧑";
    const ageRange4Emote = "🧓";

    if (!channel) {
      message.reply(
        " you can't use that command here!  You don't have a color channel!"
      );
    } else {
      let embed = new Discord.MessageEmbed()
        .setColor("#02A9FF")
        .setTitle(
          "React with one of the below emotes to change your name color!"
        )
        .setDescription(
          `You can pick from these colors: \n\n` +
            `${ageRange1Emote} ➤ ${ageRange1}\n\n` +
            `${ageRange2Emote} ➤ ${ageRange2}\n\n` +
            `${ageRange3Emote} ➤ ${ageRange3}\n\n` +
            `${ageRange4Emote} ➤ ${ageRange4}\n\n`
        );

      let messageEmbed = await channel.send(embed);
      messageEmbed.react(ageRange1Emote);
      messageEmbed.react(ageRange2Emote);
      messageEmbed.react(ageRange3Emote);
      messageEmbed.react(ageRange4Emote);
    }

    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id === channel.id) {
        if (reaction.emoji.name === ageRange1Emote) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(ageRange1);
        }
        if (reaction.emoji.name === ageRange2Emote) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(ageRange2);
        }
        if (reaction.emoji.name === ageRange3Emote) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(ageRange3);
        }
        if (reaction.emoji.name === ageRange4Emote) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(ageRange4);
        }
      } else {
        return;
      }
    });

    client.on("messageReactionRemove", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id === channel.id) {
        if (reaction.emoji.name === ageRange1Emote) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(ageRange1);
        }
        if (reaction.emoji.name === ageRange2Emote) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(ageRange2);
        }
        if (reaction.emoji.name === ageRange3Emote) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(ageRange3);
        }
        if (reaction.emoji.name === ageRange4Emote) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(ageRange4);
        }
      } else {
        return;
      }
    });
  },
};
