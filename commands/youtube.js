module.exports = {
  name: "youtube",
  description: "Displays my youtube channel link",
  execute(client, message, args, Discord) {
    message.channel.send(
      "https://www.youtube.com/channel/UCjaIya_43PMm0mfBH-YRfBA"
    );
  },
};
