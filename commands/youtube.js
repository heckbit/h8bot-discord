module.exports = {
  name: 'youtube',
  description: "Displays my youtube channel link",
  execute(message, args) {
    message.channel.send('https://www.youtube.com/channel/UCjaIya_43PMm0mfBH-YRfBA');
  }
}