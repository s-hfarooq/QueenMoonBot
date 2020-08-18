// Load requirements
const Discord = require("discord.js");
const https = require("https");
const config = require("./util/config.json");
const qVars = require("./util/qVariables.js");
const qFuncs = require("./util/functions.js");
const commands = require("./util/commands.js");

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

  if (message.channel.id == '745160938692280360') {
    var locOfEmoji = qVars.LETTEREMOJIS.indexOf(reaction.emoji.name);

    if (message.id == '745162331662843984') {
      // Year
      if(locOfEmoji == -1 || locOfEmoji > qVars.YEARS.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.YEARS[locOfEmoji]);
    } else if (message.id == '745162371848208384') {
      // Location
      if(locOfEmoji == -1 || locOfEmoji > qVars.LOCATION.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.LOCATION[locOfEmoji]);
    } else if (message.id == '745162420456259614') {
      // Pronouns
      if(locOfEmoji == -1 || locOfEmoji > qVars.PRONOUNS.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.PRONOUNS[locOfEmoji]);
    } else if (message.id == '745162473275129869') {
        // Staying
        if(locOfEmoji == -1 || locOfEmoji > qVars.LIVINGLOC.length - 1)
          return;

        qFuncs.setUserRoles(message, user.id, qVars.LIVINGLOC[locOfEmoji]);
    } else if (message.id == '745162532401971270') {
      // ACES 1

      // Handle special case roles
      switch(locOfEmoji) {
        case -1:
          return;

        case 0:
          qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[0]);
          qFuncs.setUserRoles(message, user.id, "Undeclared")
          return;

        case 5:
          qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[0]);
          qFuncs.setUserRoles(message, user.id, "Advertising");
          qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[0]);
          qFuncs.setUserRoles(message, user.id, qVars.ACESMAJORS[26]);
          return;

        case 6:
          qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[0]);
          qFuncs.setUserRoles(message, user.id, "Journalism");
          qFuncs.setUserRoles(message, user.id, qVars.ACESMAJORS[26]);
          return;

        default:
          break;
      }

      if(locOfEmoji > 6)
        locOfEmoji -= 3;
      else
        locOfEmoji--;

      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[0]);
      qFuncs.setUserRoles(message, user.id, qVars.ACESMAJORS[locOfEmoji]);
    } else if (message.id == '745162562588639261') {
      // ACES 2
      locOfEmoji += 18;
      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[0]);
      qFuncs.setUserRoles(message, user.id, qVars.ACESMAJORS[locOfEmoji]);
    } else if (message.id == '745162595991814155') {
      // Health Sciences
      if(locOfEmoji == -1 || locOfEmoji > 5)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[1]);
      qFuncs.setUserRoles(message, user.id, qVars.HEALTHMAJORS[locOfEmoji]);
    } else if (message.id == '745162634554376242') {
      // Education
      if(locOfEmoji == -1 || locOfEmoji > 4)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[2]);
      qFuncs.setUserRoles(message, user.id, qVars.EDUCATIONMAJORS[locOfEmoji]);
    } else if (message.id == '745162672320020490') {
      // Fine/Applied Arts 1
      if(locOfEmoji == -1 || locOfEmoji > 19)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[3]);
      qFuncs.setUserRoles(message, user.id, qVars.ARTMAJORS[locOfEmoji]);
    } else if (message.id == '745162688476217375') {
      // Fine/Applied Arts 2
      if(locOfEmoji == -1 || locOfEmoji > 8)
        return;

      locOfEmoji += 20;
      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[3]);
      qFuncs.setUserRoles(message, user.id, qVars.ARTMAJORS[locOfEmoji]);
    } else if (message.id == '745162728934735884') {
      // LAS 1
      if(locOfEmoji == -1 || locOfEmoji > 19)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[4]);
      qFuncs.setUserRoles(message, user.id, qVars.LASMAJORS[locOfEmoji]);
    } else if (message.id == '745162751248171059') {
      // LAS 2
      if(locOfEmoji == -1 || locOfEmoji > 19)
        return;

      locOfEmoji += 20;
      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[4]);
      qFuncs.setUserRoles(message, user.id, qVars.LASMAJORS[locOfEmoji]);
    } else if (message.id == '745162770617598032') {
      // LAS 3
      if(locOfEmoji == -1 || locOfEmoji > 17)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[4]);

      if(locOfEmoji > 8) {
        // add CS role
        qFuncs.setUserRoles(message, user.id, "CompSci + X");
        locOfEmoji -= 8;

        switch(locOfEmoji) {
          // add +x role
          case 1:
            qFuncs.setUserRoles(message, user.id, "Geography");
            break;
          case 2:
            qFuncs.setUserRoles(message, user.id, "Philosophy");
            break;
          case 3:
            qFuncs.setUserRoles(message, user.id, "Anthro");
            break;
          case 4:
            qFuncs.setUserRoles(message, user.id, "Astronomy");
            break;
          case 5:
            qFuncs.setUserRoles(message, user.id, "Chemistry");
            break;
          case 6:
            qFuncs.setUserRoles(message, user.id, "Econ");
            break;
          case 7:
            qFuncs.setUserRoles(message, user.id, "Linguistics");
            break;
          case 8:
            qFuncs.setUserRoles(message, user.id, "Statistics");
            break;
          case 9:
            qFuncs.setUserRoles(message, user.id, "Math");
            break;
        }

        return;
      }

      locOfEmoji += 20;

      qFuncs.setUserRoles(message, user.id, qVars.LASMAJORS[locOfEmoji]);
    } else if (message.id == '745162802137792655') {
      // Media
      if(locOfEmoji == -1 || locOfEmoji > mediaMajors.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[5]);
      qFuncs.setUserRoles(message, user.id, mediaMajors[locOfEmoji]);
    } else if (message.id == '745162844579823637') {
      // DGS
      if(locOfEmoji == -1 || locOfEmoji > qVars.DGSMAJORS.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[6]);
      qFuncs.setUserRoles(message, user.id, qVars.DGSMAJORS[locOfEmoji]);
    } else if (message.id == '745162874434879549') {
      // Gies
      if(locOfEmoji == -1 || locOfEmoji > qVars.GIESMAJORS.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[7]);
      qFuncs.setUserRoles(message, user.id, qVars.GIESMAJORS[locOfEmoji]);
    } else if (message.id == '745162909335814145') {
      // Grainger
      if(locOfEmoji == -1 || locOfEmoji > qVars.GRAINGERMAJORS.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[8]);
      qFuncs.setUserRoles(message, user.id, qVars.GRAINGERMAJORS[locOfEmoji]);
    } else if (message.id == '745162937890635896') {
      // Info Sci
      if(locOfEmoji == -1 || locOfEmoji > qVars.INFOSCIMAJORS.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[9]);
      qFuncs.setUserRoles(message, user.id, qVars.INFOSCIMAJORS[locOfEmoji]);
    } else if (message.id == '745162964973125672') {
      // Social Work
      if(locOfEmoji == -1 || locOfEmoji > qVars.SOCIALMAJORS.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.COLLEGES[1]);
      qFuncs.setUserRoles(message, user.id, qVars.SOCIALMAJORS[locOfEmoji]);
    } else if (message.id == '745162998473162852') {
      // Special Roles
      if(locOfEmoji == -1 || locOfEmoji > qVars.SPECIALROLES.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, qVars.SPECIALROLES[locOfEmoji]);
    }

    return;
  }
});

qVars.CLIENT.login(config.token);
