const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:'string',
        required:[true,'username is required']
    },
    email:{
        type:'string',
        required:[true,'email is required'],
        unique:[true,'email is already exist']
    },
    password:{
        type:'string',
        required:[true,'password is required']
    }
})

module.exports = mongoose.model('User',userSchema)