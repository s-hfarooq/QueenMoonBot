// Load requirements
const Discord = require("discord.js");
const config = require("./config.json");
const owoify = require('owoify-js').default;

// General variables
var brownoutOut = [], quotesOut = [];
var lastQuoteUpdate, lastBrownoutUpdate, updateInteval = (1000 * 60 * 60 * 24);
var generalID = '669726484772159488', brownoutID = '697639057592811650';
var generalLastCommandTime = 0, generalTimeGap = 5;

// Responses for 8ball
var responses = ['It is certain.',
  'It is decidedly so.',
  'Without a doubt.',
  'Yes - definitely.',
  'You may rely on it.',
  'As I see it, yes.',
  'Most likely.',
  'Outlook good.',
  'Yes.',
  'Signs point to yes.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  'Cannot predict now.',
  'Concentrate and ask again.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Outlook not so good',
  'Very doubtful'
];

// Responses for thirst command
var reminders = ['A friendly reminder to stay hydrated.',
  'Quench your thirst.',
  'Did you drink enough water today?',
  'BEGONE',
  'stfu',
  'u thirsty hoe',
  'It is important to drink 8 glasses of water a day.',
  "goddammit i'm running out of creative ways to insult you people"
];

const client = new Discord.Client({
  partials: ['MESSAGE']
});

// Runs on start
client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`queen help`);

  getMessagesWithImages(client.channels.cache.get(brownoutID)).then(output => {
    brownoutOut = output;
  });

  getMessagesWithImages(client.channels.cache.get("697329980044083220")).then(output => {
    quotesOut = output;
  });

  lastQuoteUpdate = Date.now();
  lastBrownoutUpdate = Date.now();

  console.log("images cached");
});

// Runs on join new server
client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`queen help`);
});

// Runs on leave server
client.on("guildDelete", guild => {
  console.log(`Bot has been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`queen help`);
});

// Get all messages with media attached in a given channel
async function getMessagesWithImages(channel, limit = 500) {
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

// Runs when a new message is sent on a server
client.on("message", async message => {
  // Counting game stuff
  if (message.channel.id === '698313651186040923') {
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

  // Don't respond to bots
  if (message.author.bot)
    return;

  var command = message.content.toLowerCase();
  let override = false;

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
          const userAmnt = client.guilds.cache.get('654783232969277450').memberCount;
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
          if (message.channel.id === '654838387160907777') {
            var rand = Math.floor(Math.random() * responses.length);
            message.channel.send("Question: " + message.content.substring(7) + "\nAnswer: " + responses[rand]);
          } else {
            message.channel.send("That command can only be used in <#654838387160907777>");
          }
          break;

        case "thirst":
          var rand = Math.floor(Math.random() * reminders.length);
          message.channel.send(reminders[rand]);
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

        case "no anime":
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
          if (message.channel.id !== generalID) {
            // Update array once a day
            if (Math.abs(lastQuoteUpdate - Date.now()) > updateInteval) {
              getMessagesWithImages(client.channels.cache.get("697329980044083220")).then(output => {
                quotesOut = output;
              });

              lastQuoteUpdate = Date.now();
            }

            // Fixes UnhandledPromiseRejectionWarning when images are still being loaded
            if (quotesOut.length == 0) {
              message.channel.send("Images are still loading. Try again in a few seconds.");
            } else {
              var amnt = isNaN(parseInt(command)) ? 1 : parseInt(command);
              if(amnt > 5 || amnt < 0)
                amnt = 1;

              for (let i = 0; i < amnt; i++) {
                let rand = Math.floor(Math.random() * quotesOut.length);
                message.channel.send({
                  files: [quotesOut[rand].attachments.first().url]
                });
              }
            }
          } else {
            message.channel.send("That command cannot be used in this channel!");
          }
          break;

        case "brownout":
          if (message.channel.id === brownoutID) {
            // Update array once a day
            if (Math.abs(lastBrownoutUpdate - Date.now()) > updateInteval) {
              getMessagesWithImages(client.channels.cache.get(brownoutID)).then(output => {
                brownoutOut = output;
              });

              lastBrownoutUpdate = Date.now();
            }

            // Fixes UnhandledPromiseRejectionWarning when images are still being loaded
            if (brownoutOut.length == 0) {
              message.channel.send("Images are still loading. Try again in a few seconds.");
            } else {
              var amnt = isNaN(parseInt(command)) ? 1 : parseInt(command);
              if(amnt > 5 || amnt < 0)
                amnt = 1;

              for (let i = 0; i < amnt; i++) {
                let rand = Math.floor(Math.random() * brownoutOut.length);
                message.channel.send({
                  files: [brownoutOut[rand].attachments.first().url]
                });
              }
            }
          } else {
            message.channel.send("That command can only be used in <#" + brownoutID + ">");
          }
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
          var apiPing = Math.round(client.ws.ping);
          var messagePing = Date.now() - message.createdTimestamp;
          message.channel.send('Client ping: ' + messagePing + 'ms (API ping: ' + apiPing + 'ms)');
          break;

        case "cock":
          // responses for queen cock
          if (message.channel.id !== generalID) {
            var links = [
                // nooble
                'https://cdn.discordapp.com/attachments/714931864413929512/716093335185522688/image0.png',
                // kitty
                'https://cdn.discordapp.com/attachments/714931864413929512/716094595309633597/image0.jpg',
                // rooster
                'https://cdn.discordapp.com/attachments/714931864413929512/716103472444997673/image0.jpg',
                // badminton
                'https://cdn.discordapp.com/attachments/714931864413929512/716103629454442516/image0.jpg',
                // anime
                'https://cdn.discordapp.com/attachments/697639057592811650/716491275192500254/image0.jpg',
            ]
            var rand = Math.floor(Math.random() * links.length);
            message.channel.send({ files: [links[rand]] });
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
          var degenrank = Math.floor(Math.random() * 100);
          message.channel.send("you are " + degenrank + "% degenerate");
          break;

        case "owoify":
          if (message.channel.id !== generalID) {
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
          } else {
            message.channel.send("That command cannot be used in this channel!");
          }
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

client.login(config.token);
