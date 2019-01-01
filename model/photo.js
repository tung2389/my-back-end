const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const photo_schema = new Schema(
    {
            data: Buffer,
            contentType: String
    },
    {timestamps: true}
);

const photo = mongoose.model('photo',photo_schema);

module.exports = photo;