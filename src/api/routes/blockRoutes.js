const express = require('express');
const router = express.Router();
const { getBlockDetails } = require('../controllers/blockController');

// console.log(getBlockDetails);

router.get('/:blockHeight', getBlockDetails);  

module.exports = router;                
