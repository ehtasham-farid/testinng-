const bs58 = require("bs58");
require("dotenv").config();
const {
    clusterApiUrl,
    Connection,
    PublicKey,
    Keypair,
    AddressLookupTableProgram
    
} = require("@solana/web3.js");
const {
    getMint,
    getOrCreateAssociatedTokenAccount,
} = require("@solana/spl-token");

const {
   LIQUIDITY_STATE_LAYOUT_V4,
    MARKET_STATE_LAYOUT_V3,
    SPL_MINT_LAYOUT,
    jsonInfo2PoolKeys
} = require("@raydium-io/raydium-sdk");
const {
    createOpenBookMarket,
    createPool,
} = require("./controlLP");
const {
    createMetaData, 
    createToken
} =require("./createToken");
const fs =require("fs");

// static createProgramAddressSync(seeds: Array<Buffer | Uint8Array>, programId: PublicKey): PublicKey;
// vault_signer = Pubkey.create_program_address(
//     [bytes(Pubkey.from_string('G8vtHduxUwWWAhVVYqT7Lw6cvoM8FYLaqw4gPANtXHyX')), cc.vault_signer_nonce.to_bytes(8, byteorder="little")],
//     Pubkey.from_string("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX")
// )

// const payer = Keypair.fromSecretKey(bs58.decode(process.env.PAYER_SECRET_KEY));
RAYDIUM_PUBLIC_KEY = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getPoolData = async (POOL_ADDRESS, payer, maxRetries = 100, retryDelay = 2000) => { // retryDelay in milliseconds
    const startTime = Date.now();


    const solanaClient = new Connection("https://solitary-long-film.solana-mainnet.quiknode.pro/a22e3df8453ebb64b14b75271244d9dbec9aeba4/", "confirmed");
    const poolPublicKey = new PublicKey(POOL_ADDRESS);
    const poolData = await solanaClient.getAccountInfo(poolPublicKey);
    console.log("----->",poolData.data)
    const lp_data = LIQUIDITY_STATE_LAYOUT_V4.decode(poolData.data);
    const market_id = lp_data.marketId;
    
    const serumData = await solanaClient.getAccountInfo(market_id);
    const market_lp_data = MARKET_STATE_LAYOUT_V3.decode(serumData.data);
    const vaultSigner = await PublicKey.createProgramAddressSync(
        [
            market_id.toBuffer(),
            market_lp_data.vaultSignerNonce.toArrayLike(Buffer, 'le', 8),
        ],
        lp_data.marketProgramId,
    );
    const lpMint = lp_data.lpMint;
    const lpMintAccount = await solanaClient.getAccountInfo(lpMint);
    if (lpMintAccount === null) throw Error(' get lp mint info error');
    const lpMintInfo = SPL_MINT_LAYOUT.decode(lpMintAccount.data);
    // console.log(payer);
    const slot = await solanaClient.getSlot();
    const [lookupTableInst, lookupTableAddress] = AddressLookupTableProgram.createLookupTable({
        authority: lp_data.marketId,
        payer: lp_data.marketId,
        recentSlot: slot,
        });
    console.log(lookupTableAddress);
    lookupTableAccount = await solanaClient.getAddressLookupTable(lookupTableAddress);
    console.log(lookupTableAccount);
    account_table = new PublicKey("5ppgm3ckDscUGnTMFDt1phYQuFyu3WhyNHAAdSbKMJP1");
    const outpoolData = {
        id: poolPublicKey.toString(),
        baseMint: market_lp_data.baseMint.toString(),
        quoteMint: market_lp_data.quoteMint.toString(),
        lpMint: lp_data.lpMint.toString(),
        baseDecimals: lp_data.baseDecimal.toNumber(),
        quoteDecimals: lp_data.quoteDecimal.toNumber(),
        lpDecimals: lpMintInfo.decimals,
        version: 4,
        marketVersion: 3,
        programId: RAYDIUM_PUBLIC_KEY,
        authority: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
        openOrders: lp_data.openOrders.toString(),
        targetOrders: lp_data.targetOrders.toString(),
        baseVault: lp_data.baseVault.toString(),
        quoteVault: lp_data.quoteVault.toString(),
        lpVault: lp_data.lpVault.toString(),
        withdrawQueue: lp_data.withdrawQueue.toString(),
        marketProgramId: lp_data.marketProgramId.toString(),
        marketId: lp_data.marketId.toString(),
        marketAuthority: vaultSigner.toString(),
        marketBaseVault: market_lp_data.baseVault.toString(),
        marketQuoteVault: market_lp_data.quoteVault.toString(),
        marketBids: market_lp_data.bids.toString(),
        marketAsks: market_lp_data.asks.toString(),
        marketEventQueue: market_lp_data.eventQueue.toString(),
        lookupTableAccount: PublicKey.default.toString()
    };

    const endTime = Date.now();
    console.log(`Execution completed in ${endTime - startTime} ms`);
    poolKeys = jsonInfo2PoolKeys(outpoolData);
    return poolKeys;
    
    
};
// let data = getPoolData("");
// console.log(data);

module.exports = { getPoolData};