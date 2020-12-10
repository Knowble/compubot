const Discord = require('discord.js')
const fs = require('fs')
const ytdl = require('ytdl-core')
module.exports.run = async (client, message, args, blue) => {
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
  var num = "";
  num = makeid(5);
  if(!message.author.id == '760826345965617192') return ;
  let validate = ytdl.validateURL(args[0])
  if(validate == false) return message.reply("That is an invalid URL!")
  let vido = ytdl.getURLVideoID(args[0])
  await ytdl.getBasicInfo(vido).then(info => {
  blue.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());
  blue.setTimestamp()
  blue.setDescription(`**${info.player_response.videoDetails.title}** requested by <@${message.author.id}>\nI will DM you when the files are ready!`)
  message.channel.send(blue)
  }).catch(console.error);
  ytdl(`${args[0]}`, { filter: 'audioandvideo', quality: 'highestvideo' })
  .pipe(fs.createWriteStream(`/var/www/html/assets/cdn/${num}.mp4`)).on("finish", function() {
    message.author.send(blue.setDescription(`Here is your file!\nhttps://betterverify.xyz/assets/cdn/${num}.mp4\n\nThis link will expire in 5 minutes.`))
  });
}
//name this whatever the command name is.
module.exports.help = {
  name: "yt"
}
