const { getTokenTransferHistory } = require('./apis');
const { config } = require('./config');
const axios = require("axios");

const poll_func = async () => {
  let i = 0;

  const options = {
    headers: {"accept": "application/json", "X-API-Key":`${process.env.MORALIS_API_KEY}`}
  }

  const polling = async () => {
    i = i + 1;
    console.log(i);

    let prevBlockNumberResult, curBlockNumberResult, curBlockNumber, prevBlockNumber, res;

    curBlockNumberResult = await axios.get(`https://deep-index.moralis.io/api/v2/dateToBlock?chain=bsc&date=1655696182450`, options);
    curBlockNumber = curBlockNumberResult.data.block;

    try {
      prevBlockNumberResult = await axios.get(`${process.env.HOST}/api/blocknumber/1`);
      prevBlockNumber = prevBlockNumberResult.data.blocknumber;
      res = await axios({
        method: 'put',
        url: `${process.env.HOST}/api/blocknumber/1`,
        data: {
          "id": 1,
          "blocknumber": curBlockNumber
        }
      });
    } catch {
      prevBlockNumber = 0;
      res = await axios({
        method: 'post',
        url: `${process.env.HOST}/api/blocknumber/`,
        data: {
          "blocknumber": curBlockNumber
        }
      });
    }

    for (let j = 0; j < config['tokens'].length; j++) {
      getTokenTransferHistory(config['tokens'][j], 0, prevBlockNumber, curBlockNumber);
    }
    // for (let j = 0; j < config['contracts'].length; j++) {
    //   getTokenTransferHistory(config['contracts'][j], 1, prevBlockNumber, curBlockNumber);
    // }
  }

  const recursive_run = () => {
    polling()
      .then(() => {
        setTimeout(recursive_run, 30000);
      })
      .catch(err => {
        setTimeout(recursive_run, 30000);
      });
  }

  recursive_run();
}

module.exports.poll_func = poll_func;