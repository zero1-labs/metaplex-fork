'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Sft = require('./Sft.cjs');
var assert = require('../../../utils/assert.cjs');

/**
 * This model captures all the relevant information about an NFT
 * in the Solana blockchain. That includes the NFT's metadata account,
 * its mint account, its edition account and its off-chain JSON metadata.
 *
 * @group Models
 */

/** @group Model Helpers */
const isNft = value => typeof value === 'object' && value.model === 'nft';
/** @group Model Helpers */

function assertNft(value) {
  assert["default"](isNft(value), `Expected Nft model`);
}
/** @group Model Helpers */

const toNft = (metadata, mint, edition) => ({ ...Sft.toSft(metadata, mint),
  model: 'nft',
  edition
});
/** @group Models */

/** @group Model Helpers */
const isNftWithToken = value => isNft(value) && 'token' in value;
/** @group Model Helpers */

function assertNftWithToken(value) {
  assert["default"](isNftWithToken(value), `Expected Nft model with token`);
}
/** @group Model Helpers */

function assertNftOrSftWithToken(value) {
  assert["default"](isNftWithToken(value) || Sft.isSftWithToken(value), `Expected Nft or Sft model with token`);
}
/** @group Model Helpers */

const toNftWithToken = (metadata, mint, edition, token) => ({ ...Sft.toSftWithToken(metadata, mint, token),
  model: 'nft',
  edition
});

exports.assertNft = assertNft;
exports.assertNftOrSftWithToken = assertNftOrSftWithToken;
exports.assertNftWithToken = assertNftWithToken;
exports.isNft = isNft;
exports.isNftWithToken = isNftWithToken;
exports.toNft = toNft;
exports.toNftWithToken = toNftWithToken;
//# sourceMappingURL=Nft.cjs.map
