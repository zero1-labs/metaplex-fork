import { MetadataV1GpaBuilder } from './gpaBuilders';
import { Metaplex } from '../../Metaplex';
/** @group Programs */
export declare const TokenMetadataProgram: {
    publicKey: import("@solana/web3.js").PublicKey;
    metadataV1Accounts(metaplex: Metaplex): MetadataV1GpaBuilder;
};
