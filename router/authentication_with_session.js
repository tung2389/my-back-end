const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const router = express.Router();
const sth = require('../db/authenticate');
const user = require('../model/user_authentication');
const cors = require('cors');
const authenticate = sth.authenticate;
const create_user = sth.create_user;

router.use(cors({credentials:true,origin:'https://tung2389.github.io/authentication_with_session'}));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(session({
    secret: "something that you want",
    resave:true,
    saveUninitialized:false,
    store: new MongoStore({mongooseConnection:mongoose.connection})
}));

router.get('/',(req,res) => {
    res.send('Hello. This is a new app');
});


router.post('/login',(req,res,next) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email);
    console.log(password);
    authenticate(email,password,function(err,status,user){
        if(err)
        {
            next(error);
        }
        else
        {
            if(status !== "Login successfully")
            {
                res.send(status);
            }
            else
            {
                req.session.user_id = user._id;
                console.log(req.session.user_id);
                res.send('Logged in successfully');
            }
        }
    })
});

router.post('/sign_up',(req,res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    create_user(email,username,password,function(){
        res.send("The account already exist");
    },
    function(){
        res.send("The account has been created successfully");
    });
});

router.get('/profile',(req,res,next) => {
    console.log(req.session.user_id);
    user.findById(req.session.user_id)
        .exec(function(err,user){
            if(err)
            {
                next(err);
            }
            else
            {
                if(user === null)
                {
                    res.send("You haven't logged in yet");
                }
                else
                {
                    res.json(user);
                }
            }
        })
});

router.get('/logout',(req,res) => {
    if(req.session)
    {
        req.session.destroy(function(err){
            if(err)
            return next(err);
            else
            res.send("Logged out successfully");
        });
    }
    else
    {
        res.send("You haven't logged in yet");
    }
});
router.get('/all_data',(req,res) => {
    user.find({}).then(data => {
        res.json(data);
    })
});

router.get('/delete',(req,res) => {
    user.deleteMany({},(err) => {console.log(err);res.send('deleted')});
})

module.exports = router;