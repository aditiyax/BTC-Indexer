const { getBlockDataByHeight} = require('../services/blockService');
const bitcoin = require('bitcoinjs-lib');   

// async function getBlockByHeight(req, res) {
//     const blockHeight = req.params.blockHeight;
//     if (!blockHeight) {
//         return res.status(400).send("Block height parameter is missing");
//     }
//     console.log("Block height received:", blockHeight);

//     try {
//         const rawBlockData = await blockService.getBlockDataByHeight(blockHeight);
//         const blockBuffer = Buffer.from(rawBlockData, 'binary');
//         const parsedBlock = bitcoin.Block.fromBuffer(blockBuffer);

//         // Prepare a response object
//         const transactions = parsedBlock.transactions.map(tx => {
//             return {
//                 id: tx.getId(), // Assuming getId() returns a string
//                 hash: tx.hash ? tx.hash.toString('hex') : null, // Convert Buffer to string if available
//                 inputs: tx.ins.map(input => ({
//                     hash: input.hash ? input.hash.toString('hex') : null, // Check if input.hash is not undefined
//                     script: input.script ? input.script.toString('hex') : null
//                 })),
//                 outputs: tx.outs.map(output => ({
//                     value: output.value ? output.value.toString() : null, // Check if output.value is not undefined
//                     script: output.script ? output.script.toString('hex') : null
//                 }))
//             };
//         });

//         // Convert and send JSON response using a replacer function for BigInt
//         res.setHeader('Content-Type', 'application/json');
//         res.send(JSON.stringify({ blockHeight, transactions }, (key, value) =>
//             typeof value === 'bigint' ? value.toString() : value // Convert BigInt to string
//         ));
//     } catch (error) {
//         console.error("Error fetching block data:", error);
//         res.status(500).send('Internal Server Error');
//     }
// }

async function getBlockDetails(req, res) {
  try{
    const blockHeight = req.params.blockHeight;
    const blockDetails = await getBlockDataByHeight(blockHeight);

    const jsonData = JSON.stringify(blockDetails, (key, value) => 
    typeof value === 'bigint' ? value.toString() : value);
    res.setHeader('Content-Type', 'application/json');
    res.json(jsonData);
  } catch(err) {
    console.error("Error in block controller: ",err );
    res.status(500).send('Internal server Error');
  }
}

module.exports = { getBlockDetails };
