module.exports = {
    name: 'youtube',
    descrition: "Displays my youtube channel link",
    execute(message, args) {
        message.channel.send('https://www.youtube.com/channel/UCjaIya_43PMm0mfBH-YRfBA');
    }
}