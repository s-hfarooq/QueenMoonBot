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
    var letterEmojis = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹"];

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
      "iSchool"
    ];

    var livingLoc = [
      "Apartment",
      "Remote",
      "PCH",
      "Unit One LLC",
      "Busey Evans",
      "ISR",
      "LAR",
      "FAR",
      "PAR",
      "Ike North",
      "Ike South"
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
      "Acting",
      "Architecture",
      "Art and Art History",
      "Art Education",
      "Arts & Entertainment Tech",
      "Costume Design and Tech",
      "Dance",
      "Graphic Design",
      "Industrial Design",
      "Jazz Performance",
      "Landscape Architecture",
      "Lighting Design and Technology",
      "Lyric Theatre",
      "Music",
      "Music Composition",
      "Music Education",
      "Music Instrumental Performance",
      "Music Open Studies",
      "Music Voice Performance",
      "Musicology",
      "Photography",
      "Scenic Design",
      "Scenic Technology",
      "Sound Design and Tech",
      "Stage Management",
      "Studio Art",
      "Sustainable Design",
      "Theatre",
      "Urban Studies and Planning"
    ];

    var lasMajors = [
      "Actuarial Science",
      "African American Studies",
      "Anthro",
      "Asian American Studies",
      "Astronomy",
      "Atmospheric Sciences",
      "BioChem",
      "Biology",
      "Brain and Cog Sci",
      "ChemEng",
      "Chemistry",
      "Classics",
      "Communication",
      "Comparative and World Literature",
      "Creative Writing",
      "Earth, Society, and Environmental Sustainability",
      "EALC",
      "Econometrics and Quantitative Economics",
      "Economics",
      "English",
      "French",
      "Gender and Women's Studies",
      "Geography",
      "Geology",
      "Germanic Studies",
      "Global Studies",
      "History",
      "History of Art",
      "Biology",
      "Interdisciplinary Studies",
      "Italian",
      "Latin American Studies",
      "Latina/Latino Studies",
      "Linguistics",
      "Math",
      "MCB",
      "Philosophy",
      "Physics",
      "PolySci",
      "Portuguese",
      "Psychology",
      "Religion",
      "Russian, East European, and Eurasian Studies",
      "Secondary Education",
      "Slavic Studies",
      "Sociology",
      "Spanish",
      "Statistics",
      "Teacher Education: Language"
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
      "Supply Chain Management"
    ];

    var graingerMajors = [
      "AeroEng",
      "Agricultural and Biological Engineering",
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

    if (message.id == '745162331662843984') {
      // Year
      if(locOfEmoji == -1 || locOfEmoji > years.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, years[locOfEmoji]);
    } else if (message.id == '745162371848208384') {
      // Location
      if(locOfEmoji == -1 || locOfEmoji > location.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, location[locOfEmoji]);
    } else if (message.id == '745162420456259614') {
      // Pronouns
      if(locOfEmoji == -1 || locOfEmoji > pronouns.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, pronouns[locOfEmoji]);
    } else if (message.id == '745162473275129869') {
        // Staying
        if(locOfEmoji == -1 || locOfEmoji > livingLoc.length - 1)
          return;

        qFuncs.setUserRoles(message, user.id, livingLoc[locOfEmoji]);
    } else if (message.id == '745162532401971270') {
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
    } else if (message.id == '745162562588639261') {
      // ACES 2
      locOfEmoji += 18;
      qFuncs.setUserRoles(message, user.id, colleges[0]);
      qFuncs.setUserRoles(message, user.id, acesMajors[locOfEmoji]);
    } else if (message.id == '745162595991814155') {
      // Health Sciences
      if(locOfEmoji == -1 || locOfEmoji > 5)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[1]);
      qFuncs.setUserRoles(message, user.id, healthMajors[locOfEmoji]);
    } else if (message.id == '745162634554376242') {
      // Education
      if(locOfEmoji == -1 || locOfEmoji > 4)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[2]);
      qFuncs.setUserRoles(message, user.id, educationMajors[locOfEmoji]);
    } else if (message.id == '745162672320020490') {
      // Fine/Applied Arts 1
      if(locOfEmoji == -1 || locOfEmoji > 19)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[3]);
      qFuncs.setUserRoles(message, user.id, artMajors[locOfEmoji]);
    } else if (message.id == '745162688476217375') {
      // Fine/Applied Arts 2
      if(locOfEmoji == -1 || locOfEmoji > 8)
        return;

      locOfEmoji += 20;
      qFuncs.setUserRoles(message, user.id, colleges[3]);
      qFuncs.setUserRoles(message, user.id, artMajors[locOfEmoji]);
    } else if (message.id == '745162728934735884') {
      // LAS 1
      if(locOfEmoji == -1 || locOfEmoji > 19)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[4]);
      qFuncs.setUserRoles(message, user.id, lasMajors[locOfEmoji]);
    } else if (message.id == '745162751248171059') {
      // LAS 2
      if(locOfEmoji == -1 || locOfEmoji > 19)
        return;

      locOfEmoji += 20;
      qFuncs.setUserRoles(message, user.id, colleges[4]);
      qFuncs.setUserRoles(message, user.id, lasMajors[locOfEmoji]);
    } else if (message.id == '745162770617598032') {
      // LAS 3
      if(locOfEmoji == -1 || locOfEmoji > 17)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[4]);

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

      qFuncs.setUserRoles(message, user.id, lasMajors[locOfEmoji]);
    } else if (message.id == '745162802137792655') {
      // Media
      if(locOfEmoji == -1 || locOfEmoji > mediaMajors.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[5]);
      qFuncs.setUserRoles(message, user.id, mediaMajors[locOfEmoji]);
    } else if (message.id == '745162844579823637') {
      // DGS
      if(locOfEmoji == -1 || locOfEmoji > dgsMajors.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[6]);
      qFuncs.setUserRoles(message, user.id, dgsMajors[locOfEmoji]);
    } else if (message.id == '745162874434879549') {
      // Gies
      if(locOfEmoji == -1 || locOfEmoji > giesMajors.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[7]);
      qFuncs.setUserRoles(message, user.id, giesMajors[locOfEmoji]);
    } else if (message.id == '745162909335814145') {
      // Grainger
      if(locOfEmoji == -1 || locOfEmoji > graingerMajors.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[8]);
      qFuncs.setUserRoles(message, user.id, graingerMajors[locOfEmoji]);
    } else if (message.id == '745162937890635896') {
      // Info Sci
      if(locOfEmoji == -1 || locOfEmoji > infosciMajors.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[9]);
      qFuncs.setUserRoles(message, user.id, infosciMajors[locOfEmoji]);
    } else if (message.id == '745162964973125672') {
      // Social Work
      if(locOfEmoji == -1 || locOfEmoji > socialWorkMajors.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, colleges[1]);
      qFuncs.setUserRoles(message, user.id, socialWorkMajors[locOfEmoji]);
    } else if (message.id == '745162998473162852') {
      // Special Roles
      if(locOfEmoji == -1 || locOfEmoji > specialRoles.length - 1)
        return;

      qFuncs.setUserRoles(message, user.id, specialRoles[locOfEmoji]);
    }

    return;
  }
});

qVars.CLIENT.login(config.token);
