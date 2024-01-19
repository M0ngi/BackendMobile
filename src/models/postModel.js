const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [25, 'Max length is 25.']
    },
    content: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('post', postSchema)
