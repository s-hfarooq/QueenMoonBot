// Variables used throughout various files
const Discord = require("discord.js");

// Client
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// Responses for 8ball
const responses = [
  'It is certain.',
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
const reminders = [
  'A friendly reminder to stay hydrated.',
  'Quench your thirst.',
  'Did you drink enough water today?',
  'BEGONE',
  'stfu',
  'u thirsty hoe',
  'It is important to drink 8 glasses of water a day.',
  "goddammit i'm running out of creative ways to insult you people",
  { files: ['https://cdn.discordapp.com/attachments/669726484772159488/725548315479113778/iqggq6rypn651.png'] }
];

const hLinks = [
  'https://cdn.discordapp.com/attachments/669726484772159488/721440013895598178/Screen_Shot_2017-11-09_at_10.png',
  'https://cdn.discordapp.com/attachments/669726484772159488/721439726607007774/d77.png',
  'https://cdn.discordapp.com/attachments/654783232969277453/721440063770198076/e9e.png',
  'https://cdn.discordapp.com/attachments/654783232969277453/721440038403178496/b73.png',
  'https://cdn.discordapp.com/attachments/654783232969277453/721440006928990410/Screen_Shot_2020-04-28_at_12.png',
  'https://cdn.discordapp.com/attachments/654783232969277453/721439958442967060/2ad.png',
  'https://cdn.discordapp.com/attachments/714931864413929512/721844496614162561/FB_IMG_15904852374509040.jpg',
];

var quotesOut = [];
var brownoutOut = [];
var lastDeletedMessage = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setAuthor('No deleted messages yet');
var lastUpdate;
var generalLastCommandTime = 0;

module.exports = {
  quotesOut,
  brownoutOut,
  lastUpdate,
  generalLastCommandTime,
  lastDeletedMessage,
  CLIENT: client,
  RESPONSES: responses,
  REMINDERS: reminders,
  HLINKS: hLinks,
  GENERALTIMEGAP: 5,
  UPDATEINTERVAL: (1000 * 60 * 60 * 24),
  ESCID: '654783697043718164',
  ACADEMICGENERALID: '732035002963066960',
  QUARANTINEID: '714931864413929512',
  BROWNOUTID: '697639057592811650',
  COUNTINGGAMEID: '698313651186040923',
  LOGID: '695113129947824179',
  QUOTEID: '697329980044083220',
  MEMEID: '654784388197908500',
  WHOLESOMEID: '700590295493902347'
};
