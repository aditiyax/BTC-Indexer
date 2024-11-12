const express = require('express');
const router = express.Router();
const {getTransactionById} = require('../controllers/txController')

// router.get("/:txid", (req,res) => {
//     res.send('Transaction ID recieved  :'+ req.params.txid);
// }); 

router.get('/:txid', getTransactionById);

module.exports = router;
