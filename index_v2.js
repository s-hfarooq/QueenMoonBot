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
