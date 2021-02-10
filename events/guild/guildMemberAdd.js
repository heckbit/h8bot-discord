module.exports = (Discord, client, guildMember) => {
  console.log(">>> new member joined");
  console.log(`>>> member: ${guildMember.user.username}`);

  let welcomeRole = guildMember.guild.roles.cache.find(
    (role) => role.name === "member"
  );

  guildMember.roles.add(welcomeRole);

  var welcomeEmbed = new Discord.MessageEmbed();
  welcomeEmbed
    .setTitle(`:cyclone:｜Welcome ${guildMember.displayName}!｜:cyclone:`)
    .setDescription(
      `Thanks, <@${guildMember.user.id}> for joining the H8b1t discord server.\nTo get started head over to the rules channel and ✅ check ✅ out the server rules.`
    )
    .setColor("#02A9FF");

  guildMember.guild.systemChannel.send(welcomeEmbed);
  console.log(`>>> Welcomed ${guildMember.displayName}`);
};
