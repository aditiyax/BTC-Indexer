const mongoose = require('mongoose');

const txSchema = new mongoose.Schema({
    txid: String,
    inputs:[{ witness: [String] }],
    outputs: [{
        value: Number,
        scriptPubKey: String,
        metadata: String
    }],

    ordinalMetadata: {
        type: String,
        default: null
    }
});

const Transaction = mongoose.model('Transaction', txSchema)
module.exports = Transaction;