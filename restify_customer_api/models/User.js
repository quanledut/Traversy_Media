const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const userSchema  = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.plugin(timestamp);
mongoose.model('User', userSchema);