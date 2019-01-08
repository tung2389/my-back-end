const express = require('express');
const photo = require('../model/photo.js');
const bodyParser = require('body-parser');
const router = express.Router();
const Dropbox = require('dropbox');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const fetch = require('isomorphic-fetch');

process.env.PWD = process.cwd();

router.use(express.static(path.join(process.env.PWD,'public')));

const storage = multer.diskStorage({
    destination: function(req,res,cb) {
        cb(null,path.join(process.env.PWD,'public/upload'));
    }
});

// router.use(express.static('public'));
// const storage = multer.diskStorage({
//     destination: function(req,res,cb)
//     {
//         cb(null,'public/upload/');
//     }
// })
const upload = multer({storage:storage});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/',(req,res) => {
    res.send("This is the api of photo gallery");
});

router.route('/all_data').post(upload.array('files'),async(req,res) => {
    let dbx = new Dropbox.Dropbox({ accessToken: process.env.DROP_BOX_TOKEN });
    let files = req.files;
    let arr = [];

    for(let i=0;i<files.length;i++)
    {
    let file = files[i];

    //If you don't convert it to buffer, it won't work
    let file_data = fs.readFileSync(file.path);
    let path = '/' + Date.now() + file.originalname ;

    // File is smaller than 150 Mb - use filesUpload API
    // If you don't use await, the sharingCreateSharedLink will throw an error
    await dbx.filesUpload({path: path, contents: file_data})
      .catch(function(error) {
        console.error(error);
      });

      await dbx.sharingCreateSharedLink({path: path})
      .then(function(response) {
        let url = response.url;
        let url2 = url.split('?');
        let real_url = url2[0] + '?raw=1';
        arr.push(real_url);
      })
      .catch(function(error) {
        console.log(error);
      })
    }
    for(let i=0;i<arr.length;i++)
    {
        photo.create({
            filePath: arr[i]
        })
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