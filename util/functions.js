const Discord = require("discord.js");
const owoify = require("owoify-js").default;
const spongebobify = require("spongebobify");
const qVars = require("./qVariables.js");

// Makes sure that counting game is on track
var countingGameModeration = function(message) {
  message.channel.messages.fetch({ limit: 2 }).then(messages => {
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

    // If next number not old number + 1
    if (Number(lastMessage[0].content).toString() !== lastMessage[0].content || Number(lastMessage[0].content) - 1 != Number(lastMessage[1].content)) {
      // Add Can't Count role if number isn't next in counting game and > 1500 ms between the two messages
      if (Math.abs(lastMessage[0].createdTimestamp - lastMessage[1].createdTimestamp) > 1500) {
        const tMember = lastMessage[0].member.guild.roles.cache.find(role => role.name === "Can't Count");
        lastMessage[0].member.roles.add(tMember).catch(console.error);
      }

      // Delete incorrect number
      message.delete(lastMessage[0]);
      return;
    }
  }).catch(err => {
    console.error(err);
    return;
  });

  return;
}

// owo and spongebobify command function
var changeMessage = function(message, command, type) {
  message.channel.messages.fetch({ limit: 2 }).then(messages => {
    const lastMessage = messages.array();
    if (command) {
      var out = type == 1 ? spongebobify(command) : owoify(command);
      message.channel.send(out + "\n - <@" + message.author.id + ">");
      message.delete(message);
    } else {
      if (lastMessage[1].content) {
        var out = type == 1 ? spongebobify(lastMessage[1].content) + "\n - spongebobified" : owoify(lastMessage[1].content) + "\n - owoified";
        message.channel.send(out + " by <@" + message.author.id + ">");
        message.delete(message);
      } else {
        message.channel.send("Previous message had no text");
      }
    }
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

    getMessagesWithAttachments(qVars.CLIENT.channels.cache.get(qVars.MEMEID)).then(output => {
      qVars.memesOut = output;
    });

    qVars.lastUpdate = Date.now();
  }

  // Fixes UnhandledPromiseRejectionWarning when images are still being loaded
  if (messageArray.length == 0) {
    message.channel.send("Images are still loading. Try again in a few seconds.");
  } else {
    var amnt = isNaN(parseInt(command)) ? 1 : parseInt(command);
    if(amnt > 5 || amnt < 0)
      amnt = 1;

    for (let i = 0; i < amnt; i++) {
      let rand = Math.floor(Math.random() * messageArray.length);
      message.channel.send({
        files: [messageArray[rand].attachments.first().url]
      });
    }
  }

  return;
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
  getMessagesWithAttachments
};
