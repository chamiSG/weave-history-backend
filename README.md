# Weave

1. Database configuration.

    Please config the db setting in /config/db.config.js

2. Node Package Install

    Please install the packages for project

    npm install

3. Sever Run

    Please start the node server
    
    node server.js

4. API Parameters:

    address: contract address,

    fromAddress: from_address in transaction table

    toAddress: to_address in transaction table  

    transactionHash: transactionHash

    limit: limit number for paging

    offset: offset number for paging

    example:

    http://localhost:8080/api/transactions?address=0x6CC97eF7D330C090681c3a6d266F6AdeDf80e56B&limit=10&offset=0

    You can get the JSON response as following.

    [

    {
        "id": 1,

        "address": "0x6CC97eF7D330C090681c3a6d266F6AdeDf80e56B",

        "type": 0, //contract or token...

        "transactionHash": "0xcae91903f9aa13492916605933719baf8671fb03aee1bdfdaf88c8075802b42b",

        "methodId": "0x4643bdd4",

        "fromAddress": "0x418f6103bce47cfad340feb1e9c1df405380fcee",

        "toAddress": "0x6cc97ef7d330c090681c3a6d266f6adedf80e56b",

        "value": 18731923,

        "userAddress": "0x5927b72440d8a8b8c6ca5a8be60e88975f9063fc",

        "blockTimestamp": "2022-06-16T06:54:55.000Z",

        "blockNumber": "18731923",

        "blockHash": "0x15affd080c010ee812fb121e0c1b633e5dcedd25b83ad05d85538319ef724732",

        "network": "bsc"

    },

    ...

    ]

