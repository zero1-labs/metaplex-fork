import assert from '../../../utils/assert.mjs';
import { amount, lamports } from '../../../types/Amount.mjs';
import { toBigNumber } from '../../../types/BigNumber.mjs';
import { toDateTime } from '../../../types/DateTime.mjs';

const isPurchase = value => typeof value === 'object' && value.model === 'purchase' && !value.lazy;
function assertPurchase(value) {
  assert(isPurchase(value), `Expected Purchase type`);
}
const toPurchase = (account, auctionHouseModel, asset) => {
  const lazyPurchase = toLazyPurchase(account, auctionHouseModel);
  return { ...lazyPurchase,
    model: 'purchase',
    lazy: false,
    asset,
    tokens: amount(lazyPurchase.tokens, asset.mint.currency)
  };
};
const isLazyPurchase = value => typeof value === 'object' && value.model === 'purchase' && value.lazy;
function assertLazyPurchase(value) {
  assert(isLazyPurchase(value), `Expected LazyPurchase type`);
}
const toLazyPurchase = (account, auctionHouseModel) => {
  return {
    model: 'purchase',
    lazy: true,
    auctionHouse: auctionHouseModel,
    buyerAddress: account.data.buyer,
    sellerAddress: account.data.seller,
    metadataAddress: account.data.metadata,
    bookkeeperAddress: account.data.bookkeeper,
    receiptAddress: account.publicKey,
    price: auctionHouseModel.isNative ? lamports(account.data.price) : amount(account.data.price, auctionHouseModel.treasuryMint.currency),
    tokens: toBigNumber(account.data.tokenSize),
    createdAt: toDateTime(account.data.createdAt)
  };
};

export { assertLazyPurchase, assertPurchase, isLazyPurchase, isPurchase, toLazyPurchase, toPurchase };
//# sourceMappingURL=Purchase.mjs.map
