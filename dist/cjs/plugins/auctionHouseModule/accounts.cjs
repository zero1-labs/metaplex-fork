'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var Account = require('../../types/Account.cjs');

/** @group Accounts */

/** @group Account Helpers */
const parseAuctioneerAccount = Account.getAccountParsingFunction(mplAuctionHouse.Auctioneer);
/** @group Account Helpers */

const toAuctioneerAccount = Account.getAccountParsingAndAssertingFunction(mplAuctionHouse.Auctioneer);
/** @group Accounts */

/** @group Account Helpers */
const parseAuctionHouseAccount = Account.getAccountParsingFunction(mplAuctionHouse.AuctionHouse);
/** @group Account Helpers */

const toAuctionHouseAccount = Account.getAccountParsingAndAssertingFunction(mplAuctionHouse.AuctionHouse);
/** @group Accounts */

/** @group Account Helpers */
const parseListingReceiptAccount = Account.getAccountParsingFunction(mplAuctionHouse.ListingReceipt);
/** @group Account Helpers */

const toListingReceiptAccount = Account.getAccountParsingAndAssertingFunction(mplAuctionHouse.ListingReceipt);
/** @group Accounts */

/** @group Account Helpers */
const parseBidReceiptAccount = Account.getAccountParsingFunction(mplAuctionHouse.BidReceipt);
/** @group Account Helpers */

const toBidReceiptAccount = Account.getAccountParsingAndAssertingFunction(mplAuctionHouse.BidReceipt);
/** @group Accounts */

/** @group Account Helpers */
const parsePurchaseReceiptAccount = Account.getAccountParsingFunction(mplAuctionHouse.PurchaseReceipt);
/** @group Account Helpers */

const toPurchaseReceiptAccount = Account.getAccountParsingAndAssertingFunction(mplAuctionHouse.PurchaseReceipt);

exports.parseAuctionHouseAccount = parseAuctionHouseAccount;
exports.parseAuctioneerAccount = parseAuctioneerAccount;
exports.parseBidReceiptAccount = parseBidReceiptAccount;
exports.parseListingReceiptAccount = parseListingReceiptAccount;
exports.parsePurchaseReceiptAccount = parsePurchaseReceiptAccount;
exports.toAuctionHouseAccount = toAuctionHouseAccount;
exports.toAuctioneerAccount = toAuctioneerAccount;
exports.toBidReceiptAccount = toBidReceiptAccount;
exports.toListingReceiptAccount = toListingReceiptAccount;
exports.toPurchaseReceiptAccount = toPurchaseReceiptAccount;
//# sourceMappingURL=accounts.cjs.map
