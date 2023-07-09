const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        requred: true
    },
    location: {
        type: String,
        requred: true
    },
    date: {
        type: Date,
        requred: true
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Post", postSchema)