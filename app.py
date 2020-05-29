import discord
from discord.ext import commands
import re
import random


bot = commands.Bot(command_prefix=('Queen ', 'queen ', 'q ', 'Q '), case_insensitive=True, help_command=None)


# What to do when bot is online
@bot.event
async def on_ready():
    # Log events to console.
    print('Bot online.')
    print("Name: {}".format(bot.user.name))
    print("ID: {}".format(bot.user.id))
    # Set status
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name='Queen help'))


@bot.event
async def on_message(message):
    await bot.process_commands(message)


# Todo
@bot.command(name='help', aliases=['info'])
async def info(ctx):
    embed = discord.Embed(title='Help')
    await ctx.send(embed=embed)


# Usercount
@bot.command(pass_context=True)
async def report(ctx):
    await ctx.send("`{0.name} has this amount of members: {0.member_count}`".format(ctx.message.server))

# Buff
# Todo


# hackathon
@bot.command(name='hackathon')
async def await_hackathon(ctx):
    await ctx.send(file=discord.File('https://cdn.discordapp.com/attachments/654784388197908500/675113678856781834/Screenshot_20200102-213727_Discord.png'))


# 8ball
@bot.command(name='8ball')
async def await_8ball(ctx, arg):
    responses = ['It is certain.',
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
                 'Very doubtful']

    await ctx.send(f'Question: {arg}\nAnswer: {random.choice(responses)}')


# head
@bot.command(name='head')
async def await_head(ctx):
    await ctx.send(file=discord.File('https://cdn.discordapp.com/attachments/669726484772159488/708103493918916709/unknown.png'))


# rat
@bot.command(name='rat')
async def await_rat(ctx):
    await ctx.send(file=discord.File('https://cdn.discordapp.com/attachments/697639057592811650/713237658020872192/image0.jpg'))


# no anime
@bot.command(name='no anime')
async def await_anime(ctx):
    await ctx.send(file=discord.File('https://cdn.discordapp.com/attachments/697639057592811650/708536846531035226/image0.jpg'))


# contribute
@bot.command(name='contribute')
async def await_contribute(ctx):
    await ctx.send('Contribute to the bot here: https://github.com/s-hfarooq/QueenMoonBot')


# waitwhen
@bot.command(name='waitwhen', alias=['ww'])
async def await_ww(ctx):
    await ctx.send(file=discord.File('https://cdn.discordapp.com/attachments/710425704524677211/711129644992036884/tim.png'))


# brasil
@bot.command(name='brasil')
async def await_brasil(ctx):
    await ctx.send(file=discord.File('https://cdn.discordapp.com/attachments/654838387160907777/713538844582084691/Mundial_Ronaldinho_Soccer_64_Full_HD_Intro.mp4'))


# corn
@bot.command(name='corn')
async def await_corn(ctx):
    await ctx.send(file=discord.File('https://cdn.discordapp.com/attachments/697639057592811650/712531761774461008/Corn_is_the_best_crop__wheat_is_worst.mp4'))


# illinois
@bot.command(name='illinois')
async def await_il(ctx):
    await ctx.send(file=discord.File('https://media.discordapp.net/attachments/654785556215103488/692035239366885416/tempFileForShare_20200302-175024.png?width=546&height=679'))


# catgirl
@bot.command(name='catgirl')
async def await_catgirl(ctx):
    await ctx.send(file=discord.File('https://img1.ak.crunchyroll.com/i/spire1/1b0597832b4aa93293041240680d6b471416589032_full.jpg'))


# gwagwa
@bot.command(name='gwagwa')
async def await_gwagwa(ctx):
    await ctx.send(file=discord.File('https://cdn.discordapp.com/attachments/669726484772159488/713289328985505792/gwa_gwa-QPYcuA0b6gA.mp4'))


# Todo
# quote
# brownout

# soup
@bot.command(name='soup')
async def await_soup(ctx):
    await ctx.send(file=discord.File('https://i.kym-cdn.com/entries/icons/original/000/026/699/soup.jpg'))


# gc
@bot.command(name='gc')
async def await_corn(ctx):
    await ctx.send(file=discord.File('https://cdn.discordapp.com/attachments/669726484772159488/701247357001400370/unknown.png'))


# thirst
@bot.command(name='thirst')
async def await_thirst(ctx):
    reminders = ['A friendly reminder to stay hydrated.',
                 'Quench your thirst.',
                 'Did you drink enough water today?',
                 'BEGONE',
                 'stfu',
                 'u thirsty hoe',
                 'It is important to drink 8 glasses of water a day.',
                 'goddammit i\'m running out of creative ways to insult you people']
    await ctx.send(random.choice(reminders))


# lofi
@bot.command(name='lofi')
async def await_ping(ctx):
    await ctx.send('https://open.spotify.com/playlist/1DcvziAZBZk1Ji1c65ePtk')


# ping
@bot.command(name='ping')
async def await_ping(ctx):
    await ctx.send(f'My ping is {bot.latency}!')


# earring
@bot.command(name='earring')
async def await_ping(ctx):
    await ctx.send('https://cdn.discordapp.com/attachments/669726484772159488/713652674826076190/2Q.png')

bot.run('TOKEN')