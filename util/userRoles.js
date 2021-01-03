const Discord = require("discord.js");
const qVars = require("./qVariables.js");

var userReactRoles = function(message, user, reaction, isSet) {
  if (message.channel.id == '745160938692280360') {
    console.log("message reacted");

    // Find which message was reacted
    var msgs = ['745162331662843984', '745162371848208384', '745162420456259614', '745162473275129869', '745162532401971270', '745162562588639261',
      '745162595991814155', '745162634554376242', '745162672320020490', '745162688476217375', '745162728934735884', '745162751248171059',
      '745162770617598032', '745162802137792655', '745162844579823637', '745162874434879549', '745162909335814145', '745162937890635896',
      '745162964973125672', '745162998473162852'
    ];

    var msgNum = msgs.indexOf(message.id);
    if (msgNum < 0)
      return;

    // Max of one major using auto-roles
    if (isSet && msgNum > 3 && msgNum < 19 && getNumOfMajors(message, user.id) >= 1) {
      qVars.CLIENT.users.cache.get(user.id).send("You may only set a single major using auto-roles. If you would like more, please DM a mod (anyone on the server with the @ESC or @mod roles) for assistance.");
      return;
    }

    var locOfEmoji = qVars.LETTEREMOJIS.indexOf(reaction.emoji.name);

    switch (msgNum) {
      case 0:
        // Year
        if (locOfEmoji == -1 || locOfEmoji > qVars.YEARS.length - 1)
          return;

        if (isSet) {
          editRoles(message, user.id, "Prospective Student", false);

          for (let i = 0; i < qVars.YEARS.length - 1; i++) {
            if (message.guild.member(user.id).roles.cache.find(r => r.name === qVars.YEARS[i])) {
              qVars.CLIENT.users.cache.get(user.id).send("You may only have a single graduation year. Please de-select the other year before setting a new one.");
              return;
            }
          }
        }

        editRoles(message, user.id, qVars.YEARS[locOfEmoji], isSet);

        if (!isSet) {
          var amnt = 0;
          for (let i = 0; i < qVars.YEARS.length - 1; i++) {
            if (message.guild.member(user.id).roles.cache.find(r => r.name === qVars.YEARS[i]))
              amnt++
          }

          if (amnt == 0)
            editRoles(message, user.id, "Prospective Student", true);
        }
        break;

      case 1:
        // Location
        if (locOfEmoji == -1 || locOfEmoji > qVars.LOCATION.length - 1)
          return;

        if (isSet) {
          for (let i = 0; i < qVars.LOCATION.length; i++) {
            if (message.guild.member(user.id).roles.cache.find(r => r.name === qVars.LOCATION[i])) {
              qVars.CLIENT.users.cache.get(user.id).send("You may only have a single location. Please de-select the other location before setting a new one.");
              return;
            }
          }
        }

        editRoles(message, user.id, qVars.LOCATION[locOfEmoji], isSet);
        break;

      case 2:
        // Pronouns
        if (locOfEmoji == -1 || locOfEmoji > qVars.PRONOUNS.length - 1)
          return;

        editRoles(message, user.id, qVars.PRONOUNS[locOfEmoji], isSet);
        break;

      case 3:
        // Staying
        if (locOfEmoji == -1 || locOfEmoji > qVars.LIVINGLOC.length - 1)
          return;

        if (isSet) {
          for (let i = 0; i < qVars.LIVINGLOC.length; i++) {
            if (message.guild.member(user.id).roles.cache.find(r => r.name === qVars.LIVINGLOC[i])) {
              qVars.CLIENT.users.cache.get(user.id).send("You may only have a single living location. Please de-select the other living location before setting a new one.");
              return;
            }
          }
        }

        editRoles(message, user.id, qVars.LIVINGLOC[locOfEmoji], isSet);
        break;

      case 4:
        // ACES 1
        // Handle special case roles
        switch (locOfEmoji) {
          case -1:
            return;

          case 0:
            editRoles(message, user.id, qVars.COLLEGES[0], isSet);
            editRoles(message, user.id, "Undeclared", isSet)
            return;

          case 5:
            editRoles(message, user.id, qVars.COLLEGES[0], isSet);
            editRoles(message, user.id, "Advertising", isSet);
            editRoles(message, user.id, qVars.COLLEGES[0], isSet);
            editRoles(message, user.id, qVars.ACESMAJORS[26], isSet);
            return;

          case 6:
            editRoles(message, user.id, qVars.COLLEGES[0], isSet);
            editRoles(message, user.id, "Journalism", isSet);
            editRoles(message, user.id, qVars.ACESMAJORS[26], isSet);
            return;

          default:
            break;
        }

        if (locOfEmoji > 6)
          locOfEmoji -= 3;
        else
          locOfEmoji--;

        editRoles(message, user.id, qVars.COLLEGES[0], isSet);
        editRoles(message, user.id, qVars.ACESMAJORS[locOfEmoji], isSet);
        break;

      case 5:
        // ACES 2
        locOfEmoji += 18;
        editRoles(message, user.id, qVars.COLLEGES[0], isSet);
        editRoles(message, user.id, qVars.ACESMAJORS[locOfEmoji], isSet);
        break;

      case 6:
        // Health Sciences
        if (locOfEmoji == -1 || locOfEmoji > 5)
          return;

        editRoles(message, user.id, qVars.COLLEGES[1], isSet);
        editRoles(message, user.id, qVars.HEALTHMAJORS[locOfEmoji], isSet);
        break;

      case 7:
        // Education
        if (locOfEmoji == -1 || locOfEmoji > 4)
          return;

        editRoles(message, user.id, qVars.COLLEGES[2], isSet);
        editRoles(message, user.id, qVars.EDUCATIONMAJORS[locOfEmoji], isSet);
        break;

      case 8:
        // Fine/Applied Arts 1
        if (locOfEmoji == -1 || locOfEmoji > 19)
          return;

        editRoles(message, user.id, qVars.COLLEGES[3], isSet);
        editRoles(message, user.id, qVars.ARTMAJORS[locOfEmoji], isSet);
        break;

      case 9:
        // Fine/Applied Arts 2
        if (locOfEmoji == -1 || locOfEmoji > 8)
          return;

        locOfEmoji += 20;
        editRoles(message, user.id, qVars.COLLEGES[3], isSet);
        editRoles(message, user.id, qVars.ARTMAJORS[locOfEmoji], isSet);
        break;

      case 10:
        // LAS 1
        if (locOfEmoji == -1 || locOfEmoji > 19)
          return;

        editRoles(message, user.id, qVars.COLLEGES[4], isSet);
        editRoles(message, user.id, qVars.LASMAJORS[locOfEmoji], isSet);
        break;

      case 11:
        // LAS 2
        if (locOfEmoji == -1 || locOfEmoji > 19)
          return;

        locOfEmoji += 20;
        editRoles(message, user.id, qVars.COLLEGES[4], isSet);
        editRoles(message, user.id, qVars.LASMAJORS[locOfEmoji], isSet);
        break;

      case 12:
        // LAS 3
        if (locOfEmoji == -1 || locOfEmoji > 17)
          return;

        editRoles(message, user.id, qVars.COLLEGES[4], isSet);

        if (locOfEmoji > 8) {
          // add CS role
          editRoles(message, user.id, "CompSci + X", isSet);
          locOfEmoji -= 8;

          switch (locOfEmoji) {
            // add +x role
            case 1:
              editRoles(message, user.id, "Geography", isSet);
              break;
            case 2:
              editRoles(message, user.id, "Philosophy", isSet);
              break;
            case 3:
              editRoles(message, user.id, "Anthro", isSet);
              break;
            case 4:
              editRoles(message, user.id, "Astronomy", isSet);
              break;
            case 5:
              editRoles(message, user.id, "Chemistry", isSet);
              break;
            case 6:
              editRoles(message, user.id, "Econ", isSet);
              break;
            case 7:
              editRoles(message, user.id, "Linguistics", isSet);
              break;
            case 8:
              editRoles(message, user.id, "Math", isSet);
              break;
            case 9:
              editRoles(message, user.id, "Statistics", isSet);
              break;
          }

          return;
        }

        locOfEmoji += 40;

        editRoles(message, user.id, qVars.LASMAJORS[locOfEmoji], isSet);
        break;

      case 13:
        // Media
        if (locOfEmoji == -1 || locOfEmoji > qVars.MEDIAMAJORS.length)
          return;

        editRoles(message, user.id, qVars.COLLEGES[5], isSet);

        if (locOfEmoji == 3) {
          editRoles(message, user.id, "CompSci + X", isSet);
          locOfEmoji = 0;
        }

        editRoles(message, user.id, qVars.MEDIAMAJORS[locOfEmoji], isSet);
        break;

      case 14:
        // DGS
        if (locOfEmoji == -1 || locOfEmoji > qVars.DGSMAJORS.length - 1)
          return;

        editRoles(message, user.id, qVars.COLLEGES[6], isSet);
        editRoles(message, user.id, qVars.DGSMAJORS[locOfEmoji], isSet);
        break;

      case 15:
        // Gies
        if (locOfEmoji == -1 || locOfEmoji > qVars.GIESMAJORS.length - 1)
          return;

        editRoles(message, user.id, qVars.COLLEGES[7], isSet);
        editRoles(message, user.id, qVars.GIESMAJORS[locOfEmoji], isSet);
        break;

      case 16:
        // Grainger
        if (locOfEmoji == -1 || locOfEmoji > qVars.GRAINGERMAJORS.length - 1)
          return;

        editRoles(message, user.id, qVars.COLLEGES[8], isSet);
        editRoles(message, user.id, qVars.GRAINGERMAJORS[locOfEmoji], isSet);
        break;

      case 17:
        // Info Sci
        if (locOfEmoji == -1 || locOfEmoji > qVars.INFOSCIMAJORS.length - 1)
          return;

        editRoles(message, user.id, qVars.COLLEGES[9], isSet);
        editRoles(message, user.id, qVars.INFOSCIMAJORS[locOfEmoji], isSet);
        break;

      case 18:
        // Social Work
        if (locOfEmoji == -1 || locOfEmoji > qVars.SOCIALMAJORS.length - 1)
          return;

        editRoles(message, user.id, qVars.COLLEGES[1], isSet);
        editRoles(message, user.id, qVars.SOCIALMAJORS[locOfEmoji], isSet);
        break;

      case 19:
        // Special Roles
        if (locOfEmoji == -1 || locOfEmoji > qVars.SPECIALROLES.length - 1)
          return;

        editRoles(message, user.id, qVars.SPECIALROLES[locOfEmoji], isSet);
        break;
    }

    return;
  }
};

var editRoles = function(message, userId, roleName, isSet) {
  var currRole = message.guild.roles.cache.find(role => role.name === roleName);
  message.guild.members.fetch();

  message.guild.members.fetch(userId).then(member => {
    if(isSet)
      member.roles.add(currRole);
    else
      member.roles.remove(currRole);
  })
};

var getNumOfMajors = function(message, userId) {
  var amnt = 0;

  var allMajors = [
    qVars.ACESMAJORS,
    qVars.HEALTHMAJORS,
    qVars.EDUCATIONMAJORS,
    qVars.ARTMAJORS,
    qVars.LASMAJORS,
    qVars.MEDIAMAJORS,
    qVars.DGSMAJORS,
    qVars.GIESMAJORS,
    qVars.GRAINGERMAJORS,
    qVars.INFOSCIMAJORS,
    qVars.SOCIALMAJORS,
  ];

  for (let i = 0; i < allMajors.length; i++) {
    for (let j = 0; j < allMajors[i].length; j++) {
      if (message.guild.member(userId).roles.cache.find(r => r.name === allMajors[i][j]))
        amnt++;

      if (amnt >= 2)
        return amnt;
    }
  }

  return amnt;
};

module.exports = {
  userReactRoles,
};
