const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client();
const fs = require("fs");
const path = require("path")
const rimraf = require("rimraf")
bot.commands = new Discord.Collection();

var uploadsDir = '/var/www/html/assets/cdn/';

setInterval(function() {
fs.readdir(uploadsDir, function(err, files) {
  files.forEach(function(file, index) {
    fs.stat(path.join(uploadsDir, file), function(err, stat) {
      var endTime, now;
      if (err) {
        return console.error(err);
      }
      now = new Date().getTime();
      endTime = new Date(stat.ctime).getTime() + 300000;
      if (now > endTime) {
        return rimraf(path.join(uploadsDir, file), function(err) {
          if (err) {
            return console.error(err);
          }
          console.log('Deleted old files.');
        });
      }
    });
  });
});
}, 60000)

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded!`);
  bot.commands.set(props.help.name, props);
});

});


bot.on("ready", () => {
  console.log(bot.user.username + " is online.")
});

bot.on("message", async message => {
  //a little bit of data parsing/general checks
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.prefix;


  //checks if message contains a command and runs it
  let commandfile = bot.commands.get(command.slice(prefix.length));
  const blue = new Discord.MessageEmbed()
  .setColor('#3A5EC2')
  if(commandfile) commandfile.run(bot,message,args,blue);
})


bot.login(config.token)
