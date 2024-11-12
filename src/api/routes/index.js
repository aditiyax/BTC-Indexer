const express = require('express');
const blockRoutes = require('./blockRoutes');
const txRoutes = require('./txRoutes');

const router = express.Router();

router.use('/blocks', blockRoutes);
router.use('/transactions', txRoutes);

module.exports = router;