const config = require('./config/config')
const mongoose = require('mongoose')
const discord = require('discord.js')
const express = require('express')
const code = require('./model/code')

// Connection à la base de données
mongoose.connect(config.database).catch(err => 
    {
        config.log('Erreur avec la base de données')
        console.log(err)
    })
console.log('Base de données OK !')

// Bot Discord
const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds, discord.GatewayIntentBits.GuildIntegrations] });

client.on('ready', () =>
    {
    console.log('Bot discord OK !')
    // Register slash commands
    client.application.commands.create(
        {
            name: 'link',
            description: 'Permert de créer un code de liaison.'
        })
        .then()
        .catch(console.error)
    })

// Slash Commands
client.on('interactionCreate', async interaction => 
    {
        if (!interaction.isChatInputCommand())
        {
            return
        }

        if (interaction.commandName === 'link') 
        {
            var code_validation = Math.floor(Math.random() * 10 ** 8)
            code.find({code_validation: code_validation}).exec().catch(console.error).then(elements => 
                {
                    for (let element of elements)
                    {
                        console.log(element)
                    }
                })

            await interaction.reply({ content: 'Votre code de liaison est : ' + code_validation, ephemeral: true })
        }
    })
client.login(config.discordToken)

// API avec Express
const app = express()

app.listen(config.port, () =>
    {
        console.log('Serveur lancé sur le port %d', config.port)
    })

app.get('/', (request, responce) => 
    {
        responce.send('Test OK !')
    })