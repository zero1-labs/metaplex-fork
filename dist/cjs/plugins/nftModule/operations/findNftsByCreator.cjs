'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var program = require('../program.cjs');
var findNftsByMintList = require('./findNftsByMintList.cjs');
var Operation = require('../../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindNftsByCreatorOperation';
/**
 * Finds multiple NFTs and SFTs by their creator at a given position.
 *
 * ```ts
 * // Find all by first creator.
 * const nfts = await metaplex
 *   .nfts()
 *   .findAllByCreator({ creator })
 *   .run();
 *
 * // Find all by second creator.
 * const nfts = await metaplex
 *   .nfts()
 *   .findAllByCreator({ creator, position: 2 })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findNftsByCreatorOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findNftsByCreatorOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      creator,
      position = 1,
      commitment
    } = operation.input;
    const mints = await program.TokenMetadataProgram.metadataV1Accounts(metaplex).selectMint().whereCreator(position, creator).getDataAsPublicKeys();
    scope.throwIfCanceled();
    const nfts = await metaplex.operations().execute(findNftsByMintList.findNftsByMintListOperation({
      mints,
      commitment
    }), scope);
    scope.throwIfCanceled();
    return nfts.filter(nft => nft !== null);
  }
};

exports.findNftsByCreatorOperation = findNftsByCreatorOperation;
exports.findNftsByCreatorOperationHandler = findNftsByCreatorOperationHandler;
//# sourceMappingURL=findNftsByCreator.cjs.map
