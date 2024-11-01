const config = require('./config/config')
const mongoose = require('mongoose')
const discord = require('discord.js')
const express = require('express')
const code = require('./model/code')

// Connection à la base de données
mongoose.connect(config.database).catch(err => 
    {
        console.log('Erreur avec la base de données')
        console.log(err)
    })

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
            var date = Date.now()
            var code_validation = 0
            var code_unique = false
            while(!code_unique)
            {
                code_validation = Math.floor(Math.random() * 10 ** 8)
                code_unique = true

                code.find({code_validation: code_validation}).exec().catch(console.error).then(elements => 
                    {
                        for (let element of elements)
                        {
                            code_unique = false
                            if (date - element.date >= 1000 * 60 * 30) // 30 Minutes
                            {
                                code.deleteOne(element).exec()
                                console.log("%s supprimé de la base de donnée.", element)
                            }
                        }
                    })
            }


            console.log('Nouveau code de validation pour %s : %d', interaction.user.globalName, code_validation)
            
            const nouveau_code = new code({ discord_id: interaction.user, date: date, code_validation: code_validation })
            await nouveau_code.save()

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
        console.log("Request : %s", request.query)
        code_validation = parseInt(request.query.code)
        code.findOne({ code_validation: code_validation }).catch(console.error).then((docs) => 
            {
                responce.send(docs)
                console.log(docs)
            })
    })
