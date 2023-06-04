const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        minLength: 6,
        maxlenght: 40,
    },
    email:{
        type: String, 
        required: true
    },

    password: {
        type: String, 
        required: true
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], default: 'user'
     },
    isActive:{
        type:Boolean,
        default:false
    },
    joinedAt: {
        type: Date,
        default: new Date().toISOString()
    },
})

const User = mongoose.model('User', userSchema);

module.exports = User;