'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var GpaBuilder = require('../../../utils/GpaBuilder.cjs');

// TODO: copied from auction house SDK
// SDK should either provide a GPA builder or expose this discriminator
const bidReceiptDiscriminator = [186, 150, 141, 135, 59, 122, 39, 99];
const PUBLIC_KEY_LENGTH = web3_js.PublicKey.default.toBytes().byteLength;
const TRADE_STATE = bidReceiptDiscriminator.length;
const BOOKKEEPER = TRADE_STATE + PUBLIC_KEY_LENGTH;
const AUCTION_HOUSE = BOOKKEEPER + PUBLIC_KEY_LENGTH;
const BUYER = AUCTION_HOUSE + PUBLIC_KEY_LENGTH;
const METADATA = BUYER + PUBLIC_KEY_LENGTH;
class BidReceiptGpaBuilder extends GpaBuilder.GpaBuilder {
  whereDiscriminator(discrimator) {
    return this.where(0, Buffer.from(discrimator));
  }

  bidReceiptAccounts() {
    return this.whereDiscriminator(bidReceiptDiscriminator);
  }

  whereAuctionHouse(auctionHouseAddress) {
    return this.bidReceiptAccounts().where(AUCTION_HOUSE, auctionHouseAddress);
  }

  whereBuyer(buyerAddress) {
    return this.bidReceiptAccounts().where(BUYER, buyerAddress);
  }

  whereMetadata(metadataAddress) {
    return this.bidReceiptAccounts().where(METADATA, metadataAddress);
  }

}

exports.BidReceiptGpaBuilder = BidReceiptGpaBuilder;
//# sourceMappingURL=BidReceiptGpaBuilder.cjs.map
