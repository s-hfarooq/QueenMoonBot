# QueenMoonBot

A bot for the [UIUC 2024 Discord server](https://discord.gg/2pFv4Wq)

## Add it to your server
  - NOTE: some things won't work due to hard coded channel id's

  [Add it to your server by clicking here](https://discordapp.com/oauth2/authorize?&client_id=684867671552294994&scope=bot&permissions=8)

## Commands
* Makes sure the #counting_game channel is in check. If a user sends two messages in a row, it deletes the newest one. If a user sends a number that isn't the previous number + 1, it deletes the message and assigns the `Can't Count` role (assuming the newest message was sent > 1500ms after the previous one).
* `queen usercount` to see how many users are currently in the server
* `queen buff[name]` for buff [name]
*  `queen flip` to flip a coin
* `queen hackathon` to get the done with hackathons picture
* `queen gc` to get the Facebook group screenshot
* `queen head` to get the Mater screenshot
* `queen rat` to post this rat
* `queen noanime` to get the no anime picture
* `queen bean` to get a human bean
* `queen contribute` to get a like to the GitHub repo
* `queen waitwhen` or `queen ww` to get the when did I ask screenshot
* `queen brasil` to get the Ronaldinho Soccer 64 video
* `queen corn` to get a corn video
* `queen illinois` to get a map of Illinois
* `queen catgirl` to see a catgirl
* `queen sorry` to get the pogchamp video
* `queen hummus` because David wanted it
* `queen quote` to get a random image from #quotes
* `queen brownout` to get a random attachment from #brownoutposting (only works in #brownoutposting)
* `queen soup` to get soup
* `queen 8ball [message]` to get an 8ball reply (only works in #spam)
* `queen thirst` to get water messages
* `queen cock` to see a chicken
* `queen snipe` to get the last deleted message
* `queen horny` to get bonk pictures
* `queen sp @USER [amnt]` to mass ping a specific user where [amnt] is a number between 0 and 100 (must have ESC role to use this command)
* `queen owoify [message]` to turn your message into an owo (leave [message] blank to owoify the previous sent message)
* `queen spongebobify [message]` or `queen s [message]` to convert your message to spongebob mocking text (leave [message] blank to spongebobify the previous sent message)
* `queen os [message]` to first owoify then spongebobify your message (leave [message] blank to owoify and spongebobify the previous sent message)
* `queen rankdegen` to see how degen you are
* `queen tvd` to see a dancing cockroach
* ~~`queen class [SUBJECT-NUMBER]` to the name, credit hours, and recent avg. GPA of a UIUC course (NOTE: not case-sensitive)~~ now depreciated, use [class bot](https://github.com/timot3/uiuc-classes-bot) instead.

Note: For all commands, `queen` can be substituted with `q`


## To run the bot yourself
Make a file named `config.json` in the util folder. Head over to the [Discord Developer Portal](https://discordapp.com/developers/applications/me) and get a token for a new bot. Place that token in `config.json` in the following format:

```
{
  "token": "YOUR_TOKEN_HERE"
}
```

Then run the bot by running `node index.js` in a terminal. To run even after closing the terminal window (ie. on an AWS EC2 instance) use the command `forever start index.js`.

## Contribute
Make some contributions, it's open source. Just make a pull request, I'll probably accept it as long as there aren't any bugs. You'll probably only want to touch the switch statement in [util/commands.js](util/commands.js).
