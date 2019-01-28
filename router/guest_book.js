const express = require('express');
const bodyParser = require('body-parser');
const Signature = require('../model/Signature.js')
const cors = require('cors');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cors({origin:'https://tung2389.github.io'}));

router.get("/",(req,res) => {
    res.send("Hello. This is the api of the app");
});

router.get("/api/signature", (req,res) => {
    Signature.find({}).then(data => {
        res.json(data);
    })
});

router.post("/api/signature", (req,res) => {
    Signature.create({
        Guest_Signature: req.body.signature_of_guest,
        Message: req.body.message_of_guest,
        Time: req.body.Time
    }).then(signature => {
        res.json(signature);
    });
});

module.exports = router;