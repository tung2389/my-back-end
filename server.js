const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const first = require("./router/first.js");
const guest_book = require("./router/guest_book.js");
const photo_gallery = require('./router/photo_gallery.js');
const app = express();

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(
    MONGO_URL,{ useNewUrlParser: true },
    err => {
        if (err) throw err;
        console.log("Successfully connected");
    }
);
app.use(cors());
app.use('/first_app',first);
app.use('/guest_book',guest_book);
app.use('/photo_gallery',photo_gallery);

app.get("/", (req,res) => {
    res.send("Hello world");
});

app.listen(process.env.PORT || 3001);