const axios = require('axios');
const bitcoin = require('bitcoinjs-lib');
const {extractOrdinalData} = require('../../../utils/ordinalParser')

  const API_BASE_URL ='https://mempool.space/api';

  async function getBlockDataByHeight(blockHeight) {
    try{
      const blockHash = await getBlockHash(blockHeight);  
      const rawBlockdata = await getRawBlock(blockHash);
      return parseTransactions(rawBlockdata);
    }catch (err){
      console.error("Error trying to get the transactions from block", err);
      throw err;
    }
  }

  async function getBlockHash(blockHeight){
    try{
      console.log('Fetching the block hash for blockHeight: ', blockHeight);
      const url = `${API_BASE_URL}/block-height/${blockHeight}`;
      const response = await axios.get(url);
      return response.data;
    } catch(err){
      console.error("Error trying to get blockHash ", err);
      throw err;
    }
  }

  async function getRawBlock (blockHash){
    try{
      const url = `${API_BASE_URL}/block/${blockHash}/txs`;
      const response = await axios.get(url, {responseType: 'arraybuffer'});
      return response.data;
    } catch(err){
      console.error("Error trying to get Raw Block from Block Hash", err);
      throw err;
    }
  }   
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  function parseTransactions(rawBlockData) {
    try{
      const block = bitcoin.Block.fromBuffer(Buffer.from(rawBlockData, 'binary'));
      return block.transactions.map(tx => {
        const inputs = tx.ins.map(input => ({
          witness: input.witness.map(w => w.toString('hex'))
        }));
        
        const outputs = tx.outs.map(out => ({
          value: out.value,
          scriptPubKey: out.script.toString('hex')
        }));
        
        const metadata = extractOrdinalData(outputs);
        
        return {id: tx.getId(), inputs, outputs, metadata};
      });
    } catch(err){
      console.error("Error trying to parse transactions from block", err);
      throw err;
    }
  }
  
  module.exports = {getBlockDataByHeight, getBlockHash, getRawBlock, parseTransactions}
 