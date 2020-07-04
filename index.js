// Load requirements
const Discord = require("discord.js");
const config = require("./util/config.json");
const qVars = require("./util/qVariables.js");
const qFuncs = require("./util/functions.js");
const commands = require("./util/commands.js");

// Runs on start
qVars.CLIENT.on("ready", () => {
  console.log(`Bot has started`);
  qVars.CLIENT.user.setActivity(`queen help`);

  qFuncs.getMessagesWithAttachments(qVars.CLIENT.channels.cache.get(qVars.BROWNOUTID)).then(output => {
    qVars.brownoutOut = output;
  });

  qFuncs.getMessagesWithAttachments(qVars.CLIENT.channels.cache.get(qVars.QUOTEID)).then(output => {
    qVars.quotesOut = output;
  });

  qVars.lastUpdate = Date.now();
});

// Runs on join new server
qVars.CLIENT.on("guildCreate", guild => {
  console.log(`New guild joined`);
  qVars.CLIENT.user.setActivity(`queen help`);
});

// Runs on leave server
qVars.CLIENT.on("guildDelete", guild => {
  console.log(`Bot has been removed from a guild`);
  qVars.CLIENT.user.setActivity(`queen help`);
});

// Runs on message deletion
qVars.CLIENT.on('messageDelete', message => {
  // Ignore bot messages
  if (message.author.bot)
    return;

  if (message.cleanContent) {
    var msg = message.cleanContent;

    if (message.cleanContent.length > 1950)
      msg = msg.substr(0, 1950) + "...";

    qVars.lastDeletedMessage = new Discord.MessageEmbed()
          .setColor('#FF0000')
          .setAuthor('Message Deleted')
          .addField(message.member.user.tag, msg)
          .addField("Channel", message.channel.name)
          .addField("Time", new Date().toLocaleString());

    qVars.CLIENT.channels.cache.get(qVars.LOGID).send({ embed: qVars.lastDeletedMessage });
  }
});

// Runs on message edit
qVars.CLIENT.on('messageUpdate', (oldMessage, newMessage) => {
  // Ignore bot messages
  if (newMessage.author.bot)
    return;

  // Ignore messages that are identical (ie. when links get a preview)
  if(oldMessage.cleanContent == newMessage.cleanContent)
    return;

  // Ensure messages aren't blank
  if (oldMessage.cleanContent && newMessage.cleanContent) {
    var logMsg = new Discord.MessageEmbed()
          .setColor('#F0E68C')
          .setAuthor('Message Edited')
          .addField("Old message", oldMessage.cleanContent)
          .addField("New message", newMessage.cleanContent)
          .addField("User", newMessage.member.user.tag)
          .addField("Channel", newMessage.channel.name)
          .addField("Time", new Date().toLocaleString());

    qVars.CLIENT.channels.cache.get(qVars.LOGID).send({ embed: logMsg });
  }
});

// Runs when a new message is sent on a server
qVars.CLIENT.on("message", async message => {
  // Counting game moderation
  if (message.channel.id === qVars.COUNTINGGAMEID) {
    qFuncs.countingGameModeration(message);
    return;
  }

  // Don't respond to bots
  if (message.author.bot)
    return;

  var command = message.content;
  var override = false;

  // Make sure message starts with 'queen' or 'q'
  if (command.toLowerCase().startsWith("queen ") || command.toLowerCase().startsWith("q ")) {
    override = true;
    command = command.substr(command.indexOf(" ") + 1);
  }

  // If command is not run in general channel or if the gap between last command is greater than generalTimeGap, command will be run
  var currentTime = Math.round((new Date().getTime() / 1000));
  var timeDiff = currentTime - qVars.generalLastCommandTime;
  if (override) {
    if (message.channel.id !== qVars.GENERALID || timeDiff >= qVars.GENERALTIMEGAP) {
      // Get command keyword
      var keyword = command.replace(/\s.*/,'').toLowerCase();

      // If trying to use buff command, get the [name] desired
      var buffName = "";
      if (keyword.startsWith("buff")) {
        keyword = "buff";
        buffName = command.substr(4).trim();
      }

      // Find command and send message
      var command = command.substr(keyword.length + 1);
      commands.cmds(message, keyword, command, buffName);

      if (message.channel.id === qVars.GENERALID)
        qVars.generalLastCommandTime = Math.round((new Date().getTime() / 1000));
    } else if (timeDiff < qVars.GENERALTIMEGAP) {
      message.channel.send("Slow down!");
    }
  }
});


qVars.CLIENT.on('messageReactionAdd', async (reaction, user) => {
  let message = reaction.message
  //Filter the reaction
  if (message.channel.name == 'bot_testing') {
    // Define the emoji user add
    let he_him = message.guild.roles.cache.find(role => role.id === '728759420372123678');
    let she_her = message.guild.roles.cache.find(role => role.id === '728759474189369385');
    let they_them = message.guild.roles.cache.find(role => role.id === '728759487762006167');
    if (reaction.name === ":one:"){
      message.member.addRole(he_him.id);
    }
    if (reaction.name === ":two:"){
      message.member.addRole(she_her.id);
    }
    if (reaction.name === ":three:"){
      message.member.addRole(they_them.id);
    }
  }
});


qVars.CLIENT.login(config.token);
