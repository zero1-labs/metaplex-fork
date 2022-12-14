'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var GpaBuilder = require('../../../utils/GpaBuilder.cjs');

// TODO: copied from auction house SDK
// SDK should either provide a GPA builder or expose this discriminator
const purchaseReceiptDiscriminator = [79, 127, 222, 137, 154, 131, 150, 134];
const PUBLIC_KEY_LENGTH = web3_js.PublicKey.default.toBytes().byteLength;
const BOOKKEEPER = purchaseReceiptDiscriminator.length;
const BUYER = BOOKKEEPER + PUBLIC_KEY_LENGTH;
const SELLER = BUYER + PUBLIC_KEY_LENGTH;
const AUCTION_HOUSE = SELLER + PUBLIC_KEY_LENGTH;
const METADATA = AUCTION_HOUSE + PUBLIC_KEY_LENGTH;
class PurchaseReceiptGpaBuilder extends GpaBuilder.GpaBuilder {
  whereDiscriminator(discrimator) {
    return this.where(0, Buffer.from(discrimator));
  }

  purchaseReceiptAccounts() {
    return this.whereDiscriminator(purchaseReceiptDiscriminator);
  }

  whereBuyer(buyerAddress) {
    return this.purchaseReceiptAccounts().where(BUYER, buyerAddress);
  }

  whereSeller(sellerAddress) {
    return this.purchaseReceiptAccounts().where(SELLER, sellerAddress);
  }

  whereAuctionHouse(auctionHouseAddress) {
    return this.purchaseReceiptAccounts().where(AUCTION_HOUSE, auctionHouseAddress);
  }

  whereMetadata(metadataAddress) {
    return this.purchaseReceiptAccounts().where(METADATA, metadataAddress);
  }

}

exports.PurchaseReceiptGpaBuilder = PurchaseReceiptGpaBuilder;
//# sourceMappingURL=PurchaseReceiptGpaBuilder.cjs.map
