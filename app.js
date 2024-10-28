const config = require('./config')
const mongoose = require('mongoose')
const discord = require('discord.js')

// Connection à la base de données
mongoose.connect(config.database)
.catch(err =>
    {
        config.log('Erreur avec la base de données')
        console.log(err)
    }
)
console.log('Base de données OK !')

// Bot Discord
const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds] });

client.on('ready', () =>
{
    console.log('Bot discord OK !')
})

client.login(config.discordToken)