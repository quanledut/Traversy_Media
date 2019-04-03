const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const CustomerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    balance: {
        type: Number,
        default: 0
    }
})

CustomerSchema.plugin(timestamp);
// const Customer = mongoose.model('Customer', CustomerSchema);
mongoose.model('Customer', CustomerSchema);