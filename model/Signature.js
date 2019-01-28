const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const Signature_Schema = new Schema(
    {
    Guest_Signature: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    Message: {
        type: mongoose.Schema.Types.Mixed,
        require: true
    },
    },
    {timestamps : true}
)

const Signature = mongoose.model('Signature',Signature_Schema);

module.exports = Signature;