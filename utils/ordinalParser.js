 function extractOrdinalData(outputs) {
      try{
          const extractedOrdData = outputs.filter(out => out.scriptPubKey. startsWith('6a')) // OP-RETURN = 6a
          .map(out => {
              const dataHex = out.scriptPubKey.substring(2);
              const dataBuffer = Buffer.from(dataHex, 'hex');
              return {metadata: dataBuffer.toString()};
            });
            return extractedOrdData;
        } catch(err){
            console.error("Error while Extracting the Ordinal's Data", err);
            throw err;
        }
 }

 module.exports = {
    extractOrdinalData
 };