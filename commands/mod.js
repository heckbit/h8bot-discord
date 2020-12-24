module.exports = {
  name: 'mod',
  description: "Checks if you are a mod.",
  execute(message, args) {
    if(message.member.roles.cache.has('791336140329189376')) {
      message.channel.send('Yes, you are a mod!');
    } else {
      message.channel.send('Sorry, you are not a mod :(');
    }
  }
}