const config = require('./config')
const mongoose = require('mongoose')
const discord = require('discord.js')
const express = require('express')

// Connection à la base de données
mongoose.connect(config.database).catch(err => 
    {
        config.log('Erreur avec la base de données')
        console.log(err)
    })
console.log('Base de données OK !')

// API avec Express
const app = express()

app.listen(config.port, () =>
    {
        console.log('Serveur lancé sur le port %d', console.port)
    })

// Bot Discord
const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds] });

client.on('ready', () =>
    {
    console.log('Bot discord OK !')
    })

// Slash Command
client.application.commands.create(
    {
        name: 'ping',
        description: 'Pong !'
    })
    .then(console.log)
    .catch(console.error)

client.on('interactionCreate', async interaction => 
    {
        if (!interaction.isChatInputCommand())
        {
            console.log(interaction)
        }

        if (interaction.commandName === 'ping') 
        {
            await interaction.reply('Pong!')
        }
    })
client.login(config.discordToken)