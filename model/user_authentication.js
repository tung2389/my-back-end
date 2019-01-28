const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const user_schema = mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true,
        trim:true
    },
    username:{
        type: String,
        required: true,
        trim:true
    },
    password:{
        type: String,
        required:true,
    }
});

user_schema.pre('save',function(next){
    let user = this;
    console.log(user.password);
    bcrypt.hash(user.password,10,function(err,hash){
        if(err)
        {
            return next(err);
        }
        else
        {
            user.password = hash;
            next();
        }
    })
});

const user = mongoose.model('user',user_schema);
module.exports = user;