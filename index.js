// Load requirements
const Discord = require("discord.js");
const https = require("https");
const config = require("./util/config.json");
const qVars = require("./util/qVariables.js");
const qFuncs = require("./util/functions.js");
const commands = require("./util/commands.js");
const userRoles = require("./util/userRoles.js");

// Runs on start
qVars.CLIENT.on("ready", () => {
  console.log(`Bot has started`);
  qVars.CLIENT.user.setActivity(`otter help`);

  // Save brownout/quote image links in array
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
  qVars.CLIENT.user.setActivity(`otter help`);
});

// Runs on leave server
qVars.CLIENT.on("guildDelete", guild => {
  console.log(`Bot has been removed from a guild`);
  qVars.CLIENT.user.setActivity(`otter help`);
});

// Runs on message deletion
qVars.CLIENT.on('messageDelete', message => {
  // Don't crash, ignore bot messages, and only log UIUC24 messages
  if (message === null || message.author === null || message.author.bot || message.guild.id != qVars.UIUCGUILDID)
    return;

  var msg = message.cleanContent;
  var currDeleted;

  if (message.cleanContent.length > 1020)
    msg = msg.substr(0, 1020) + "...";
  if (!msg)
    msg = "No Message - Only Attachment";

  // Create embed
  currDeleted = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setAuthor('Message Deleted')
    .addField(message.member.user.tag, msg)
    .addField("Channel", message.channel.name)
    .addField("Time", new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      timeZoneName: 'short'
    }));

  // Add attachment to embed
  if (message.attachments.size > 0) {
    let url = message.attachments.first().url;

    // Add image/file to embed
    if (url.match(/\.(jpeg|jpg|gif|png)$/) != null)
      currDeleted.setThumbnail(url);
    else
      currDeleted.attachFiles([url]);
  }

  // Update deleted messages array
  qVars.deletedMessages.pop();
  qVars.deletedMessages.unshift(currDeleted);

  // Send log message
  qVars.CLIENT.channels.cache.get(qVars.LOGID).send({
    embed: currDeleted
  });
});

// Runs on message edit
qVars.CLIENT.on('messageUpdate', (oldMessage, newMessage) => {
  // Ignore bot messages, identical messages (ie. when links get a preview), and only log UIUC24 messages
  if (newMessage.author.bot || oldMessage.cleanContent == newMessage.cleanContent || newMessage.guild.id != qVars.UIUCGUILDID)
    return;

  // Ensure messages aren't blank
  if (oldMessage.cleanContent && newMessage.cleanContent) {
    // Make sure text isn't too long
    var oldMsg = oldMessage.cleanContent,
      newMsg = newMessage.cleanContent;
    if (oldMsg.length > 1020)
      oldMsg = oldMsg.substr(0, 1020) + "...";
    if (newMsg.length > 1020)
      newMsg = newMsg.substr(0, 1020) + "...";

    var logMsg = new Discord.MessageEmbed()
      .setColor('#F0E68C')
      .setAuthor('Message Edited')
      .addField("Old message", oldMsg)
      .addField("New message", newMsg)
      .addField("User", newMessage.member.user.tag)
      .addField("Channel", newMessage.channel.name)
      .addField("Time", new Date().toLocaleString('en-US', {
        timeZone: 'America/Chicago',
        timeZoneName: 'short'
      }));

    qVars.CLIENT.channels.cache.get(qVars.LOGID).send({
      embed: logMsg
    });
  }
});

// Runs when a new message is sent on a server
qVars.CLIENT.on("message", async message => {
  // Counting game moderation
  if (message.channel.id === qVars.COUNTINGGAMEID) {
    qFuncs.countingGameModeration(message);
    return;
  }
  
  // Moderate if and only if Quinn.gg
  if (message.author.id == '69629557941993472') {
    qFuncs.moderateQuinn(message);
    return;
  }

  // Don't respond to bots
  if (message.author.bot)
    return;

  // Save attachments for logging purposes if deleted
  if (message.attachments.size > 0) {
    let url = message.attachments.first().url;

    // Open attachment (and save in other channel if image) so Discord doesn't remove access
    https.get(url, function(response) {
      // Check if attachment is an image
      if (url.match(/\.(jpeg|jpg|gif|png)$/) != null)
        qVars.CLIENT.channels.cache.get(qVars.IMGSAVEID).send(url);
    });
  }

  var command = message.content;
  var override = false;

  // Make sure message starts with 'queen' or 'q'
  const cmdLr = command.toLowerCase();
  if (cmdLr.startsWith("otter ") || cmdLr.startsWith("o ") || cmdLr.startsWith("queen ") || cmdLr.startsWith("q ")) {
    override = true;
    command = command.substr(command.indexOf(" ") + 1);
  }

  if (override) {
    // If command is not run in general channel or if the gap between last command is greater than generalTimeGap, command will be run
    var currentTime = Math.round((new Date().getTime() / 1000));
    var timeDiff = currentTime - qVars.generalLastCommandTime;

    if (message.channel.id !== qVars.ACADEMICGENERALID || timeDiff >= qVars.GENERALTIMEGAP) {
      // Get command keyword
      var keyword = command.replace(/\s.*/, '').toLowerCase();

      // If trying to use buff command, get the [name] desired
      var buffName = "";
      if (keyword.startsWith("buff")) {
        keyword = "buff";
        buffName = command.substr(4).trim();
      }

      // Find command and send message
      var command = command.substr(keyword.length + 1);
      commands.cmds(message, keyword, command, buffName);

      if (message.channel.id === qVars.ACADEMICGENERALID)
        qVars.generalLastCommandTime = Math.round((new Date().getTime() / 1000));
    } else if (timeDiff < qVars.GENERALTIMEGAP) {
      message.channel.send("Slow down!");
    }
  }
});

// Runs on reaction added
qVars.CLIENT.on('messageReactionAdd', async (reaction, user) => {
  let message = reaction.message;
  userRoles.userReactRoles(message, user, reaction, true);
});

// Runs on reaction removed
qVars.CLIENT.on('messageReactionRemove', async (reaction, user) => {
  let message = reaction.message;
  userRoles.userReactRoles(message, user, reaction, false);
});

qVars.CLIENT.login(config.token);
