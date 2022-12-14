import assert from '../../../utils/assert.mjs';
import { toDateTime, toOptionDateTime } from '../../../types/DateTime.mjs';
import { amount, lamports } from '../../../types/Amount.mjs';
import { Pda } from '../../../types/Pda.mjs';
import { toBigNumber } from '../../../types/BigNumber.mjs';

/** @group Model Helpers */
const isBid = value => typeof value === 'object' && value.model === 'bid' && !value.lazy;
/** @group Model Helpers */

function assertBid(value) {
  assert(isBid(value), `Expected Bid type`);
}
/** @group Model Helpers */

const toBid = (account, auctionHouse, asset) => {
  const lazyBid = toLazyBid(account, auctionHouse);
  return { ...lazyBid,
    model: 'bid',
    lazy: false,
    ...('token' in asset ? {
      asset,
      tokens: amount(lazyBid.tokens, asset.mint.currency),
      isPublic: false
    } : {
      asset,
      tokens: amount(lazyBid.tokens, asset.mint.currency),
      isPublic: true
    })
  };
};

/** @group Model Helpers */
const isLazyBid = value => typeof value === 'object' && value.model === 'bid' && value.lazy;
/** @group Model Helpers */

function assertLazyBid(value) {
  assert(isLazyBid(value), `Expected LazyBid type`);
}
/** @group Model Helpers */

const toLazyBid = (account, auctionHouse) => {
  return {
    model: 'bid',
    lazy: true,
    auctionHouse,
    tradeStateAddress: new Pda(account.data.tradeState, account.data.tradeStateBump),
    bookkeeperAddress: account.data.bookkeeper,
    buyerAddress: account.data.buyer,
    metadataAddress: account.data.metadata,
    tokenAddress: account.data.tokenAccount,
    receiptAddress: new Pda(account.publicKey, account.data.bump),
    purchaseReceiptAddress: account.data.purchaseReceipt,
    isPublic: Boolean(account.data.tokenAccount),
    // Data.
    price: auctionHouse.isNative ? lamports(account.data.price) : amount(account.data.price, auctionHouse.treasuryMint.currency),
    tokens: toBigNumber(account.data.tokenSize),
    createdAt: toDateTime(account.data.createdAt),
    canceledAt: toOptionDateTime(account.data.canceledAt)
  };
};

export { assertBid, assertLazyBid, isBid, isLazyBid, toBid, toLazyBid };
//# sourceMappingURL=Bid.mjs.map
