module.exports = (Discord, client, oldPresence, newPresence) => {
  const activity = newPresence.activities[0];
  if (activity) {
    const member = newPresence.guild.members.cache.get(newPresence.userID);
    const memberID = member.id;
    const ownerID = newPresence.guild.ownerID;

    if (memberID == ownerID) {
      if (activity.type === "STREAMING") {
        const channel = newPresence.guild.channels.cache.find((chan) =>
          chan.name.includes("announc")
        );
        if (channel) {
          const liveEmbed = new Discord.MessageEmbed()
            .setColor("#02A9FF")
            .setTitle(activity.details)
            .setURL(activity.url)
            .setDescription(
              `Hey guys, I am live playing ${activity.state} on ${activity.name}! [Click here](${activity.url}) or click the title to come hang out!`
            )
            .setThumbnail(member.user.avatarURL())
            .setFooter("via H8bot")
            .setTimestamp();

          channel.send("@everyone");
          channel.send(liveEmbed);
        }
      }
    }
  }
};
