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
        .addField("Time", new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', timeZoneName: 'short' }));

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
  qVars.CLIENT.channels.cache.get(qVars.LOGID).send({ embed: currDeleted });
});

// Runs on message edit
qVars.CLIENT.on('messageUpdate', (oldMessage, newMessage) => {
  // Ignore bot messages, identical messages (ie. when links get a preview), and only log UIUC24 messages
  if (newMessage.author.bot || oldMessage.cleanContent == newMessage.cleanContent || newMessage.guild.id != qVars.UIUCGUILDID)
    return;

  // Ensure messages aren't blank
  if (oldMessage.cleanContent && newMessage.cleanContent) {
    // Make sure text isn't too long
    var oldMsg = oldMessage.cleanContent, newMsg = newMessage.cleanContent;
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
          .addField("Time", new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', timeZoneName: 'short' }));

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

  if (message.channel.name == 'dont-type-here-new-roles-v2') {
    var letterEmojis = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰"];
    var otherEmojis = ["🚗", "✈️", "🗺️", "🏠", "🏬", "🏡"];

    var years = [
      "Alumni",
      "2021",
      "2022",
      "2023",
      "2024",
      "Prospective Student"
    ];

    var location = [
      "In State",
      "OOS",
      "Int"
    ]

    var pronouns = [
      "He/Him",
      "She/Her",
      "They,Them"
    ];

    var colleges = [
      "ACES",
      "AHS",
      "Education",
      "FAA",
      "LAS",
      "Media",
      "DGS",
      "Gies",
      "Grainger",
    ];

    var livingLoc = [
      "Apartment",
      "Remote",
      "PAR",
      "FAR",
      "LAR",
      "ISR",
      "Allen",
      "Busey Evans",
      "Ike North",
      "Ike South",
      "PCH"
    ];

    var acesMajors = [
      "Agri-Accounting",
      "AgBusiness",
      "Agricultural and Biological Engineering",
      "Agricultural and Consumer Economics",
      "Agricultural Communications",
      "Agricultural Education",
      "Agricultural Leadership, Education, and Communications",
      "AnimalSci",
      "Consumer Economics & Finance",
      "CropSci",
      "Dietetics",
      "Environmental Economics & Policy",
      "Farm Management",
      "Finance in Agri-Business",
      "Financial Planning",
      "Food Science",
      "Food Science & Human Nutrition",
      "Hospitality Management",
      "Human Development and Family Studies",
      "Human Nutrition",
      "Metropolitan Food & Environmental Sciences",
      "Natural Resources and Environmental Sciences",
      "Organizational and Community Leadership",
      "Policy, International Trade & Development",
      "Public Policy & Law",
      "Technical Systems Management",
      "AgComm",
    ];

    var healthMajors = [
      "Community Health",
      "HealthSci",
      "Kinesiology",
      "Recreation, Sport, and Tourism",
      "Speech and Hearing Science",
      "Teacher Education: Kinesiology - Physical Education (K-12)"
    ];

    var educationMajors = [
      "EarlyEdu",
      "ElementaryEdu",
      "Learning & Education Studies",
      "Middle Grades Edu",
      "SpecialEdu"
    ];

    var artMajors = [
      Acting
      "Architecture",
      Art and Art History
      Art Education (K-12)
      Arts & Entertainment Technology
      Costume Design and Technology
      Dance
      "Graphic Design",
      "Industrial Design",
      Jazz Performance
      Landscape Architecture
      Lighting Design and Technology
      Lyric Theatre
      "Music",
      Music Composition
      "Music Education",
      Music Instrumental Performance
      Music Open Studies
      Music Voice Performance
      Musicology



      Photography
      Scenic Design
      Scenic Technology
      Sound Design and Technology
      Stage Management
      Studio Art
      Sustainable Design
      "Theatre",
      Urban Studies and Planning
    ];

    var lasMajors = [
      "Actuarial Science",
       African American Studies
       "Anthro",
       Asian American Studies
       "Astronomy",
       "Atmospheric Sciences",
       "BioChem",
       "Biology",
       "Brain and Cog Sci",
       "ChemEng",
       "Chemistry",
       Classics
       "Communication",
       Comparative and World Literature
       Computer Science & Geography and Geographic Information Science
       Computer Science & Philosophy
       Computer Science and Anthropology
       Computer Science and Astronomy
       Computer Science and Chemistry
       Computer Science and Economics



       Computer Science and Linguistics
       Creative Writing
       Earth, Society, and Environmental Sustainability
       "EALC",
       Econometrics and Quantitative Economics
       "Economics",
       "English",
       "French",
       Gender and Women's Studies
       "Geography",
       "Geology",
       Germanic Studies
       Global Studies
       "History",
       History of Art
       Integrative Biology
       Interdisciplinary Studies
       Italian
       Latin American Studies
       Latina/Latino Studies



      "Linguistics",
      "Math",
      Mathematics and Computer Science
      "MCB",
      "Philosophy",
      "Physics",
      "PolySci",
      Portuguese
      "Psychology",
      Religion
      Russian, East European, and Eurasian Studies
      Secondary Education
      Secondary Education: Biology
      Secondary Education: Chemistry
      Secondary Education: Earth Science
      Secondary Education: English
      Secondary Education: Mathematics
      Secondary Education: Physics
      Secondary Education: Social Studies
      Slavic Studies


      "Sociology",
      Spanish
      "Statistics",
      Statistics and Computer Science
      Teacher Education: French (K-12)
      Teacher Education: German (K-12)
      Teacher Education: Spanish (K-12)
    ];

    var mediaMajors = [
      "Advertising",
      "Journalism",
      "Media and Cinema Studies"
    ];

    var dgsMajors = [
      "Undeclared",
      "Pre-Eng"
    ];

    var giesMajors = [
      "Accounting",
      "Finance",
      "Information Systems",
      "Management",
      "Marketing",
      "Operations Management",
      "Strategic Business Development and Entrepreneurship",
      "Supply Chain Management
    ];

    var graingerMajors = [
      "AeroEng",
      "Agricultural and Biological Engineering"
      "BioEng",
      "CivEng",
      "CompEng",
      "CompSci",
      "ElecEng",
      "EngMech",
      "IndustrialEng",
      "MatSciEng",
      "MechEng",
      "NuclearEng",
      "EngPhys",
      "SystemsEng"
    ];

    var infosciMajors = [
      "InfoSci"
    ];

    var socialWorkMajors = [
      "Social Work"
    ];

    var specialRoles = [
      "VC GANG"
    ];

    var locOfEmoji = letterEmojis.indexOf(reaction.emoji.name);

    if (message.id == '745083947163189288') {
      // Year
      if(locOfEmoji == -1 || locOfEmoji > years.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, years[locOfEmoji]);
      return;
    } else if (message.id == '745083978339581974') {
      // Location
      if(locOfEmoji == -1 || locOfEmoji > location.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, location[locOfEmoji]);
      return;
    } else if (message.id == '') {
      // Pronouns
      if(locOfEmoji == -1 || locOfEmoji > pronouns.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, pronouns[locOfEmoji]);
      return;
    } else if (message.id == '') {
        // Staying
        if(locOfEmoji == -1 || locOfEmoji > livingLoc.length - 1)
          return;

        // TODO
        return;
    } else if (message.id == '745084079170519090') {
      // ACES 1

      // Handle special case roles
      switch(locOfEmoji) {
        case -1:
          return;

        case 0:
          qFuncs.setUserRoles(message, user.id, colleges[0]);
          qFuncs.setUserRoles(message, user.id, "Undeclared")
          return;

        case 5:
          qFuncs.setUserRoles(message, user.id, colleges[0]);
          qFuncs.setUserRoles(message, user.id, "Advertising");
          qFuncs.setUserRoles(message, user.id, colleges[0]);
          qFuncs.setUserRoles(message, user.id, acesMajors[26]);
          return;

        case 6:
          qFuncs.setUserRoles(message, user.id, colleges[0]);
          qFuncs.setUserRoles(message, user.id, "Journalism");
          qFuncs.setUserRoles(message, user.id, acesMajors[26]);
          return;

        default:
          break;
      }

      if(locOfEmoji > 6)
        locOfEmoji -= 3;
      else
        locOfEmoji--;

      qFuncs.setUserRoles(message, user.id, colleges[0]);
      qFuncs.setUserRoles(message, user.id, acesMajors[locOfEmoji]);
      return;
    } else if (message.id == '745084097445232663') {
      // ACES 2
      locOfEmoji += 18;
      qFuncs.setUserRoles(message, user.id, colleges[0]);
      qFuncs.setUserRoles(message, user.id, acesMajors[locOfEmoji]);
      return;
    } else if (message.id == '') {
      // Health Sciences
      if(locOfEmoji == -1 || locOfEmoji > 5)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[1]);
      qFuncs.setUserRoles(message, user.id, healthMajors[locOfEmoji]);
      return;
    } else if (message.id == '') {
      // Education
      if(locOfEmoji == -1 || locOfEmoji > 4)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[2]);
      qFuncs.setUserRoles(message, user.id, educationMajors[locOfEmoji]);
      return;
    } else if (message.id == '') {
      // Fine/Applied Arts 1
    } else if (message.id == '') {
      // Fine/Applied Arts 2
    } else if (message.id == '') {
      // LAS 1
    } else if (message.id == '') {
      // LAS 2
    } else if (message.id == '') {
      // LAS 3
    } else if (message.id == '') {
      // LAS 4
    } else if (message.id == '') {
      // Media
    } else if (message.id == '') {
      // DGS
      if(locOfEmoji == -1 || locOfEmoji > dgsMajors.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[6]);
      qFuncs.setUserRoles(message, user.id, dgsMajors[locOfEmoji]);
      return;
    } else if (message.id == '') {
      // Gies
      if(locOfEmoji == -1 || locOfEmoji > giesMajors.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[7]);
      qFuncs.setUserRoles(message, user.id, giesMajors[locOfEmoji]);
      return;
    } else if (message.id == '') {
      // Grainger
      if(locOfEmoji == -1 || locOfEmoji > graingerMajors.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[8]);
      qFuncs.setUserRoles(message, user.id, graingerMajors[locOfEmoji]);
      return;
    } else if (message.id == '') {
      // Info Sci
      if(locOfEmoji == -1 || locOfEmoji > infosciMajors.length - 1)
        return;

      // TODO add college
      qFuncs.setUserRoles(message, user.id, infosciMajors[locOfEmoji]);
      return;
    } else if (message.id == '') {
      // Social Work
      if(locOfEmoji == -1 || locOfEmoji > socialWorkMajors.length - 1)
        return;

      // TODO add college
      qFuncs.setUserRoles(message, user.id, socialWorkMajors[locOfEmoji]);
      return;
    } else if (message.id == '') {
      // Special Roles
      if(locOfEmoji == -1 || locOfEmoji > specialRoles.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, specialRoles[locOfEmoji]);
      return;
    }


  }
});

// Runs on reaction removed
qVars.CLIENT.on('messageReactionRemove', async (reaction, user) => {
  let message = reaction.message;

  // Remove pronoun roles
  // if (message.channel.name == 'set_roles_here') {
  //     if (reaction.emoji.name === "1️⃣") {
  //       let he_him = message.guild.roles.cache.find(role => role.name === "He/Him");
  //       reaction.message.guild.member(user.id).roles.remove(he_him);
  //     }
  //     if (reaction.emoji.name === "2️⃣") {
  //       let she_her = message.guild.roles.cache.find(role => role.name === "She/Her");
  //       reaction.message.guild.member(user.id).roles.remove(she_her);
  //     }
  //     if (reaction.emoji.name === "3️⃣") {
  //       let they_them = message.guild.roles.cache.find(role => role.name === "They/Them");
  //       reaction.message.guild.member(user.id).roles.remove(they_them);
  //     }
  // }
});

qVars.CLIENT.login(config.token);
