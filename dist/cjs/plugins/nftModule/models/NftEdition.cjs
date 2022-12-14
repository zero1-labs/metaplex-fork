'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var assert = require('../../../utils/assert.cjs');
var BigNumber = require('../../../types/BigNumber.cjs');

/** @group Models */

/** @group Model Helpers */
const isNftEdition = value => typeof value === 'object' && value.model === 'nftEdition';
/** @group Model Helpers */

function assertNftEdition(value) {
  assert["default"](isNftEdition(value), `Expected NftEdition model`);
}
/** @group Model Helpers */

const toNftEdition = account => accounts.isOriginalEditionAccount(account) ? toNftOriginalEdition(account) : toNftPrintEdition(account);
/** @group Models */

/** @group Model Helpers */
const isNftOriginalEdition = value => isNftEdition(value) && value.isOriginal;
/** @group Model Helpers */

function assertNftOriginalEdition(value) {
  assert["default"](isNftOriginalEdition(value), `Expected NftOriginalEdition model`);
}
/** @group Model Helpers */

const toNftOriginalEdition = account => ({
  model: 'nftEdition',
  isOriginal: true,
  address: account.publicKey,
  supply: BigNumber.toBigNumber(account.data.supply),
  maxSupply: BigNumber.toOptionBigNumber(account.data.maxSupply)
});
/** @group Models */

/** @group Model Helpers */
const isNftPrintEdition = value => isNftEdition(value) && !value.isOriginal;
/** @group Model Helpers */

function assertNftPrintEdition(value) {
  assert["default"](isNftPrintEdition(value), `Expected NftPrintEdition model`);
}
/** @group Model Helpers */

const toNftPrintEdition = account => ({
  model: 'nftEdition',
  isOriginal: false,
  address: account.publicKey,
  parent: account.data.parent,
  number: BigNumber.toBigNumber(account.data.edition)
});

exports.assertNftEdition = assertNftEdition;
exports.assertNftOriginalEdition = assertNftOriginalEdition;
exports.assertNftPrintEdition = assertNftPrintEdition;
exports.isNftEdition = isNftEdition;
exports.isNftOriginalEdition = isNftOriginalEdition;
exports.isNftPrintEdition = isNftPrintEdition;
exports.toNftEdition = toNftEdition;
exports.toNftOriginalEdition = toNftOriginalEdition;
exports.toNftPrintEdition = toNftPrintEdition;
//# sourceMappingURL=NftEdition.cjs.map
