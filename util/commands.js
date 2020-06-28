const Discord = require("discord.js");
const qVars = require("./qVariables.js");
const qFuncs = require("./functions.js");

// All commands for the bot
var cmds = function(message, keyword, command, buffName) {
  switch (keyword) {
    case "contribute":
      message.channel.send("https://github.com/s-hfarooq/QueenMoonBot");
      break;

    case "usercount":
      const userAmnt = qVars.CLIENT.guilds.cache.get(message.guild.id).memberCount;
      message.channel.send("There are currently " + userAmnt + " people in this server");
      break;

    case "buff":
      var output = "buff " + buffName + " buff " + buffName;
      if(output.length > 2000)
        output = "too buff";
      message.channel.send(output);
      break;

    case "notbuff":
      var output = "not buff " + buffName + " not buff " + buffName;
      if(output.length > 2000)
        output = "not buff enough";
      message.channel.send(output);
      break;

    case "8ball":
      var output = "That command can only be used in <#654838387160907777>";
      if (message.channel.id === '654838387160907777')
        output = "Question: " + command + "\nAnswer: " + qVars.RESPONSES[Math.floor(Math.random() * qVars.RESPONSES.length)];
      message.channel.send(output);
      break;

    case "thirst":
      var rand = Math.floor(Math.random() * qVars.REMINDERS.length);
      message.channel.send(qVars.REMINDERS[rand]);
      break;

    case "lofi":
      message.channel.send("https://open.spotify.com/playlist/1DcvziAZBZk1Ji1c65ePtk?si=Qtvu64zsQQurDtQa60tPBg");
      break;

    case "hackathon":
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/654784388197908500/675113678856781834/Screenshot_20200102-213727_Discord.png']
      });
      break;

    case "gc":
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/669726484772159488/701247357001400370/unknown.png']
      });
      break;

    case "head":
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/669726484772159488/708103493918916709/unknown.png']
      });
      break;

    case "noanime":
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/697639057592811650/708536846531035226/image0.jpg']
      });
      break;

    case "corn":
      message.channel.send({
        files: ["https://cdn.discordapp.com/attachments/697639057592811650/712531761774461008/Corn_is_the_best_crop__wheat_is_worst.mp4"]
      });
      break;

    case "brasil":
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/654838387160907777/713538844582084691/Mundial_Ronaldinho_Soccer_64_Full_HD_Intro.mp4']
      });
      break;

    case "matt":
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/669726484772159488/712182903966007296/IMG_9784.jpg']
      });
      break;

    case "illinois":
      message.channel.send({
        files: ['https://media.discordapp.net/attachments/654785556215103488/692035239366885416/tempFileForShare_20200302-175024.png?width=546&height=679']
      });
      break;

    case "catgirl":
      message.channel.send({
        files: ['https://img1.ak.crunchyroll.com/i/spire1/1b0597832b4aa93293041240680d6b471416589032_full.jpg']
      });
      break;

    case "gwagwa":
      message.channel.send("GWAGWA", {
        files: ['https://cdn.discordapp.com/attachments/669726484772159488/713289328985505792/gwa_gwa-QPYcuA0b6gA.mp4']
      });
      break;

    case "bean":
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/654784352269369356/720517854616879174/hC2pFDm.png']
      });
      break;

    case "soup":
      message.channel.send({
        files: ['https://i.kym-cdn.com/entries/icons/original/000/026/699/soup.jpg']
      });
      break;

    case "orgy":
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/714931864413929512/716715109552095300/43hgta.gif']
      });
      break;

    case "waitwhen":
    case "ww":
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/710425704524677211/711129644992036884/tim.png']
      });
      break;

    case "horny":
      message.channel.send({
        files: [qVars.HLINKS[Math.floor(Math.random() * qVars.HLINKS.length)]]
      });
      break;

    case "rat":
      var output = "That command cannot be used in this channel!";
      if (message.channel.id !== qVars.GENERALID)
        output = { files: ['https://cdn.discordapp.com/attachments/697639057592811650/713237658020872192/image0.jpg'] };
      message.channel.send(output);
      break;

    case "quote":
      if (message.channel.id !== qVars.GENERALID)
        qFuncs.sendRandImage(message, command, qVars.quotesOut, qVars.QUOTEID);
      else
        message.channel.send("That command cannot be used in this channel!");
      break;

    case "meme":
      if (message.channel.id !== qVars.GENERALID)
        qFuncs.sendRandImage(message, command, qVars.memesOut, qVars.MEMEID);
      else
        message.channel.send("That command cannot be used in this channel!");
      break;

    case "wholesome":
      if (message.channel.id !== qVars.GENERALID)
        qFuncs.sendRandImage(message, command, qVars.wholesomeOut, qVars.WHOLESOMEID);
      else
        message.channel.send("That command cannot be used in this channel!");
      break;

    case "brownout":
      if (message.channel.id === qVars.BROWNOUTID)
        qFuncs.sendRandImage(message, command, qVars.brownoutOut, qVars.BROWNOUTID);
      else
        message.channel.send("That command can only be used in <#" + qVars.BROWNOUTID + ">");
      break;

    case "help":
      const helpCommand = new Discord.MessageEmbed()
            .setColor('#d60076')
            .setAuthor('Help')
            .addField('queen usercount', 'See how many users are currently in the server', false)
            .addField('queen buff[name]', 'Buff [name]', false)
            .addField('queen waitwhen', 'Get the when did I ask screenshot', false)
            .addField('queen illinois', 'Get a map of Illinois',false)
            .addField('queen quote', 'Get a random image from #quotes', false)
            .addField('queen 8ball [message]', 'Get an 8ball reply (only works in #spam)', false)
            .addField('queen thirst', 'Get water messages', false)
            .addField('queen ping', 'Get your ping', false)
            .addField('queen contribute', 'Get [a link to the GitHub repo](https://github.com/s-hfarooq/QueenMoonBot)', false)
            .addField('View all commands', '[View the README on GitHub](https://github.com/s-hfarooq/QueenMoonBot/blob/master/README.md)', false);
      message.channel.send({ embed: helpCommand });
      break;

    case "ping":
      var apiPing = Math.round(qVars.CLIENT.ws.ping);
      var messagePing = Date.now() - message.createdTimestamp;
      message.channel.send('Client ping: ' + messagePing + 'ms (API ping: ' + apiPing + 'ms)');
      break;

    case "massping":
    case "sp":
      // Make sure user has ESC role
      if(message.member.roles.cache.has(qVars.ESCID))
        qFuncs.massPingUser(message, command);
      else
        message.channel.send("You do not have permission to use this command!");
      break;

    case "cock":
      var output = "That command cannot be used in this channel!";
      if (message.channel.id !== qVars.GENERALID)
        output = { files: [qVars.CLINKS[Math.floor(Math.random() * qVars.CLINKS.length)]] };
      message.channel.send(output);
      break;

    case "rankdegen":
      var degenRank = Math.floor(Math.random() * 100);
      message.channel.send("you are " + degenRank + "% degenerate");
      break;

    case "sorry":
      if (message.channel.id !== qVars.GENERALID)
        message.channel.send({
          files: ['https://cdn.discordapp.com/attachments/654784430409252904/704162388194230302/im_sorry.mp4']
        });
      else
        message.channel.send("That command canmot be used in this channel!");
      break;

    case "owoify":
      if (message.channel.id !== qVars.GENERALID)
        qFuncs.changeMessage(message, command, 0);
      else
        message.channel.send("That command cannot be used in this channel!");
      break;

    case "s":
    case "spongebobify":
      if (message.channel.id !== qVars.GENERALID)
        qFuncs.changeMessage(message, command, 1);
      else
        message.channel.send("That command cannot be used in this channel!");
      break;

    case "os":
      qFuncs.changeMessage(message, command, 2);
      break;

    default:
      message.channel.send("That command doesn't exist. Run `queen help` to see the available commands");
  }
}

module.exports = {
  cmds
};
