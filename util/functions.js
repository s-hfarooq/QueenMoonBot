const Discord = require("discord.js");
const owoify = require("owoify-js").default;

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

// owo command function
var owoifyMessage = function(message, command) {
  message.channel.messages.fetch({ limit: 2 }).then(messages => {
    const lastMessage = messages.array();
    if (command) {
      message.channel.send(owoify(command) + "\n - <@" + message.author.id + ">");
      message.delete(message);
    } else {
      if (lastMessage[1].content) {
        message.channel.send(owoify(lastMessage[1].content) + "\n - owoified by <@" + message.author.id + ">");
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

module.exports = {
  countingGameModeration,
  owoifyMessage
}
