import { SYSVAR_INSTRUCTIONS_PUBKEY } from '@solana/web3.js';
import { createCancelInstruction, createAuctioneerCancelInstruction, createCancelListingReceiptInstruction } from '@metaplex-foundation/mpl-auction-house';
import { AuctioneerAuthorityRequiredError } from '../errors.mjs';
import { findAuctioneerPda } from '../pdas.mjs';
import { AUCTIONEER_PRICE } from '../constants.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';
import { isSigner } from '../../../types/Signer.mjs';

// Operation
// -----------------

const Key = 'CancelListingOperation';
/**
 * Cancels the user's listing in the given auction house.
 *
 * ```ts
 * await metaplex
 *   .auctionHouse()
 *   .cancelListing({ auctionHouse, listing })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const cancelListingOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const cancelListingOperationHandler = {
  handle: async (operation, metaplex) => cancelListingBuilder(operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions)
}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * Cancels the user's listing in the given auction house.
 *
 * ```ts
 * const transactionBuilder = metaplex
 *   .auctionHouse()
 *   .builders()
 *   .cancelListing({ auctionHouse, listing });
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
const cancelListingBuilder = params => {
  var _params$instructionKe;

  const {
    auctionHouse,
    auctioneerAuthority,
    listing
  } = params; // Data.

  const {
    asset,
    sellerAddress,
    receiptAddress,
    tradeStateAddress,
    price,
    tokens
  } = listing;
  const {
    address: auctionHouseAddress,
    authorityAddress,
    feeAccountAddress,
    hasAuctioneer
  } = auctionHouse;

  if (hasAuctioneer && !auctioneerAuthority) {
    throw new AuctioneerAuthorityRequiredError();
  }

  const buyerPrice = hasAuctioneer ? AUCTIONEER_PRICE : price.basisPoints;
  const accounts = {
    wallet: sellerAddress,
    tokenAccount: asset.token.address,
    tokenMint: asset.address,
    authority: authorityAddress,
    auctionHouse: auctionHouseAddress,
    auctionHouseFeeAccount: feeAccountAddress,
    tradeState: tradeStateAddress
  }; // Args.

  const args = {
    buyerPrice,
    tokenSize: tokens.basisPoints
  }; // Cancel Listing Instruction.

  let cancelListingInstruction = createCancelInstruction(accounts, args);

  if (auctioneerAuthority) {
    cancelListingInstruction = createAuctioneerCancelInstruction({ ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda: findAuctioneerPda(auctionHouseAddress, auctioneerAuthority.publicKey)
    }, args);
  } // Signers.


  const cancelSigners = [auctioneerAuthority].filter(isSigner);
  return TransactionBuilder.make() // Cancel Listing.
  .add({
    instruction: cancelListingInstruction,
    signers: cancelSigners,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'cancelListing'
  }) // Cancel Listing Receipt.
  .when(Boolean(receiptAddress), builder => builder.add({
    instruction: createCancelListingReceiptInstruction({
      receipt: receiptAddress,
      instruction: SYSVAR_INSTRUCTIONS_PUBKEY
    }),
    signers: [],
    key: 'cancelListingReceipt'
  }));
};

export { cancelListingBuilder, cancelListingOperation, cancelListingOperationHandler };
//# sourceMappingURL=cancelListing.mjs.map
