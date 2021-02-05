module.exports = {
  name: "twitter",
  description: "Displays my twitter link",
  execute(client, message, args, Discord) {
    message.channel.send("Check out my tweeter!\nhttps://twitter.com/H8b1t");
  },
};
