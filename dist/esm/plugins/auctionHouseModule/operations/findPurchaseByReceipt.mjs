import { toPurchaseReceiptAccount } from '../accounts.mjs';
import { toLazyPurchase } from '../models/Purchase.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindPurchaseByReceiptOperation';
/**
 * Finds a Purchase by its receipt address.
 *
 * ```ts
 * const nft = await metaplex
 *   .auctionHouse()
 *   .findPurchaseByReceipt({ receiptAddress, auctionHouse })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findPurchaseByReceiptOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findPurchaseByReceiptOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      receiptAddress,
      auctionHouse,
      commitment
    } = operation.input;
    const account = toPurchaseReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyPurchase = toLazyPurchase(account, auctionHouse);
    return metaplex.auctionHouse().loadPurchase({
      lazyPurchase,
      ...operation.input
    }).run(scope);
  }
};

export { findPurchaseByReceiptOperation, findPurchaseByReceiptOperationHandler };
//# sourceMappingURL=findPurchaseByReceipt.mjs.map
