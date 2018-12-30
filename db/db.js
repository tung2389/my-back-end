const mongoose =  require('mongoose');
const dataModel = require("../model/data.js");

async function fetchData(query) {
    let words = {};
    console.log("Fetching...");
    return dataModel
        .find({})
        .then(doc => {
            words = doc;
            console.log("Fetch successfully from Database");
            return words;
        })
        .catch(err => {
            throw err;
        });
}

function addData(data) {
    let sample = new dataModel(data);
    console.log("Adding data");
    sample.save(err => {
        if (err) throw err;
    });
}

function delData(data) {
    dataModel.find(data).remove(err => {
        if (err) throw err;
    });
}

module.exports = {fetchData:fetchData , addData:addData, delData:delData}
