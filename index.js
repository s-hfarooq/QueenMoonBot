// Load requirements
const Discord = require("discord.js");
const fs = require('fs');
const count = require('./count.json');
const config = require("./config.json");

// general var's
var brownoutOut = [];
var quotesOut = [];
var lastQuoteUpdate;
var lastBrownoutUpdate;
var updateInteval = (1000 * 60 * 60 * 24);
var generalID = '669726484772159488';
var brownoutID = '697639057592811650';

var generalLastCommandTime = 0; // general cmd timestamp
var generalTimeGap = 5; // time (in seconds) between cmd's in general

const client = new Discord.Client({
  partials: ['MESSAGE']
});

// responses for 8ball
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

// reminders for thirst command
var reminders = ['A friendly reminder to stay hydrated.',
  'Quench your thirst.',
  'Did you drink enough water today?',
  'BEGONE',
  'stfu',
  'u thirsty hoe',
  'It is important to drink 8 glasses of water a day.',
  "goddammit i'm running out of creative ways to insult you people"
];


// Run on start
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
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`queen help`);
});

// Get all messages with media attached in a given channel
async function getMessagesWithImages(channel, limit = 500) {
  const sum_messages = [];
  let last_id;

  while (true) {
    const options = {
      limit: 100
    };

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

      // If next number not old number + 1
      if (Number(lastMessage[0].content).toString() !== lastMessage[0].content || Number(lastMessage[0].content) - 1 != Number(lastMessage[1].content)) {
        // Add Can't Count role if number isn't next in counting game and > 1500 ms between the two messages
        if (Math.abs(lastMessage[0].createdTimestamp - lastMessage[1].createdTimestamp) > 1500) {
          // Because Gloria is special
          if (lastMessage[0].member.id !== '242067290479132675') {
            const tMember = lastMessage[0].member.guild.roles.cache.find(role => role.name === "Can't Count");
            lastMessage[0].member.roles.add(tMember).catch(console.error);
          }
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


  // if command is not ran in general channel OR if the gap between last command is 5 seconds or more, command will be run
  var currentTime = Math.round((new Date().getTime() / 1000));
  var timeDiff = currentTime - generalLastCommandTime;

  if (message.channel.id !== generalID || timeDiff >= generalTimeGap) {
    // run command
    if (override) {
      // usercount cmd
      if (command.startsWith("usercount")) {
        const userAmnt = client.guilds.cache.get('654783232969277450').memberCount;
        message.channel.send("There are currently " + userAmnt + " people in this server");
        // buff[name] cmd
      } else if (command.startsWith("buff")) {
        const name = command.substr(4).trim();
        var output = "buff " + name + " buff " + name;
        if(output.length > 2000)
          output = "too buff";
        message.channel.send(output);
        // hackathon cmd
      } else if (command.startsWith("hackathon")) {
        message.channel.send({
          files: ['https://cdn.discordapp.com/attachments/654784388197908500/675113678856781834/Screenshot_20200102-213727_Discord.png']
        });
        // gc cmd
      } else if (command.startsWith("gc")) {
        message.channel.send({
          files: ['https://cdn.discordapp.com/attachments/669726484772159488/701247357001400370/unknown.png']
        });
        // head cmd
      } else if (command.startsWith("head")) {
        message.channel.send({
          files: ['https://cdn.discordapp.com/attachments/669726484772159488/708103493918916709/unknown.png']
        });
        // rat cmd
      } else if (command.startsWith("rat")) {
        if (message.channel.id !== generalID) {
          message.channel.send({
            files: ['https://cdn.discordapp.com/attachments/697639057592811650/713237658020872192/image0.jpg']
          });
        } else {
          message.channel.send("That command cannot be used in this channel!");
        }
        // no anime cmd
      } else if (command.startsWith("no anime")) {
        message.channel.send({
          files: ['https://cdn.discordapp.com/attachments/697639057592811650/708536846531035226/image0.jpg']
        });
        // contribute cmd
      } else if (command.startsWith("contribute")) {
        message.channel.send("https://github.com/s-hfarooq/QueenMoonBot");
        // corn cmd
      } else if (command.startsWith("corn")) {
        message.channel.send({
          files: ["https://cdn.discordapp.com/attachments/697639057592811650/712531761774461008/Corn_is_the_best_crop__wheat_is_worst.mp4"]
        });
        // brasil cmd
      } else if (command.startsWith("brasil")) {
        message.channel.send({
          files: ['https://cdn.discordapp.com/attachments/654838387160907777/713538844582084691/Mundial_Ronaldinho_Soccer_64_Full_HD_Intro.mp4']
        });
        // waitwhen cmd
      } else if (command.startsWith("waitwhen") || command.startsWith("ww")) {
        message.channel.send({
          files: ['https://cdn.discordapp.com/attachments/710425704524677211/711129644992036884/tim.png']
        });
        // matt cmd
      } else if (command.startsWith("matt")) {
        message.channel.send({
          files: ['https://cdn.discordapp.com/attachments/669726484772159488/712182903966007296/IMG_9784.jpg']
        });
        // IL cmd
      } else if (command.startsWith("illinois")) {
        message.channel.send({
          files: ['https://media.discordapp.net/attachments/654785556215103488/692035239366885416/tempFileForShare_20200302-175024.png?width=546&height=679']
        });
        // catgirl cmd
      } else if (command.startsWith("catgirl")) {
        message.channel.send({
          files: ['https://img1.ak.crunchyroll.com/i/spire1/1b0597832b4aa93293041240680d6b471416589032_full.jpg']
        });
        // earring cmd
      } else if (command.startsWith("earring")) {
        message.channel.send({
          files: ['https://cdn.discordapp.com/attachments/669726484772159488/713652674826076190/2Q.png']
        });
        // gwagwa cmd
      } else if (command.startsWith("gwagwa")) {
        message.channel.send("GWAGWA", {
          files: ['https://cdn.discordapp.com/attachments/669726484772159488/713289328985505792/gwa_gwa-QPYcuA0b6gA.mp4']
        });
        // quote cmd
      } else if (command.startsWith("quote")) {
        if (!(message.channel.id === generalID || message.channel.id === '654784430409252904')) {
          // Update
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
            let rand = Math.floor(Math.random() * quotesOut.length);
            message.channel.send({
              files: [quotesOut[rand].attachments.first().url]
            });
          }
        } else {
          message.channel.send("That command cannot be used in this channel!");
        }
        // brownout cmd
      } else if (command.startsWith("brownout")) {
        if (message.channel.id === brownoutID) {
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
            let rand = Math.floor(Math.random() * brownoutOut.length);
            message.channel.send({
              files: [brownoutOut[rand].attachments.first().url]
            });
          }
        } else {
          message.channel.send("That command can only be used in <#697639057592811650>");
        }
        //soup cmd
      } else if (command.startsWith("soup")) {
        message.channel.send({
          files: ['https://i.kym-cdn.com/entries/icons/original/000/026/699/soup.jpg']
        });
        // help cmd
      } else if (command.startsWith("help")) {
        message.channel.send("Commands:\n```* `queen usercount` to see how many users are currently in the server\n* `queen buff[name]` for buff [name]\n* `queen hackathon` to get the done with hackathons picture\n* `queen gc` to get the Facebook group screenshot\n* `queen head` to get the Mater screenshot\n* `queen rat` to post this rat\n* `queen no anime` to get the no anime picture\n* `queen contribute` to get a like to the GitHub repo\n* `queen waitwhen` to get the when did I ask screenshot\n* `queen corn` to get a corn video`\n* `queen illinois` to get a map of Illinois\n* `queen catgirl` to see a catgirl\n* `queen gwagwa` to get the gwagwa video\n* `queen quote` to get a random image from #quotes\n* `queen brownout` to get a random attachment from #brownoutposting (only works in #brownoutposting)\n* `queen soup` to get soup\n* `queen 8ball [message]` to get an 8ball reply (only works in #spam)\n* `queen thirst` to get water messages\n* `queen lofi` to get a good lofi playlist\n* `queen ping` to get your ping\n* `queen brasil` to get the Ronaldinho Soccer 64 video\n* `queen earring` to see a nice earring```\nNOTE: `queen` can also be substituted with `q` for all of these commands");
        // 8ball cmd
      } else if (command.startsWith("8ball")) {
        if (message.channel.id === '654838387160907777') {
          var rand = Math.floor(Math.random() * responses.length);
          message.channel.send("Question: " + message.content.substring(12) + "\nAnswer: " + responses[rand]);
        } else {
          message.channel.send("That command can only be used in <#654838387160907777>");
        }
        // class cmd
      } else if (command.startsWith("class")) {
        message.channel.send("That command has been disabled. Use class bot instead.");
        // thirst cmd
      } else if (command.startsWith("thirst")) {
        var rand = Math.floor(Math.random() * reminders.length);
        message.channel.send(reminders[rand]);
        // lofi cmd
      } else if (command.startsWith("lofi")) {
        message.channel.send("https://open.spotify.com/playlist/1DcvziAZBZk1Ji1c65ePtk?si=Qtvu64zsQQurDtQa60tPBg");
        // ping cmd
      } else if (command.startsWith("ping")) {
        const channel = message.channel;
        var apiPing = Math.round(client.ws.ping);
        var messagePing = Date.now() - message.createdTimestamp;

        if (messagePing < 30)
          channel.send("Mad respect <@" + message.author.id + ">" + ' your message ping is crazy good at ' + messagePing + 'ms (API ping: ' + apiPing + 'ms)');
        else if (messagePing < 80)
          channel.send("Not bad <@" + message.author.id + ">" + ' your message ping is average at ' + messagePing + 'ms (API ping: ' + apiPing + 'ms)');
        else
          channel.send("My grandma has better internet <@" + message.author.id + ">" + ' you def need better wifi your message ping is ' + messagePing + 'ms (API ping: ' + apiPing + 'ms)');
      } else {
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
