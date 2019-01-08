const express = require('express');
const photo = require('../model/photo.js');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/',(req,res) => {
    res.send("This is the api of photo gallery");
});

router.route('/all_data').post((req,res) => {
    let files = req.body.files;
    for(let i=0;i<files.length;i++)
    {
        let file = files[i];
        photo.create({
            filePath:file
        });
    }
    res.json(files);
})
.get((req,res) => {
    photo.find({},(err,img) =>{
        if(err)
        throw err;
        res.json(img);
    });
});
module.exports = router;