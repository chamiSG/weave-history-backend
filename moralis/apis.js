const ethers = require("ethers");
const axios = require("axios");
const moment = require("moment");
const dotenv = require("dotenv");

dotenv.config();

// const config 
// = {
//   single: {
//     weaveAddress: "0x6CC97eF7D330C090681c3a6d266F6AdeDf80e56B",
//     stakingContractAddressv2: "0x717E2896aaCb2573EAfE47Ef15c772163C5a441C",
//     // abi: StakingABIv2,
//     // tokenAbi: WEAVETOKENABI
//   },
//   lp: {
//     weaveAddress: "0x5661802b528e3B63FF8C5600Dd7B568530c44f3A",
//     stakingContractAddressv2: "0xc5cFc9A86dCa3683a6a0b142DE3eF4318Af373CA",
//     // abi: LPStakingABIv2,
//     // tokenAbi: LPTOKENABI,
//   },
//   fee: {
//     address: "0x10Bc1Fe8378554856fd020851308bAba1eCb5723",
//     // abi: FeeDistributorABI,
//   },
// };

const getTokenTransferHistory = async (address, type, prevBlockNumber, curBlockNumber) => {

  const limit = 100;
  const options = {
    headers: {"accept": "application/json", "X-API-Key":`${process.env.MORALIS_API_KEY}`}
  }

  //get the token transfer history for user acocunt
  if (prevBlockNumber == 0){
    result = await axios.get(`https://deep-index.moralis.io/api/v2/erc20/${address}/transfers?chain=${process.env.CHAIN_ID}&limit=${limit}`, options);
  } else {
    result = await axios.get(`https://deep-index.moralis.io/api/v2/erc20/${address}/transfers?chain=${process.env.CHAIN_ID}&from_block=${prevBlockNumber}&to_block=${curBlockNumber}&limit=${limit}`, options);
  }

  for (let i = 0; i < result.data.result.length; i++) {
    res = await axios({
      method: 'post',
      url: `${process.env.HOST}/api/transactions/`,
      data: {
        'address': address,
        'type': type,
        'transactionHash': result.data.result[i].transaction_hash,
        'fromAddress': result.data.result[i].from_address,
        'toAddress': result.data.result[i].to_address,
        'value': result.data.result[i].block_number,
        'userAddress': result.data.result[i].address,
        'blockTimestamp': moment(result.data.result[i].block_timestamp).fromNow(),
        'blockNumber': result.data.result[i].block_number,
        'blockHash': result.data.result[i].block_hash,
      }
    });
  }
};


module.exports.getTokenTransferHistory = getTokenTransferHistory;