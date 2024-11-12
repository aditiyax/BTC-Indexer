const txService = require('../services/txService');

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await txService.fetchTransactionById(req.params.txid);
    res.json(transaction);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
