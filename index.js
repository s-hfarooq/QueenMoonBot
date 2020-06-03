// Load requirements
const config = require("./util/config.json");
const constVals = require("./util/constValues.js");
const qFuncs = require("./util/functions.js");

// General variables
const generalID = '669726484772159488', brownoutID = '697639057592811650', countingGameID = '698313651186040923', quoteID = '697329980044083220';
var brownoutOut = [], quotesOut = [];
var lastQuoteUpdate, lastBrownoutUpdate, updateInteval = (1000 * 60 * 60 * 24);
var generalLastCommandTime = 0, generalTimeGap = 5;

// Runs on start
constVals.CLIENT.on("ready", () => {
  console.log(`Bot has started`);
  constVals.CLIENT.user.setActivity(`queen help`);

  qFuncs.getMessagesWithAttachments(constVals.CLIENT.channels.cache.get(brownoutID)).then(output => {
    brownoutOut = output;
  });

  qFuncs.getMessagesWithAttachments(constVals.CLIENT.channels.cache.get(quoteID)).then(output => {
    quotesOut = output;
  });

  lastQuoteUpdate = Date.now();
  lastBrownoutUpdate = Date.now();

  console.log("images cached");
});

// Runs on join new server
constVals.CLIENT.on("guildCreate", guild => {
  console.log(`New guild joined`);
  constVals.CLIENT.user.setActivity(`queen help`);
});

// Runs on leave server
constVals.CLIENT.on("guildDelete", guild => {
  console.log(`Bot has been removed from a guild`);
  constVals.CLIENT.user.setActivity(`queen help`);
});

// Runs when a new message is sent on a server
constVals.CLIENT.on("message", async message => {
  // Counting game moderation
  if (message.channel.id === countingGameID) {
    qFuncs.countingGameModeration(message);
    return;
  }

  // Don't respond to bots
  if (message.author.bot)
    return;

  var command = message.content.toLowerCase();
  var override = false;

  // Make sure message starts with 'queen' or 'q'
  if (command.startsWith("queen ") || command.startsWith("q ")) {
    override = true;
    command = command.substr(command.indexOf(" ") + 1);
  }

  // If command is not run in general channel or if the gap between last command is greater than generalTimeGap, command will be run
  var currentTime = Math.round((new Date().getTime() / 1000));
  var timeDiff = currentTime - generalLastCommandTime;

  if (message.channel.id !== generalID || timeDiff >= generalTimeGap) {
    // Get command keyword
    var keyword = command.replace(/ .*/,'');

    // If trying to use buff command, get the [name] desired
    var buffName = "";
    if(keyword.startsWith("buff")) {
      keyword = "buff";
      buffName = command.substr(4).trim();
    }

    var command = command.substr(keyword.length + 1);

    if (override) {
      switch (keyword) {
        case "contribute":
          message.channel.send("https://github.com/s-hfarooq/QueenMoonBot");
          break;

        case "usercount":
          const userAmnt = constVals.CLIENT.guilds.cache.get('654783232969277450').memberCount;
          message.channel.send("There are currently " + userAmnt + " people in this server");
          break;

        case "class":
          message.channel.send("That command has been disabled. Use class bot instead.");
          break;

        case "buff":
          var output = "buff " + buffName + " buff " + buffName;
          if(output.length > 2000)
            output = "too buff";
          message.channel.send(output);
          break;

        case "8ball":
          var output = "That command can only be used in <#654838387160907777>";
          if (message.channel.id === '654838387160907777')
            output = "Question: " + command + "\nAnswer: " + constVals.responses[Math.floor(Math.random() * constVals.responses.length)];
          message.channel.send(output);
          break;

        case "thirst":
          var rand = Math.floor(Math.random() * constVals.REMINDERS.length);
          message.channel.send(constVals.REMINDERS[rand]);
          break;

        case "lofi":
          message.channel.send("https://open.spotify.com/playlist/1DcvziAZBZk1Ji1c65ePtk?si=Qtvu64zsQQurDtQa60tPBg");
          break;

        case "hackathon":
          message.channel.send({
            files: ['https://cdn.discordapp.com/attachments/654784388197908500/675113678856781834/Screenshot_20200102-213727_Discord.png']
          });
          break;

        case "gc":
          message.channel.send({
            files: ['https://cdn.discordapp.com/attachments/669726484772159488/701247357001400370/unknown.png']
          });
          break;

        case "head":
          message.channel.send({
            files: ['https://cdn.discordapp.com/attachments/669726484772159488/708103493918916709/unknown.png']
          });
          break;

        case "noanime":
          message.channel.send({
            files: ['https://cdn.discordapp.com/attachments/697639057592811650/708536846531035226/image0.jpg']
          });
          break;

        case "corn":
          message.channel.send({
            files: ["https://cdn.discordapp.com/attachments/697639057592811650/712531761774461008/Corn_is_the_best_crop__wheat_is_worst.mp4"]
          });
          break;

        case "brasil":
          message.channel.send({
            files: ['https://cdn.discordapp.com/attachments/654838387160907777/713538844582084691/Mundial_Ronaldinho_Soccer_64_Full_HD_Intro.mp4']
          });
          break;

        case "matt":
          message.channel.send({
            files: ['https://cdn.discordapp.com/attachments/669726484772159488/712182903966007296/IMG_9784.jpg']
          });
          break;

        case "illinois":
          message.channel.send({
            files: ['https://media.discordapp.net/attachments/654785556215103488/692035239366885416/tempFileForShare_20200302-175024.png?width=546&height=679']
          });
          break;

        case "catgirl":
          message.channel.send({
            files: ['https://img1.ak.crunchyroll.com/i/spire1/1b0597832b4aa93293041240680d6b471416589032_full.jpg']
          });
          break;

        case "earring":
          message.channel.send({
            files: ['https://cdn.discordapp.com/attachments/669726484772159488/713652674826076190/2Q.png']
          });
          break;

        case "gwagwa":
          message.channel.send("GWAGWA", {
            files: ['https://cdn.discordapp.com/attachments/669726484772159488/713289328985505792/gwa_gwa-QPYcuA0b6gA.mp4']
          });
          break;

        case "soup":
          message.channel.send({
            files: ['https://i.kym-cdn.com/entries/icons/original/000/026/699/soup.jpg']
          });
          break;

        case "waitwhen":
        case "ww":
          message.channel.send({
            files: ['https://cdn.discordapp.com/attachments/710425704524677211/711129644992036884/tim.png']
          });
          break;

        case "rat":
          if (message.channel.id !== generalID) {
            message.channel.send({
              files: ['https://cdn.discordapp.com/attachments/697639057592811650/713237658020872192/image0.jpg']
            });
          } else {
            message.channel.send("That command cannot be used in this channel!");
          }
          break;

        case "quote":
          if (message.channel.id !== generalID)
            quotesOut = qFuncs.sendRandImage(message, command, quotesOut, quoteID, lastQuoteUpdate, updateInteval);
          else
            message.channel.send("That command cannot be used in this channel!");
          break;

        case "brownout":
          if (message.channel.id === brownoutID)
            brownoutOut = qFuncs.sendRandImage(message, command, brownoutOut, brownoutID, lastBrownoutUpdate, updateInteval);
          else
            message.channel.send("That command can only be used in <#" + brownoutID + ">");
          break;

        case "help":
          const helpCommand = new Discord.MessageEmbed()
              	.setColor('#ffffff')
              	.setAuthor('Help')
              	.addField('queen usercount', 'See how many users are currently in the server', false)
              	.addField('queen buff[name]', 'Buff [name]', false)
              	.addField('queen waitwhen', 'Get the when did I ask screenshot', false)
              	.addField('queen illinois', 'Get a map of Illinois',false)
              	.addField('queen quote', 'Get a random image from #quotes', false)
              	.addField('queen 8ball [message]', 'Get an 8ball reply (only works in #spam)', false)
              	.addField('queen thirst', 'Get water messages', false)
              	.addField('queen ping', 'Get your ping', false)
                .addField('queen contribute', 'Get [a link to the GitHub repo](https://github.com/s-hfarooq/QueenMoonBot)', false)
                .addField('View all commands', '[View the README on GitHub](https://github.com/s-hfarooq/QueenMoonBot/blob/master/README.md)', false);
          message.channel.send({ embed: helpCommand });
          break;

        case "ping":
          var apiPing = Math.round(constVals.CLIENT.ws.ping);
          var messagePing = Date.now() - message.createdTimestamp;
          message.channel.send('Client ping: ' + messagePing + 'ms (API ping: ' + apiPing + 'ms)');
          break;

        case "cock":
          // responses for queen cock
          if (message.channel.id !== generalID) {
            var rand = Math.floor(Math.random() * constVals.CLINKS.length);
            message.channel.send({ files: [constVals.CLINKS[rand]] });
          } else {
            message.channel.send("That command cannot be used in this channel!");
          }
          break;

        case "orgy":
          if (message.channel.id !== generalID) {
            message.channel.send({
              files: ['https://cdn.discordapp.com/attachments/714931864413929512/716715109552095300/43hgta.gif']
            });
          } else {
            message.channel.send("That command cannot be used in this channel!");
          }
          break;

        case "rankdegen":
          var degenRank = Math.floor(Math.random() * 100);
          message.channel.send("you are " + degenRank + "% degenerate");
          break;

        case "owoify":
          if (message.channel.id !== generalID)
            qFuncs.owoifyMessage(message, command);
          else
            message.channel.send("That command cannot be used in this channel!");
          break;

        default:
          message.channel.send("That command doesn't exist. Run `queen help` to see the available commands");
      }

      // Reset cooldown timer for general
      if(message.channel.id == generalID)
        generalLastCommandTime = Math.round((new Date().getTime() / 1000));

      return;
    }
  } else if (override && timeDiff < generalTimeGap) {
    message.channel.send("Slow down!");
  }

});

constVals.CLIENT.login(config.token);
