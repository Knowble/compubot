const Discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');
const mql = require('@microlink/mql');
module.exports.run = async (client, message, args, blue) => {
  var patt = /twitter.com/g;
  var res = patt.test(args[0]);
  if(res == false) return message.reply("Invalid Twitter URL!");
  const { status, data, response } = await mql(
    args[0],
    {
      video: true,
    }
  )
  blue.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());
  blue.setTimestamp()
  message.channel.send(blue.setDescription(`I will DM you when the files are ready!`));
  message.author.send(blue.setDescription(`Here is your file!\n${data.video.url}`));
}
//name this whatever the command name is.
module.exports.help = {
  name: "tw"
}
