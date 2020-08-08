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
      message.channel.send(`There are currently ${userAmnt} people in this server`);
      break;

    case "buff":
      var output = `buff ${buffName} buff ${buffName}`;
      if(output.length > 2000)
        output = "too buff";
      message.channel.send(output);
      break;

    case "8ball":
      var output = `That command can only be used in <#${qVars.SPAMID}>`;
      if (message.channel.id === qVars.SPAMID)
        output = `Question: ${command}\nAnswer: ${qVars.RESPONSES[Math.floor(Math.random() * qVars.RESPONSES.length)]}`;
      message.channel.send(output);
      break;

    case "house":
      message.channel.send("House may be house may not");
      break;

    case "thirst":
      var rand = Math.floor(Math.random() * qVars.REMINDERS.length);
      message.channel.send(qVars.REMINDERS[rand]);
      break;

    case "tvd":
      message.channel.send("https://youtu.be/HxkmXnRQblE");
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
      
    case "korn":
      message.channel.send("https://youtu.be/vclUfHGKpOc");
      break;

    case "illinois":
      message.channel.send({
        files: ['https://media.discordapp.net/attachments/654785556215103488/692035239366885416/tempFileForShare_20200302-175024.png?width=546&height=679']
      });
      break;

    case "soup":
      message.channel.send({
        files: ['https://i.kym-cdn.com/entries/icons/original/000/026/699/soup.jpg']
      });
      break;

    case "waitwhen":
    case "ww":
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/710425704524677211/711129644992036884/tim.png']
      });
      break;

    case "snitch":
      message.channel.send({
        files: ['https://cdn.discordapp.com/attachments/654838387160907777/730820541946265710/unknown.png']
      });
      break;

    case "horny":
      message.channel.send({
        files: [qVars.HLINKS[Math.floor(Math.random() * qVars.HLINKS.length)]]
      });
      break;

    case "rat":
      var output = "That command cannot be used in this channel!";
      if (message.channel.id !== qVars.ACADEMICGENERALID)
        output = { files: ['https://cdn.discordapp.com/attachments/697639057592811650/713237658020872192/image0.jpg'] };
      message.channel.send(output);
      break;

    case "quote":
      if (message.channel.nsfw)
        qFuncs.sendRandImage(message, command, qVars.quotesOut, qVars.QUOTEID);
      else
        message.channel.send("That command cannot be used in this channel!");
      break;

    case "brownout":
      if (message.channel.id === qVars.BROWNOUTID)
        qFuncs.sendRandImage(message, command, qVars.brownoutOut, qVars.BROWNOUTID);
      else
        message.channel.send(`That command can only be used in <#${qVars.BROWNOUTID}>`);
      break;

    case "help":
      const helpCommand = new Discord.MessageEmbed()
            .setColor('#d60076')
            .setAuthor('Help')
            .addField('otter usercount', 'See how many users are currently in the server', false)
            .addField('otter buff[name]', 'Buff [name]', false)
            .addField('otter waitwhen', 'Get the when did I ask screenshot', false)
            .addField('otter illinois', 'Get a map of Illinois',false)
            .addField('otter quote', 'Get a random image from #quotes', false)
            .addField('otter 8ball [message]', 'Get an 8ball reply (only works in #spam)', false)
            .addField('otter thirst', 'Get water messages', false)
            .addField('otter contribute', 'Get [a link to the GitHub repo](https://github.com/s-hfarooq/AlmaBotter)', false)
            .addField('View all commands', '[View the README on GitHub](https://github.com/s-hfarooq/AlmaBotter/blob/master/README.md)', false);
      message.channel.send({ embed: helpCommand });
      break;

    case "rules":
      const rulesEmbed = new Discord.MessageEmbed()
            .setColor('#7CFC00')
            .setAuthor('Rules')
            .addField('Rule 1', 'Don\'t harass the mods or each other', false)
            .addField('Rule 2', 'No comments aimed to offend or hurt anyone else', false)
            .addField('Rule 3', 'Don\'t ask for mod or moderation privileges', false)
            .addField('Rule 4', ' Don\'t grind @MEE6 XP points',false)
            .addField('Rule 5', 'Don\'t spam (if you must, limit it to #spam)', false)
            .addField('Note', 'Failure to follow these rules may result in a warning, mute, or ban', false)
      message.channel.send({ embed: rulesEmbed });
      break;

    case "respect":
      message.channel.send("Please take a look at the respect document - https://docs.google.com/document/d/1ljZq_StH3MLDxMxmPjsbuyAKwDGXTCvfxIFP8AXsHjM/edit");
      break;

    case "tip":
      var rand = Math.floor(Math.random() * qVars.TIPSARR.length);
      if (rand == 0) {
        message.channel.send(qVars.TIPSARR[rand]);
      } else {
        const tipEmbed = new Discord.MessageEmbed()
              .setColor(qVars.EMBEDCOL[Math.floor(Math.random() * qVars.EMBEDCOL.length)])
              .addField('Tip', qVars.TIPSARR[rand], false)
        message.channel.send({ embed: tipEmbed });
      }
      break;

    case "massping":
    case "sp":
      // Make sure user has ESC role
      if (message.member.roles.cache.has(qVars.ESCID))
        qFuncs.massPingUser(message, command);
      else
        message.channel.send("You do not have permission to use this command!");
      break;

    case "rankdegen":
      var degenRank = Math.floor(Math.random() * 100);
      message.channel.send("you are " + degenRank + "% degenerate");
      break;

    case "owoify":
      if (message.channel.id !== qVars.ACADEMICGENERALID)
        qFuncs.changeMessage(message, command, 0);
      else
        message.channel.send("That command cannot be used in this channel!");
      break;

    case "s":
    case "spongebobify":
      if (message.channel.id !== qVars.ACADEMICGENERALID)
        qFuncs.changeMessage(message, command, 1);
      else
        message.channel.send("That command cannot be used in this channel!");
      break;

    case "os":
      qFuncs.changeMessage(message, command, 2);
      break;

    case "snipe":
      var val = (isNaN(parseInt(command)) ? 0 : parseInt(command)) - 1;
      val = (val < 0 || val > 5) ? 0 : val;
      message.channel.send({ embed: qVars.deletedMessages[val] });
      break;

    case "flip":
      var options = ["Heads", "Tails"];
      message.channel.send(options[Math.floor(Math.random() * options.length)]);
      break;

    case "cat":
      var output = "";
      var amnt = isNaN(parseInt(command)) ? 1 : parseInt(command);
      var catParts = [
        message.guild.emojis.cache.find(emoji => emoji.name == 'c_'),
        message.guild.emojis.cache.find(emoji => emoji.name == 'a_'),
        message.guild.emojis.cache.find(emoji => emoji.name == 't_'),
        message.guild.emojis.cache.find(emoji => emoji.name == 'cB'),
        message.guild.emojis.cache.find(emoji => emoji.name == 'aB'),
        message.guild.emojis.cache.find(emoji => emoji.name == 'tB'),
      ];

      var offset = 0;
      if (amnt < 0) {
        amnt *= -1;
        offset = 3;
      }

      for(let i = 0; i < amnt; i++)
        output += `${catParts[1 + offset]}`;
      output = `${catParts[offset]}${output}${catParts[2 + offset]}`;

      if (output.length > 2000)
        output = "too looong";
      message.channel.send(output);
      break;
  }
}

module.exports = {
  cmds
};
