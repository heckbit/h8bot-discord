module.exports = {
    name: 'plsgivemod',
    description: "Checks if you are a mod, if you are not the role is added",
    execute(message, args) {
      if(message.member.roles.cache.has('791336140329189376')) {
        message.channel.send('You\'re already a mod!');
      } else {
        message.member.roles.add('791336140329189376');
        message.channel.send('You are now a mod!');
      }
    }
  }