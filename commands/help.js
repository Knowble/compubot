const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
 message.channel.send(">>yt {URL}")
}
//name this whatever the command name is.
module.exports.help = {
  name: "help"
}
