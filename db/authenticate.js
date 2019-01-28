const user = require('../model/user_authentication');
const bcrypt = require('bcrypt');
function create_user(email,username,password,callback1,callback2)
{
    user.findOne({email:email},function(err,data){
        if(data !== null) //if user existed
        callback1();
        else //if ok
        {
        new_user(email,username,password);
        callback2();
        }
    });
}
function new_user(email,username,password)
{
        user.create({
            email:email,
            username:username,
            password:password
        })
}
function authenticate(email,password,callback){
    user.findOne({email:email})
        .exec(function(err,user){
            if(err)
            {
                return callback(err,"",0);
            }
            else if(!user)
            {
                return callback(0,"Cannot find user",0);
            }
            bcrypt.compare(password,user.password,function(err,result){
                if(result === true)
                {
                    return callback(0,"Login successfully",user);
                }
                else
                {
                    return callback(0,"Make sure your password is correct",0);
                }
            })
        })
}

module.exports = {create_user,authenticate};