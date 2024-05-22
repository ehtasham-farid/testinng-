const {
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
} = require("@solana/web3.js");
const {
    MINT_SIZE, 
    TOKEN_PROGRAM_ID, 
    createInitializeMintInstruction, 
    getMinimumBalanceForRentExemptMint, 
    getAssociatedTokenAddress, 
    createAssociatedTokenAccountInstruction, 
    createMintToInstruction
} = require("@solana/spl-token");
const {
    createCreateMetadataAccountV3Instruction,
    PROGRAM_ID,
} = require("@metaplex-foundation/mpl-token-metadata");
require("dotenv").config();

/* function definition */
exports.createToken = async (connection, payer, decimals, amount) => {
    console.log("Creating token...");
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const mintKeypair = Keypair.generate();
    const tokenATA = await getAssociatedTokenAddress(mintKeypair.publicKey, payer.publicKey);

    const createNewTokenTransaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports: lamports,
            programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
            mintKeypair.publicKey,
            decimals, 
            payer.publicKey, 
            null,
            TOKEN_PROGRAM_ID
        ),
        createAssociatedTokenAccountInstruction(
            payer.publicKey,
            tokenATA,
            payer.publicKey,
            mintKeypair.publicKey,
        ),
        createMintToInstruction(
            mintKeypair.publicKey,
            tokenATA,
            payer.publicKey,
            amount * Math.pow(10, decimals),
            [payer]
        ),
    );
    const signature = await sendAndConfirmTransaction(connection, createNewTokenTransaction, [payer, mintKeypair]);
    console.log(`Signature: ${signature}  Mint: ${mintKeypair.publicKey.toBase58()}`);
}

exports.createMetaData = async (connection, payer, mintAddress, name, symbol) => {
    console.log("Creating meta-data transactions...");
    const mint = new PublicKey(mintAddress);
    const [ metadataPDA ] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            mint.toBuffer()
        ],
        PROGRAM_ID
    );
    console.log("METADATA_PDA:", metadataPDA.toBase58());

    const tokenMetadata = {
        name: name,
        symbol: symbol,
        uri: "",
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null,
    };
    const transaction = new Transaction().add(
        createCreateMetadataAccountV3Instruction(
            {
                metadata: metadataPDA,
                mint: mint,
                mintAuthority: payer.publicKey,
                payer: payer.publicKey,
                updateAuthority: payer.publicKey,
            },
            {
                createMetadataAccountArgsV3: {
                    data: tokenMetadata,
                    isMutable: true,
                    collectionDetails: null,
                },
            }
        )
    );

    const signature = await connection.sendTransaction(transaction, [payer]);
    await connection.confirmTransaction({ signature });
};

