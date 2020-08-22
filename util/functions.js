const Discord = require("discord.js");
const owoify = require("owoify-js").default;
const spongebobify = require("spongebobify");
const qVars = require("./qVariables.js");

// Makes sure that counting game is on track
var countingGameModeration = function(message) {
  message.channel.messages.fetch({
    limit: 2
  }).then(messages => {
    // Delete bot messages
    const lastMessage = messages.array();
    if (lastMessage[1].author.bot) {
      message.delete(lastMessage[1]);
      return;
    }

    // If past 2 messages sent by same user, delete newest
    if (lastMessage[0].member.id == lastMessage[1].member.id) {
      message.delete(lastMessage[1]);
      return;
    }

    // If the next number is not 'old number + 1'
    if (Number(lastMessage[0].content).toString() !== lastMessage[0].content || Number(lastMessage[0].content) - 1 != Number(lastMessage[1].content)) {
      // Add Can't Count role if number isn't next in counting game and > 1500 ms between the two messages
      if (Math.abs(lastMessage[0].createdTimestamp - lastMessage[1].createdTimestamp) > 1500) {
        const tMember = lastMessage[0].member.guild.roles.cache.find(role => role.name === "Can't Count");
        lastMessage[0].member.roles.add(tMember).catch(console.error);
      }

      // Delete incorrect number
      message.delete(lastMessage[0]);
    }
  }).catch(err => {
    console.error(err);
  });

  return;
}

// Moderate Quinn.GG
var moderateQuinn = function(message) {
  // Validate sender is Quinn.GG
  if (message.member.id != '69629557941993472')
    return;

  if (message.content.includes("."))
    message.delete();

  if (!message.content.includes(" ") && message.attachment.size <= 0)
    message.delete();
}

// owo and spongebobify command function
var changeMessage = function(message, command, type) {
  message.channel.messages.fetch({
    limit: 2
  }).then(messages => {
    const lastMessage = messages.array();
    var usingLast = true;
    var itemToChange = lastMessage[1].content;
    var out;
    var changeType = [
      '\n - owoified',
      '\n - spongebobified',
      '\n - owoified and spongebobified',
    ];

    // Determine if previous message or current message is being changed
    if (command) {
      itemToChange = command;
      usingLast = false;
    }

    // Make sure message has text before proceeding
    if (!itemToChange) {
      message.channel.send("Error - message to change had no text");
      return;
    }

    // Change message based on function inputs
    switch (type) {
      case 0:
        out = owoify(itemToChange);
        break;
      case 1:
        out = spongebobify(itemToChange);
        break;
      case 2:
        out = spongebobify(owoify(itemToChange));
        break;
      default:
        out = "invalid case";
    }

    // Send message - different based on if previous message is being changed or not
    if (usingLast)
      message.channel.send(out + changeType[type] + " by <@" + message.author.id + ">");
    else
      message.channel.send(out + "\n - <@" + message.author.id + ">");

    message.delete(message);
  }).catch(err => {
    console.error(err);
  });

  return;
}

// Send a random attachment from a message in messageArray
var sendRandImage = function(message, command, messageArray, channelID) {
  // Update image arrays once a day
  if (Math.abs(qVars.lastUpdate - Date.now()) > qVars.UPDATEINTERVAL) {
    message.channel.send("Images are refreshing. Try again in a few seconds.");
    getMessagesWithAttachments(qVars.CLIENT.channels.cache.get(qVars.QUOTEID)).then(output => {
      qVars.quotesOut = output;
    });

    getMessagesWithAttachments(qVars.CLIENT.channels.cache.get(qVars.BROWNOUTID)).then(output => {
      qVars.brownoutOut = output;
    });

    qVars.lastUpdate = Date.now();
  }

  // Fixes UnhandledPromiseRejectionWarning when images are still being loaded
  if (messageArray.length == 0) {
    message.channel.send("Images are still loading. Try again in a few seconds.");
  } else {
    var amnt = isNaN(parseInt(command)) ? 1 : parseInt(command);
    amnt = (amnt > 5 || amnt < 0) ? 1 : amnt;

    for (let i = 0; i < amnt; i++) {
      let rand = Math.floor(Math.random() * messageArray.length);
      message.channel.send({
        files: [messageArray[rand].attachments.first().url]
      });
    }
  }

  return;
}

var massPingUser = function(message, command) {
  var start = command.indexOf("<@");
  var end = command.indexOf(">");

  // Make sure someone was mentioned
  if (start < 0 || end < 0) {
    message.channel.send("You must mention someone!");
    return;
  }

  // Get number of @'s wanted
  var amnt = parseInt(command.substr(end + 1));
  if (isNaN(amnt) || amnt < 1 || amnt > 100) {
    console.log(amnt);
    message.channel.send("You must input a valid number! (must be between 0 and 100)");
    return;
  }

  var atUser = command.substr(command.indexOf("<"), command.indexOf(">") + 1);
  message.delete();

  // Send log message
  var logMsg = new Discord.MessageEmbed()
    .setColor('#FFFF33')
    .setAuthor(`${message.member.user.tag} mentioned ${message.mentions.users.first().tag} ${amnt} times in ${message.channel.name}`);

  qVars.CLIENT.channels.cache.get(qVars.LOGID).send({
    embed: logMsg
  });

  // Mass ping
  for (let i = 0; i < amnt; i++) {
    message.channel.send(atUser).then(sentMessage => {
      sentMessage.delete();
    });
  }
}

// Gets all messages with attachments in a given channel and returns as an array
async function getMessagesWithAttachments(channel, limit = 500) {
  const sum_messages = [];
  let last_id;

  const options = {
    limit: 100
  };

  while (true) {
    if (last_id)
      options.before = last_id;

    const messages = await channel.messages.fetch(options);
    sum_messages.push(...messages.array());
    last_id = messages.last().id;

    if (messages.size != 100 || sum_messages >= limit)
      break;
  }

  const output = [];
  for (let i = 0; i < sum_messages.length; i++) {
    // Only keep messages with attachments and messages not sent by bots
    if (sum_messages[i].attachments.size > 0 && !sum_messages[i].author.bot)
      output.push(sum_messages[i]);
  }

  return output;
}

module.exports = {
  countingGameModeration,
  changeMessage,
  sendRandImage,
  getMessagesWithAttachments,
  massPingUser,
  moderateQuinn
};
