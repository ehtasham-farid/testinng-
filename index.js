// // const {
// //     Connection,
// //     PublicKey,
// //     Keypair,
// //     Token, TokenInfo
// // } = require("@solana/web3.js");
// // const web3 = require('@solana/web3.js');

// // const splToken = require('@solana/spl-token');
// // const { Metaplex } = require('@metaplex-foundation/js');
// // const { TokenListProvider, ENV } = require('@solana/spl-token-registry');

// // const bs58 = require("bs58");
// // require("dotenv").config();

// // //const {trackingInit,trackingSOL} = require("./scan.js")

// // const {getPoolData} = require("./poolinfo.js")

// // const RAYDIUM_PUBLIC_KEY = ('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8');
// // const raydium = new PublicKey(RAYDIUM_PUBLIC_KEY);
// // const connection = new Connection('https://ultra-delicate-lambo.solana-mainnet.quiknode.pro/9e6a18285b47f9974b7cac73e999be568cfe9929/',{
// //     wsEndpoint: 'wss://ultra-delicate-lambo.solana-mainnet.quiknode.pro/9e6a18285b47f9974b7cac73e999be568cfe9929/'

// // });
// // // const connection = new Connection('https://api.mainnet-beta.solana.com',{
// // //     wsEndpoint: 'wss://api.mainnet-beta.solana.com'

// // // });

// // let processedSignatures = new Set();

// // async function main(connection, raydium, payerString) {
// //     console.log('Monitoring logs...', raydium.toString());
// //     connection.onLogs(raydium, async ({logs, err, signature}) => {
// //         if (err) {
// //             return;
// //         }
// //         if (logs && logs.some(log => log.includes('initialize2') && !processedSignatures.has(signature))) {
// //             processedSignatures.add(signature);
// //             console.log('Signature for Initialize2:', signature);
// //             resp = await fetchRaydiumAccounts(signature, connection, payerString);
// //             if (resp !== false) { // Assuming fetchRaydiumAccounts correctly returns false or a value
// //                 let poolKeys = await getPoolData(resp, payerString); // Assuming this function exists and works as intended
// //                 // await trackingInit(); // Uncomment if needed and implemented
// //                 console.log(poolKeys);
// //                // trackingSOL(poolKeys); // Make sure timer is managed appropriately
// //             } else {
// //                 console.log('No pool address found or other issue.');
// //             }
// //         }
// //     }, "finalized");
// // }

// // async function fetchRaydiumAccounts(signature, connection, payerString) {
// //     // const txId = "47WuVXmQZKLQC8xRL316HRAsMKGhcSNiEeytsu4PGvw2KusSWvVpsFJqCKVHxnGiyUh3DMVZbKvQo1HmKYKaFC1u";
// //     const txId = signature;
// //     const tx = await connection.getParsedTransaction(txId, {
// //         commitment: "confirmed",
// //         maxSupportedTransactionVersion: 0
// //     });
// //     if (!tx) {
// //         console.log('Transaction not found');
// //         return false;
// //     }
// //     console.log(tx);
// //     const accounts = tx.transaction.message.instructions.find(ix => ix.programId.toBase58() === RAYDIUM_PUBLIC_KEY)?.accounts;
// //     if (!accounts) {
// //         console.log('No accounts found');
// //         return false;
// //     }
// //     const tokenAIndex=8;
// //     const tokenBIndex=9;

// //     const tokenAAccount = accounts[tokenAIndex];
// //     const tokenBAccount = accounts[tokenBIndex];
// //     const poolAddress = accounts[4];
// //     const displayData=[
// //         {Token:'Token A',account:tokenAAccount},
// //         {Token:'Token B',account:tokenBAccount},
// //     ];

// //     const currentTime = new Date().toLocaleString(); // Get current time
// //     console.log("New Raydium Liquidity Pool Created Found at", currentTime);
    
// //     let initPcAmount, initCoinAmount;
// //     for (let log of tx.meta.logMessages) {
// //         if (log.includes('initialize2') && log.includes('init_pc_amount') && log.includes('init_coin_amount')) {
// //             const match = log.match(/initialize2: InitializeInstruction2 { nonce: \d+, open_time: \d+, init_pc_amount: (\d+), init_coin_amount: (\d+) }/);
// //             if (match) {
// //                 initPcAmount = match[1];
// //                 initCoinAmount = match[2];
// //                 console.log(`Initial liquidity added: PC Amount - ${initPcAmount}, Coin Amount - ${initCoinAmount}`);
// //                 break;
// //             }
// //         }
// //     }



// //     const tokenAMetadata = await getTokenMetadata(new PublicKey(tokenAAccount), connection);
// //     const tokenBMetadata = await getTokenMetadata(new PublicKey(tokenBAccount), connection);
// //     console.log(tokenAMetadata);    

 
  
    
// //   //  const tokenAMetadata = await fetchTokenMetadata(tokenAAccount.PublicKey, connection);
// //  //   const tokenBMetadata = await fetchTokenMetadata(tokenBAccount, connection);

// //     // Display token metadata
  
// //     console.log("New Raydium  Liquidity Pool Created Found");
// //     console.log(generateExplorerUrl(txId));
// //     console.table(displayData);
// //     if (accounts[17].toBase58() == payerString.toBase58()){
// //         // console.log(accountKey.pubkey);
// //         return accounts[4]; // Assuming this is correct; adjust as needed
// //     }
    

// //     // for (let accountKey of tx.transaction.message.accountKeys) {
// //     //     if (accountKey.signer && accountKey.pubkey === payerString) {
// //     //         console.log(accountKey.pubkey);
// //     //         return accounts[4]; // Assuming this is correct; adjust as needed
// //     //     }
// //     // }
    
// //     return false ;
// // }

// // function generateExplorerUrl(txId){
// //     return `https://solscan.io/tx/${txId}?cluster=mainnet`;
// // }

// // function sleep(ms) {
// //     return new Promise(resolve => setTimeout(resolve, ms));
// // }


// // // main(connection,raydium).catch(console.error);
// // async function runProgram(payerString) {
// //     try {
        
// //         await main(connection, raydium, payerString);
// //     } catch (error) {
// //         console.error(`Error occurred: ${error}`);
// //         console.log('Attempting to restart the program...');
// //         setTimeout(() => runProgram(payerString), 1000); // Wait a bit before retrying
// //     }
// // }

// // // module.exports = { runProgram };
// // const payer = Keypair.fromSecretKey(bs58.decode(process.env.PAYER_SECRET_KEY));
// // console.log(payer.publicKey);
// // runProgram(payer.publicKey);
// // // from heere my fucntion

// // async function fetchTokenMetadata(tokenPublicKey, connection) {
// //     const accountInfo = await connection.getAccountInfo(tokenPublicKey);
// //     if (!accountInfo) {
// //         console.log('Token account not found');
// //         return;
// //     }
// //     const parsedData = accountInfo.data.parsed;
// //     if (!parsedData) {
// //         console.log('Parsed token data not found');
// //         return;
// //     }
// //     const tokenInfo = new TokenInfo(parsedData);
// //     return {
// //         name: tokenInfo.name,
// //         symbol: tokenInfo.symbol,
// //         decimals: tokenInfo.decimals
// //     };
// // }


// // // fetchRaydiumAccounts("", connection, payer.publicKey);

// // // async function testfunc(resp, payerString) {
// // // let poolKeys = await getPoolData(resp, payerString); // Assuming this function exists and works as intended
// // // // await trackingInit(); // Uncomment if needed and implemented
// // // console.log(poolKeys);
// // // // const timer = setInterval(() => trackingSOL(poolKeys), 2000); // Make sure timer is managed appropriately
// // // };
// // // pool = new PublicKey("Dk4d7A3BEAr92QJT1r2B1XbWodHqvVfHrU7v2DTQTsgK");
// // // testfunc(pool, payer.publicKey);

// // // ... your existing code to connect to Solana and extract token account public keys
// // async function getTokenMetadata(mintAddress, connection) {
// //     const metaplex = Metaplex.make(connection);
// //     const metadataAccount = metaplex.nfts().pdas().metadata({ mint: mintAddress });
// //     const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

// //     if (metadataAccountInfo) {
// //         const token = await metaplex.nfts().findByMint({ mintAddress });
// //         return {
// //             name: token.name,
// //             symbol: token.symbol,
// //             logo: token.json?.image
// //         };
// //     } else {
// //         const provider = await new TokenListProvider().resolve();
// //         const tokenList = provider.filterByChainId(ENV.MainnetBeta).getList();
// //         const tokenMap = new Map(tokenList.map(item => [item.address, item]));
// //         const token = tokenMap.get(mintAddress.toBase58());

// //         if (token) {
// //             return {
// //                 name: token.name,
// //                 symbol: token.symbol,
// //                 logo: token.logoURI
// //             };
// //         } else {
// //             return null;
// //         }
// //     }
// // }

// // above script works pperfectly 

// const express = require('express');
// const {
//     Connection,
//     PublicKey,
//     Keypair,
//     Token, TokenInfo
// } = require("@solana/web3.js");
// const web3 = require('@solana/web3.js');
// const splToken = require('@solana/spl-token');
// const { Metaplex } = require('@metaplex-foundation/js');
// const { TokenListProvider, ENV } = require('@solana/spl-token-registry');
// const bs58 = require("bs58");
// require("dotenv").config();
// const WebSocket = require('ws');
// const { MongoClient } = require('mongodb');
// const cors = require('cors');

// // MongoDB connection URI and database/collection names
// const uri = "mongodb+srv://ehtashamspyresync:L6zuREQ3cQhJCY8b@cluster0.6czzjz5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const dbName = "solna_pairs";
// const collectionName = "solna_pairs_collection";
// const app = express();
// const port = 3000;
// app.use(cors());
// app.use(express.json());
// // Initialize MongoDB client
// // Initialize MongoDB client
// const client = new MongoClient(uri);


// // Function to save data to MongoDB
// async function saveToMongoDB(data) {
//     try {
//         await client.connect();
//         const database = client.db(dbName);
//         const collection = database.collection(collectionName);
//         await collection.insertOne(data);
//         console.log("Data saved to MongoDB");
//     } catch (error) {
//         console.error("Error saving data to MongoDB:", error);
//     } finally {
//         await client.close();
//     }
// }

// // Other required imports and initialization
// const { getPoolData } = require("./poolinfo.js");

// const RAYDIUM_PUBLIC_KEY = '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8';
// const raydium = new PublicKey(RAYDIUM_PUBLIC_KEY);
// const connection = new Connection('https://ultra-delicate-lambo.solana-mainnet.quiknode.pro/9e6a18285b47f9974b7cac73e999be568cfe9929/', {
//     wsEndpoint: 'wss://ultra-delicate-lambo.solana-mainnet.quiknode.pro/9e6a18285b47f9974b7cac73e999be568cfe9929/'
// });

// // Set of processed signatures
// let processedSignatures = new Set();

// // Create a WebSocket server
// const wss = new WebSocket.Server({ port: 8080 });

// // Broadcast data to all connected clients
// function broadcast(data) {
//     wss.clients.forEach(client => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(data));
//         }
//     });
// }

// async function main(connection, raydium, payerString) {
//     console.log('Monitoring logs...', raydium.toString());
//     connection.onLogs(raydium, async ({ logs, err, signature }) => {
//         if (err) {
//             return;
//         }
//         if (logs && logs.some(log => log.includes('initialize2') && !processedSignatures.has(signature))) {
//             processedSignatures.add(signature);
//             console.log('Signature for Initialize2:', signature);
//             const resp = await fetchRaydiumAccounts(signature, connection, payerString);
//             if (resp !== false) {
//                 const poolKeys = await getPoolData(resp, payerString);
//                 console.log(poolKeys);
//                 // Broadcast poolKeys to connected clients
//                 broadcast(poolKeys);
//                 // Save poolKeys to MongoDB
//                 await saveToMongoDB(poolKeys);
//             } else {
//                 console.log('No pool address found or other issue.');
//             }
//         }
//     }, "finalized");
// }

// async function fetchRaydiumAccounts(signature, connection, payerString) {
//     const txId = signature;
//     const tx = await connection.getParsedTransaction(txId, {
//         commitment: "confirmed",
//         maxSupportedTransactionVersion: 0
//     });
//     if (!tx) {
//         console.log('Transaction not found');
//         return false;
//     }
//     console.log(tx);
//     const accounts = tx.transaction.message.instructions.find(ix => ix.programId.toBase58() === RAYDIUM_PUBLIC_KEY)?.accounts;
//     if (!accounts) {
//         console.log('No accounts found');
//         return false;
//     }
//     const tokenAIndex = 8;
//     const tokenBIndex = 9;

//     const tokenAAccount = accounts[tokenAIndex];
//     const tokenBAccount = accounts[tokenBIndex];
//     const poolAddress = accounts[4];
//     const displayData = [
//         { Token: 'Token A', account: tokenAAccount },
//         { Token: 'Token B', account: tokenBAccount },
//     ];

//     const currentTime = new Date().toLocaleString();
//     console.log("New Raydium Liquidity Pool Created Found at", currentTime);

//     let initPcAmount, initCoinAmount;
//     for (let log of tx.meta.logMessages) {
//         if (log.includes('initialize2') && log.includes('init_pc_amount') && log.includes('init_coin_amount')) {
//             const match = log.match(/initialize2: InitializeInstruction2 { nonce: \d+, open_time: \d+, init_pc_amount: (\d+), init_coin_amount: (\d+) }/);
//             if (match) {
//                 initPcAmount = match[1];
//                 initCoinAmount = match[2];
//                 console.log(`Initial liquidity added: PC Amount - ${initPcAmount}, Coin Amount - ${initCoinAmount}`);
//                 break;
//             }
//         }
//     }

//     const tokenAMetadata = await getTokenMetadata(new PublicKey(tokenAAccount), connection);
//     const tokenBMetadata = await getTokenMetadata(new PublicKey(tokenBAccount), connection);
//     console.log(tokenAMetadata);

//     console.log("New Raydium Liquidity Pool Created Found");
//     console.log(generateExplorerUrl(txId));
//     console.table(displayData);

//     // Broadcast transaction data to connected clients
//     broadcast({
//         txId,
//         displayData,
//         tokenAMetadata,
//         tokenBMetadata,
//         initPcAmount,
//         initCoinAmount,
//         timestamp: currentTime
//     });

//     // Save transaction data to MongoDB
//     await saveToMongoDB({
//         txId,
//         displayData,
//         tokenAMetadata,
//         tokenBMetadata,
//         initPcAmount,
//         initCoinAmount,
//         timestamp: currentTime
//     });

//     if (accounts[17].toBase58() == payerString.toBase58()) {
//         return accounts[4];
//     }
    
//     return false;
// }

// function generateExplorerUrl(txId) {
//     return `https://solscan.io/tx/${txId}?cluster=mainnet`;
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function runProgram(payerString) {
//     try {
//         await main(connection, raydium, payerString);
//     } catch (error) {
//         console.error(`Error occurred: ${error}`);
//         console.log('Attempting to restart the program...');
//         setTimeout(() => runProgram(payerString), 1000);
//     }
// }

// const payer = Keypair.fromSecretKey(bs58.decode(process.env.PAYER_SECRET_KEY));
// console.log(payer.publicKey);
// runProgram(payer.publicKey);

// async function fetchTokenMetadata(tokenPublicKey, connection) {
//     const accountInfo = await connection.getAccountInfo(tokenPublicKey);
//     if (!accountInfo) {
//         console.log('Token account not found');
//         return;
//     }
//     const parsedData = accountInfo.data.parsed;
//     if (!parsedData) {
//         console.log('Parsed token data not found');
//         return;
//     }
//     const tokenInfo = new TokenInfo(parsedData);
//     return {
//         name: tokenInfo.name,
//         symbol: tokenInfo.symbol,
//         decimals: tokenInfo.decimals
//     };
// }

// async function getTokenMetadata(mintAddress, connection) {
//     const metaplex = Metaplex.make(connection);
//     const metadataAccount = metaplex.nfts().pdas().metadata({ mint: mintAddress });
//     const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

//     if (metadataAccountInfo) {
//         const token = await metaplex.nfts().findByMint({ mintAddress });
//         return {
//             name: token.name,
//             symbol: token.symbol,
//             logo: token.json?.image
//         };
//     } else {
//         const provider = await new TokenListProvider().resolve();
//         const tokenList = provider.filterByChainId(ENV.MainnetBeta).getList();
//         const tokenMap = new Map(tokenList.map(item => [item.address, item]));
//         const token = tokenMap.get(mintAddress.toBase58());

//         if (token) {
//             return {
//                 name: token.name,
//                 symbol: token.symbol,
//                 logo: token.logoURI
//             };
//         } else {
//             return null;
//         }
//     }
// }

// // Retrieve all data from MongoDB
// async function getAllData() {
//     try {
//         const database = client.db(dbName);
//         const collection = database.collection(collectionName);
//         const data = await collection.find({}).toArray();
//         return data;
//     } catch (error) {
//         console.error("Error retrieving data from MongoDB:", error);
//         return [];
//     }
// }

// // API endpoint to retrieve all data
// app.get('/api/getNewPairs', async (req, res) => {
//     try {
//         const data = await getAllData();
//         res.json(data);
//     } catch (error) {
//         console.error("Error processing request:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });
// async function startServer() {
    
//     app.listen(port, () => {
//         console.log(`Server is running on http://localhost:${port}`);
//     });
// }

// startServer();

const express = require('express');
const { Connection, PublicKey, Keypair } = require("@solana/web3.js");
const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');
const { Metaplex } = require('@metaplex-foundation/js');
const { TokenListProvider, ENV } = require('@solana/spl-token-registry');
const bs58 = require("bs58");
require("dotenv").config();
const WebSocket = require('ws');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const uri = "mongodb+srv://ehtashamspyresync:L6zuREQ3cQhJCY8b@cluster0.6czzjz5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "solna_pairs";
const collectionName = "solna_pairs_collection";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());



const client = new MongoClient(uri);

async function connectMongoDB() {
    try {
        if (!client || !client.topology || !client.topology.isConnected()) {
            await client.connect();
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}



async function saveToMongoDB(data) {
    try {
        await connectMongoDB();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        await collection.insertOne(data);
        console.log("Data saved to MongoDB");
    } catch (error) {
        console.error("Error saving data to MongoDB:", error);
    }
}

const { getPoolData } = require("./poolinfo.js");

const RAYDIUM_PUBLIC_KEY = '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8';
const raydium = new PublicKey(RAYDIUM_PUBLIC_KEY);
const connection = new Connection('https://ultra-delicate-lambo.solana-mainnet.quiknode.pro/9e6a18285b47f9974b7cac73e999be568cfe9929/', {
    wsEndpoint: 'wss://ultra-delicate-lambo.solana-mainnet.quiknode.pro/9e6a18285b47f9974b7cac73e999be568cfe9929/'
});

let processedSignatures = new Set();
//const wss = new WebSocket.Server({ port: 8080 });
const wss = new WebSocket.Server({ host: '192.168.100.9', port: 8080 });


function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

async function main(connection, raydium, payerString) {
    console.log('Monitoring logs...', raydium.toString());
    connection.onLogs(raydium, async ({ logs, err, signature }) => {
        if (err) {
            return;
        }
        if (logs && logs.some(log => log.includes('initialize2') && !processedSignatures.has(signature))) {
            processedSignatures.add(signature);
            console.log('Signature for Initialize2:', signature);
            const resp = await fetchRaydiumAccounts(signature, connection, payerString);
            if (resp !== false) {
                const poolKeys = await getPoolData(resp, payerString);
                console.log(poolKeys);
                broadcast(poolKeys);
                await saveToMongoDB(poolKeys);
            } else {
                console.log('No pool address found or other issue.');
            }
        }
    }, "finalized");
}

async function fetchRaydiumAccounts(signature, connection, payerString) {
    const txId = signature;
    const tx = await connection.getParsedTransaction(txId, {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0
    });
    if (!tx) {
        console.log('Transaction not found');
        return false;
    }
    console.log(tx);
    const accounts = tx.transaction.message.instructions.find(ix => ix.programId.toBase58() === RAYDIUM_PUBLIC_KEY)?.accounts;
    if (!accounts) {
        console.log('No accounts found');
        return false;
    }
    const tokenAIndex = 8;
    const tokenBIndex = 9;

    const tokenAAccount = accounts[tokenAIndex];
    const tokenBAccount = accounts[tokenBIndex];
    const poolAddress = accounts[4];
    const displayData = [
        { Token: 'Token A', account: tokenAAccount },
        { Token: 'Token B', account: tokenBAccount },
    ];

    const currentTime = new Date().toLocaleString();
    console.log("New Raydium Liquidity Pool Created Found at", currentTime);

    let initPcAmount, initCoinAmount;
    for (let log of tx.meta.logMessages) {
        if (log.includes('initialize2') && log.includes('init_pc_amount') && log.includes('init_coin_amount')) {
            const match = log.match(/initialize2: InitializeInstruction2 { nonce: \d+, open_time: \d+, init_pc_amount: (\d+), init_coin_amount: (\d+) }/);
            if (match) {
                initPcAmount = match[1];
                initCoinAmount = match[2];
                console.log(`Initial liquidity added: PC Amount - ${initPcAmount}, Coin Amount - ${initCoinAmount}`);
                break;
            }
        }
    }

    const tokenAMetadata = await getTokenMetadata(new PublicKey(tokenAAccount), connection);
    const tokenBMetadata = await getTokenMetadata(new PublicKey(tokenBAccount), connection);
    console.log(tokenAMetadata);

    

    console.log("New Raydium Liquidity Pool Created Found");
    console.log(generateExplorerUrl(txId));
    console.table(displayData);

    broadcast({
        txId,
        displayData,
        tokenAMetadata,
        tokenBMetadata,
        initPcAmount,
        initCoinAmount,
        timestamp: currentTime
    });

    await saveToMongoDB({
        txId,
        displayData,
        tokenAMetadata,
        tokenBMetadata,
        initPcAmount,
        initCoinAmount,
        timestamp: currentTime
    });

    if (accounts[17].toBase58() == payerString.toBase58()) {
        return accounts[4];
    }
    
    return false;
}

function generateExplorerUrl(txId) {
    return `https://solscan.io/tx/${txId}?cluster=mainnet`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runProgram(payerString) {
    try {
        await main(connection, raydium, payerString);
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        console.log('Attempting to restart the program...');
        setTimeout(() => runProgram(payerString), 1000);
    }
}

const payer = Keypair.fromSecretKey(bs58.decode(process.env.PAYER_SECRET_KEY));
console.log(payer.publicKey);
runProgram(payer.publicKey);

async function fetchTokenMetadata(tokenPublicKey, connection) {
    const accountInfo = await connection.getAccountInfo(tokenPublicKey);
    if (!accountInfo) {
        console.log('Token account not found');
        return;
    }
    const parsedData = accountInfo.data.parsed;
    if (!parsedData) {
        console.log('Parsed token data not found');
        return;
    }
    const tokenInfo = new TokenInfo(parsedData);
    return {
        name: tokenInfo.name,
        symbol: tokenInfo.symbol,
        decimals: tokenInfo.decimals
    };
}

async function getTokenMetadata(mintAddress, connection) {
    const metaplex = Metaplex.make(connection);
    const metadataAccount = metaplex.nfts().pdas().metadata({ mint: mintAddress });
    const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

    if (metadataAccountInfo) {
        const token = await metaplex.nfts().findByMint({ mintAddress });
        return {
            name: token.name,
            symbol: token.symbol,
            logo: token.json?.image
        };
    } else {
        const provider = await new TokenListProvider().resolve();
        const tokenList = provider.filterByChainId(ENV.MainnetBeta).getList();
        const tokenMap = new Map(tokenList.map(item => [item.address, item]));
        const token = tokenMap.get(mintAddress.toBase58());

        if (token) {
            return {
                name: token.name,
                symbol: token.symbol,
                logo: token.logoURI
            };
        } else {
            return null;
        }
    }
}
async function getAllData() {
    try {
        await connectMongoDB();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const data = await collection.find({}).toArray();
        return data;
    } catch (error) {
        console.error("Error retrieving data from MongoDB:", error);
        return [];
    }
}

app.get('/api/getNewPairs', async (req, res) => {
    try {
        const data = await getAllData();
        res.json(data);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

async function startServer() {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

startServer();
