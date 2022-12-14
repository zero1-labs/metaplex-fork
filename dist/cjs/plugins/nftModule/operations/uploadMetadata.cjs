'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cloneDeep = require('lodash.clonedeep');
var common = require('../../../utils/common.cjs');
var MetaplexFile = require('../../storageModule/MetaplexFile.cjs');
var Operation = require('../../../types/Operation.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);

// -----------------
// Operation
// -----------------
const Key = 'UploadMetadataOperation';
/**
 * Uploads a JSON Metadata object to the current storage provider.
 *
 * ```ts
 * const { uri } = await metaplex
 *   .nfts()
 *   .uploadMetadata({
 *     name: "My NFT",
 *     description: "My description",
 *     image: "https://arweave.net/123",
 *   })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const uploadMetadataOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const uploadMetadataOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const rawMetadata = operation.input;
    const files = getAssetsFromJsonMetadata(rawMetadata);
    const assetUris = await metaplex.storage().uploadAll(files);
    scope.throwIfCanceled();
    const metadata = replaceAssetsWithUris(rawMetadata, assetUris);
    const uri = await metaplex.storage().uploadJson(metadata);
    return {
      uri,
      metadata,
      assetUris
    };
  }
};
const getAssetsFromJsonMetadata = input => {
  const files = [];
  common.walk(input, (next, value) => {
    if (MetaplexFile.isMetaplexFile(value)) {
      files.push(value);
    } else {
      next(value);
    }
  });
  return files;
};
const replaceAssetsWithUris = (input, replacements) => {
  const clone = cloneDeep__default["default"](input);
  let index = 0;
  common.walk(clone, (next, value, key, parent) => {
    if (MetaplexFile.isMetaplexFile(value) && index < replacements.length) {
      parent[key] = replacements[index++];
    }

    next(value);
  });
  return clone;
};

exports.getAssetsFromJsonMetadata = getAssetsFromJsonMetadata;
exports.replaceAssetsWithUris = replaceAssetsWithUris;
exports.uploadMetadataOperation = uploadMetadataOperation;
exports.uploadMetadataOperationHandler = uploadMetadataOperationHandler;
//# sourceMappingURL=uploadMetadata.cjs.map
