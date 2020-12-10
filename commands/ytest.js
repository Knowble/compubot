const Discord = require('discord.js')
const fs = require('fs')
const ytdl = require('ytdl-core')
const url   = require('url');
const https = require('https');

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
  var limit = 1024 * 1024 * 250;
  var videoID = args[0];

ytdl.getInfo(videoID).then((info) => {
  var formats = info.formats.slice();
    var format = formats.shift();
    var parsed = url.parse(format.url);
    parsed.method = 'HEAD'; // We only want headers to get the filesize
    https.request(parsed, (response) => {
      if (parseInt(response.headers['content-length']) <= limit) {
        console.log(parseInt(response.headers['content-length']));
        blue.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL());
        blue.setTimestamp()
        blue.setDescription(`**${info.player_response.videoDetails.title}** requested by <@${message.author.id}>\nI will DM you when the files are ready!`)
        message.channel.send(blue)
        var output = `/var/www/html/assets/cdn/${num}.mp4`;
        ytdl.downloadFromInfo(info, { filter: 'audioandvideo', quality: 'highestvideo' })
          .pipe(fs.createWriteStream(output)).on("finish", function() {
            message.author.send(blue.setDescription(`Here is your file!\nhttps://betterverify.xyz/assets/cdn/${num}.mp4\n\nThis link will expire in 5 minutes.`))});
      } else {
        console.log(parseInt(response.headers['content-length']));
        message.reply("Maximum of 300MB!").then(m => m.delete({ timeout: 2000 }))
      }
    }).end();
});
}
//name this whatever the command name is.
module.exports.help = {
  name: "ytest"
}
