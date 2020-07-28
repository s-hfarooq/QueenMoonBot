# Alma Botter

A bot for the [UIUC 2024 Discord server](https://discord.gg/2pFv4Wq)

## Commands
* `otter rules` to send the server rules
* `otter respect` to send a link to the respect document
* `otter usercount` to see how many users are currently in the server
* `otter buff[name]` for buff [name]
* `otter flip` to flip a coin
* `otter tip` to get a tip
* `otter hackathon` to get the done with hackathons picture
* `otter gc` to get the Facebook group screenshot
* `otter rat` to post this rat
* `otter noanime` to get the no anime picture
* `otter contribute` to get a like to the GitHub repo
* `otter waitwhen` or `otter ww` to get the when did I ask screenshot
* `otter corn` to get a corn video
* `otter illinois` to get a map of Illinois
* `otter quote` to get a random image from #quotes
* `otter brownout` to get a random attachment from #brownoutposting (only works in #brownoutposting)
* `otter soup` to get soup
* `otter 8ball [message]` to get an 8ball reply (only works in #spam)
* `otter thirst` to get water messages
* `otter snipe` to get the last deleted message
* `otter horny` to get bonk pictures
* `otter sp @USER [amnt]` to mass ping a specific user where [amnt] is a number between 0 and 100 (must have ESC role to use this command)
* `otter owoify [message]` to turn your message into an owo (leave [message] blank to owoify the previous sent message)
* `otter spongebobify [message]` or `otter s [message]` to convert your message to spongebob mocking text (leave [message] blank to spongebobify the previous sent message)
* `otter os [message]` to first owoify then spongebobify your message (leave [message] blank to owoify and spongebobify the previous sent message)
* `otter rankdegen` to see how degen you are
* `otter tvd` to see a dancing cockroach
* `otter cat [length]` to create a long cat

Note: For all commands, `otter` can be substituted with `o`

## Other functionality
* Makes sure the #counting_game channel is in check. If a user sends two messages in a row, it deletes the newest one. If a user sends a number that isn't the previous number + 1, it deletes the message and assigns the `Can't Count` role (assuming the newest message was sent > 1500ms after the previous one).
* Logs deleted messages, images, and other attachments in #mod_log. Also logs edited messages.
* Adds/removes pronoun roles based on reactions in #set_roles_here

## To run the bot yourself
Make a file named `config.json` in the util folder. Head over to the [Discord Developer Portal](https://discordapp.com/developers/applications/me) and get a token for a new bot. Place that token in `config.json` in the following format:

```
{
  "token": "YOUR_TOKEN_HERE"
}
```

Then run the bot by running `node index.js`. To run even after closing the terminal window (ie. on an AWS EC2 instance) use the command `forever start index.js`.

## Add it to your server
  [Add it to your server by clicking here](https://discordapp.com/oauth2/authorize?&client_id=684867671552294994&scope=bot&permissions=8)

\- Note that some things won't work due to hard coded channel id's

## Contribute
Make some contributions, it's open source. Just make a pull request, I'll probably accept it as long as there aren't any bugs. You'll probably only want to touch the switch statement in [util/commands.js](util/commands.js).
