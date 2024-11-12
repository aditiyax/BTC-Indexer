const axios = require('axios');

const API_URL = 'https://mempool.space/api/tx/';

exports.fetchTransactionById = async (txId) => {
    try{
        const url = `${API_URL}${txId}`;
        const response = await axios.get(url);
        return response.data;
    } catch(err) {
        throw new Error('Failed to fetch transaction data: '+ err.message);
    }   
};