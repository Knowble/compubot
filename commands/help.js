const Discord = require('discord.js');

module.exports.run = async (bot, message, args, blue) => {
 blue.setTitle("Help Commands")
 blue.setDescription("``>>yt {mp3|mp4} {URL}``\n- Downloads a Youtube video based on the format given.\n\n``>>tw {URL}``\n- Downloads a Twitter video.")
 message.channel.send(blue)
}
//name this whatever the command name is.
module.exports.help = {
  name: "help"
}
