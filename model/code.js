const mongoose = require('mongoose')

const CodeSchema = new mongoose.Schema(
    {
        discord_id: Number,
        date: Number,
        code_validation: Number
    })

module.exports = mongoose.model('Code', CodeSchema)