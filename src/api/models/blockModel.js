    const mongoose = require('mongoose');

    const blockSchema = new mongoose.Schema({
        height: Number,
        hash: String,
        time: Number,
        main_chain: Boolean,
        n_tx: Number,
        transactions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'}]
    });

    module.exports = mongoose.model('Block',blockSchema);