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

const tipsArray = [
  { files: ['https://cdn.discordapp.com/attachments/697648147941294160/732469969949818890/q-tip-1518552383.jpg'] },
  'If you want consent, just send a polite DM! If they say no, chances are they are not being sarcastic. If they say yes, well that\'s not my business.',
  'Sexualizing people and harassing people can start #metoo 2 electric boogalo',
  'If they didn\'t say they were comfortable with being sexualized, sexualizing them is a Russian roulette with 5 bullets in a 6 bullet chamber!',
  'Pressuring people for personal information puts you one step closer to the FBI',
  'Personal information is sexy, but asking people for it is often not so sexy.',
  'I found out yesterday that personal information is personal and not public. Lesson: if you doxx people u end up like me, trapped inside a bot.',
  'piT: is a hole',
  'The best way to piss off a guy is to say that men are trash. The best way to piss off a woman is to only comment on her appearance and her competency. In fact, if you want to piss off everyone, insult them, doxx them, or make non-consensual jokes about them!',
  'Post-tip: Pissing people off in these ways has a high probability of you getting muted, kicked, or/and banned. If you are too afraid to say something, say it in #controversial!',
  'Excluding people from a conversation is a good way to ruin their day!',
  'Apparently, slurs will raise the pitchforks against you. The pitchforks aren\'t that bad, but the torches, they burn.',
  'Stereotyping isn\'t terribly useful. I certainly don\'t use it for my job, or at school.',
  'When people tell you to stop, get down on the floor, do 5 push ups, bop it, twist it, and pull it! Oh, then stop.',
  'When someone starts talking about something out of the blue, joining them in conversation is the best thing you can do!',
  'Sleep is pretty fucking useful.',
  'You can add suggestions for text in this bot through #server-suggestions',
  'flossing and brushing your teeth is one step closer to being a fucking god',
  '(noun)the pointed or rounded end or extremity of something slender or tapering',
  'Watch out for the ~~nazi mods~~!',
  'Please, for my all seeing eye’s sake, no role-playing in #general',
  'Common sense is common sense',
  'Villainizing people is a good start to being a pro villain. Just ask Hitler!',
  'Woah there bud, watch your language. I can’t read english.',
  'Corb should be legalized.',
  'Fun fact: You can have controversial and dramatic discussions without bigotry, racism, or even making fun of any demographic at all! *This post was funded by the server propaganda team.*',
  'Take nsfw topics to #quarantine for maximum explosions',
];

const embedColors = [
  'E84A27',
  '13294B',
  '5E6669',
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
  TIPSARR: tipsArray,
  EMBEDCOL: embedColors,
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
