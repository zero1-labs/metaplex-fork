'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var assert = require('../../../utils/assert.cjs');
var Amount = require('../../../types/Amount.cjs');
var BigNumber = require('../../../types/BigNumber.cjs');
var DateTime = require('../../../types/DateTime.cjs');

const isPurchase = value => typeof value === 'object' && value.model === 'purchase' && !value.lazy;
function assertPurchase(value) {
  assert["default"](isPurchase(value), `Expected Purchase type`);
}
const toPurchase = (account, auctionHouseModel, asset) => {
  const lazyPurchase = toLazyPurchase(account, auctionHouseModel);
  return { ...lazyPurchase,
    model: 'purchase',
    lazy: false,
    asset,
    tokens: Amount.amount(lazyPurchase.tokens, asset.mint.currency)
  };
};
const isLazyPurchase = value => typeof value === 'object' && value.model === 'purchase' && value.lazy;
function assertLazyPurchase(value) {
  assert["default"](isLazyPurchase(value), `Expected LazyPurchase type`);
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
    price: auctionHouseModel.isNative ? Amount.lamports(account.data.price) : Amount.amount(account.data.price, auctionHouseModel.treasuryMint.currency),
    tokens: BigNumber.toBigNumber(account.data.tokenSize),
    createdAt: DateTime.toDateTime(account.data.createdAt)
  };
};

exports.assertLazyPurchase = assertLazyPurchase;
exports.assertPurchase = assertPurchase;
exports.isLazyPurchase = isLazyPurchase;
exports.isPurchase = isPurchase;
exports.toLazyPurchase = toLazyPurchase;
exports.toPurchase = toPurchase;
//# sourceMappingURL=Purchase.cjs.map
