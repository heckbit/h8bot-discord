module.exports = {
  name: "test",
  description: "Mutes a player in the Discord",

  execute(client, message, args, Discord) {
    client.emit("guildMemberUpdate", message.member);
  },
};
