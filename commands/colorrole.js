module.exports = {
  name: "colorrole",
  description: "Sets up reaction role message for color roles",
  async execute(client, message, args, Discord) {
    const channel = message.guild.channels.cache.find((chan) =>
      chan.name.includes("color")
    );

    const seafoamGreenRole = message.guild.roles.cache.find(
      (role) => role.name === "Seafoam Green"
    );
    const sunsetOrangeRole = message.guild.roles.cache.find(
      (role) => role.name === "Sunset Orange"
    );
    const royalBlueRole = message.guild.roles.cache.find(
      (role) => role.name === "Royal Blue"
    );
    const justPeachyRole = message.guild.roles.cache.find(
      (role) => role.name === "Just Peachy"
    );
    const brightOrchidRole = message.guild.roles.cache.find(
      (role) => role.name === "Bright Orchid"
    );

    const seafoamGreenEmote = "🌵";
    const sunsetOrangeEmote = "🍊";
    const royalBlueEmote = "🌊";
    const justPeachyEmote = "🍑";
    const brightOrchidEmote = "🍆";

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
            `${seafoamGreenEmote} ➤ ${seafoamGreenRole}\n\n` +
            `${sunsetOrangeEmote} ➤ ${sunsetOrangeRole}\n\n` +
            `${royalBlueEmote} ➤ ${royalBlueRole}\n\n` +
            `${justPeachyEmote} ➤ ${justPeachyRole}\n\n` +
            `${brightOrchidEmote} ➤ ${brightOrchidRole}\n\n`
        );

      let messageEmbed = await channel.send(embed);
      messageEmbed.react(seafoamGreenEmote);
      messageEmbed.react(sunsetOrangeEmote);
      messageEmbed.react(royalBlueEmote);
      messageEmbed.react(justPeachyEmote);
      messageEmbed.react(brightOrchidEmote);
    }

    client.on("messageReactionAdd", async (reaction, user) => {
      console.log(">>> reaction added");
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id === channel.id) {
        console.log(">>> reaction in channel");
        if (reaction.emoji.name === seafoamGreenEmote) {
          console.log(">>> green emote");
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(seafoamGreenRole);
        }
        if (reaction.emoji.name === sunsetOrangeEmote) {
          console.log(">>> orange emote");
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(sunsetOrangeRole);
        }
        if (reaction.emoji.name === royalBlueEmote) {
          console.log(">>> blue emote");
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(royalBlueRole);
        }
        if (reaction.emoji.name === justPeachyEmote) {
          console.log(">>> peach emote");
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(justPeachyRole);
        }
        if (reaction.emoji.name === brightOrchidEmote) {
          console.log(">>> purple emote");
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(brightOrchidRole);
        }
      } else {
        return;
      }
    });

    client.on("messageReactionRemove", async (reaction, user) => {
      console.log(">>> reaction removed");
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id === channel.id) {
        console.log(">>> reaction in channel");
        if (reaction.emoji.name === seafoamGreenEmote) {
          console.log(">>> green emote");
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(seafoamGreenRole);
        }
        if (reaction.emoji.name === sunsetOrangeEmote) {
          console.log(">>> orange emote");
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(sunsetOrangeRole);
        }
        if (reaction.emoji.name === royalBlueEmote) {
          console.log(">>> blue emote");
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(royalBlueRole);
        }
        if (reaction.emoji.name === justPeachyEmote) {
          console.log(">>> peach emote");
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(justPeachyRole);
        }
        if (reaction.emoji.name === brightOrchidEmote) {
          console.log(">>> purple emote");
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(brightOrchidRole);
        }
      } else {
        return;
      }
    });
  },
};
