// Variables used throughout various files
const Discord = require("discord.js");

// Client
const client = new Discord.Client({
  partials: ['MESSAGE']
});

// Responses for 8ball
const responses = ['It is certain.',
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
const reminders = ['A friendly reminder to stay hydrated.',
  'Quench your thirst.',
  'Did you drink enough water today?',
  'BEGONE',
  'stfu',
  'u thirsty hoe',
  'It is important to drink 8 glasses of water a day.',
  "goddammit i'm running out of creative ways to insult you people"
];

// Links for cock command
const cLinks = [
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
];

var quotesOut = [];
var brownoutOut = [];
var lastUpdate;
var generalLastCommandTime = 0;

module.exports = {
  quotesOut,
  brownoutOut,
  lastUpdate,
  generalLastCommandTime,
  CLIENT: client,
  RESPONSES: responses,
  REMINDERS: reminders,
  CLINKS: cLinks,
  GENERALTIMEGAP: 5,
  UPDATEINTERVAL: (1000 * 60 * 60 * 24),
  GENERALID: '669726484772159488',
  BROWNOUTID: '697639057592811650',
  COUNTINGGAMEID: '698313651186040923',
  QUOTEID: '697329980044083220',
};
