import { useOperation } from '../../../types/Operation.mjs';
import { toTokenAccount } from '../../tokenModule/accounts.mjs';

// -----------------
// Operation
// -----------------
const Key = 'FindNftByTokenOperation';
/**
 * Finds an NFT or an SFT by its token address.
 *
 * ```ts
 * const nft = await metaplex
 *   .nfts()
 *   .findByToken({ token })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findNftByTokenOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findNftByTokenOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const token = toTokenAccount(await metaplex.rpc().getAccount(operation.input.token));
    scope.throwIfCanceled();
    const asset = await metaplex.nfts().findByMint({ ...operation.input,
      mintAddress: token.data.mint,
      tokenAddress: operation.input.token
    }).run(scope);
    return asset;
  }
};

export { findNftByTokenOperation, findNftByTokenOperationHandler };
//# sourceMappingURL=findNftByToken.mjs.map
