const express = require('express');
const multer = require('multer');
const photo = require('../model/photo.js');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req,res,cb) {
        cb(null,'./public/upload/');
    }
});

const upload = multer({storage:storage});

router.get('/',(req,res) => {
    res.send("This is the api of photo gallery");
});

router.route('/img_data').post(upload.array('file'),(req,res) => {
    for(let i=0;i<req.files.length;i++)
    {
    let new_photo = new photo;
    new_photo.data = fs.readFileSync(req.files[i].path);
    new_photo.contentType = req.files[i].mimetype;
    new_photo.save();
    }
    res.send("New image added");
})
.get((req,res) => {
    photo.find({},(err,img) =>{
        if(err)
        throw err;
        res.contentType('json');
        res.send(img);
    });
});

module.exports = router;