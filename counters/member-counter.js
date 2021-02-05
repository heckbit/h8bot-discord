module.exports = async (client) => {
  const guild = client.guilds.cache.get("352556550398935041");

  setInterval(() => {
    const memberCount = guild.memberCount;
    const channel = guild.channels.cache.get("807026431942459407");

    channel.setName(`Total Members: ${memberCount.toLocaleString()}`);

    console.log("Updated member count.");
  }, 300000);
};
