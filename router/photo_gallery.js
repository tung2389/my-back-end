const express = require('express');
const multer = require('multer');
const photo = require('../model/photo.js');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// process.env.PWD = process.cwd();

// router.use(express.static(path.join(process.env.PWD,'public')));

// const storage = multer.diskStorage({
//     destination: function(req,res,cb) {
//         cb(null,path.join(process.env.PWD,'public/upload'));
//     }
// });

// const upload = multer({storage:storage});
const storage = multer.diskStorage({
    destination:'./public/upload/',
    filename: function(req,file,cb)
    {
        let extension =  file.originalname.split('.').pop();
        cb(null,file.fieldname + Date.now() + "." + extension);
    }
});

const upload = multer({storage:storage});

router.get('/',(req,res) => {
    res.send("This is the api of photo gallery");
});

router.use('/public',express.static('public'));

router.route('/all_data').post(upload.array('file'),(req,res) => {
    for(let i=0;i<req.files.length;i++)
    {
        const host = req.host;
        const filePath = req.protocol + "://" + host + '/photo_gallery/'  + req.files[i].path;
        let new_photo = new photo;
        new_photo.filePath = filePath;
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
router.get('/delete',(req,res) => {
    photo.deleteMany({},(err) => console.log(err));
})
module.exports = router;