// const {
//     Token,
//     TokenAmount,
//     Liquidity,
//     ENDPOINT,
//     RAYDIUM_MAINNET,
//     LOOKUP_TABLE_CACHE,
//     MAINNET_PROGRAM_ID,
//     DEVNET_PROGRAM_ID,
//     TOKEN_PROGRAM_ID,
//     SPL_ACCOUNT_LAYOUT,
//     TxVersion,
//     jsonInfo2PoolKeys,
//     buildSimpleTransaction
    
// } = require("@raydium-io/raydium-sdk");
// const {
//     createOpenBookMarket,
//     createPool,
// } = require("./controlLP");
// const {
//     createMetaData, 
//     createToken
// } =require("./createToken");
// const fs =require("fs");

// /* variables */
// const DEVNET_MODE = process.env.DEVNET_MODE === "true";
// const PROGRAMIDS = DEVNET_MODE ? DEVNET_PROGRAM_ID : MAINNET_PROGRAM_ID;
// const addLookupTableInfo = DEVNET_MODE ? undefined : LOOKUP_TABLE_CACHE;
// const makeTxVersion = TxVersion.V0; // LEGACY
// const connection = new Connection(DEVNET_MODE ? clusterApiUrl("devnet") : clusterApiUrl("mainnet-beta"), "confirmed");
// const payer = Keypair.fromSecretKey(bs58.decode(process.env.PAYER_SECRET_KEY));
// const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
// const TRADING_PERIOD = 3000; // ms 
// const GOAL_SOL = 7000000000;
// let solLP = 0;
// let timer;
// let poolKeys;

// console.log("Payer:", payer.publicKey.toBase58());
// console.log("Mode:", DEVNET_MODE ? "devnet" : "mainnet");

// async function getWalletTokenAccount(connection, wallet) {
//     const walletTokenAccount = await connection.getTokenAccountsByOwner(wallet, {
//       programId: TOKEN_PROGRAM_ID,
//     });
//     return walletTokenAccount.value.map((i) => ({
//       pubkey: i.pubkey,
//       programId: i.account.owner,
//       accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
//     }));
//   }


// /* functions definition */
// const trackingInit = async () => {
//     console.log("LP Initializing... ");
//     // -------- pre-action: fetch basic info --------
//     const ammV2PoolData = await fetch(ENDPOINT + RAYDIUM_MAINNET.poolInfo).then((res) => res.json())
//     const targetPoolInfo = [...ammV2PoolData.official, ...ammV2PoolData.unOfficial].find((poolInfo) => poolInfo.id === process.env.AMM_ID);
//     console.log("targetPoolInfo : ", targetPoolInfo);
//     poolKeys = jsonInfo2PoolKeys(targetPoolInfo);

//     console.log("LP was initialized.marketId : ", targetPoolInfo.marketId)
// }

// // const trackingSOL = async (poolKeys) => {
// //     while (true){
// //         extraPoolInfo = await Liquidity.fetchInfo({ connection, poolKeys });
// //         solLP = extraPoolInfo.quoteReserve.toNumber();
// //         console.log("======== SOL of LP:", solLP);
// //         if (solLP > GOAL_SOL) {
// //             const lpToken = new Token(TOKEN_PROGRAM_ID, poolKeys.lpMint, poolKeys.lpDecimals);
// //             const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, poolKeys.lpMint, payer.publicKey);
// //             console.log("========= lpToken:", lpToken)
// //             console.log("========= tokenAccount : ",tokenAccount)
    
// //             let amountIn = new TokenAmount(lpToken, tokenAccount.amount);
// //             console.log("========= amountIn : ", amountIn);
// //             // amountIn = amountIn - 100000000;
// //             let innerTransactions;
// //             let walletTokenAccounts = await getWalletTokenAccount(connection, payer.publicKey);
// //             if (DEVNET_MODE === false) {
// //                 innerTransactions = await Liquidity.makeRemoveLiquidityInstructionSimple({
// //                     connection,
// //                     poolKeys,
// //                     userKeys: {
// //                         owner: payer.publicKey,
// //                         payer: payer.publicKey,
// //                         tokenAccounts: walletTokenAccounts,
// //                     },
// //                     amountIn: amountIn,
// //                     makeTxVersion,
// //                 });
// //                 console.log(innerTransactions.innerTransactions);
// //                 const transactions = await buildSimpleTransaction({
// //                     connection,
// //                     makeTxVersion,
// //                     payer: payer.publicKey,
// //                     innerTransactions:innerTransactions.innerTransactions,
// //                     addLookupTableInfo:addLookupTableInfo,
// //                 });
                
// //                 let txids = [];
// //                 for (const iTx of transactions) {
// //                     if (iTx instanceof VersionedTransaction) {
// //                       iTx.sign([payer]);
// //                       txids.push(await connection.sendTransaction(iTx));
// //                     } else {
// //                       txids.push(await connection.sendTransaction(iTx, [payer]));
// //                     }
// //                   }
                  
// //                 // await sendAndConfirmTransaction(connection, payer, transactions[0]);
// //                 console.log(txids);
// //                 // await sendAndConfirmTransactions(connection, payer, transactions);
// //             }
// //             console.log("======== Your LP was removed from Raydium.");
// //             return;
// //         }
// //     }
    
// // }
//  module.exports = {trackingInit };