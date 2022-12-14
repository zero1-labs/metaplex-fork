import { useOperation } from '../../../types/Operation.mjs';
import { assertNftOrSftWithToken } from '../../nftModule/models/Nft.mjs';
import { amount } from '../../../types/Amount.mjs';

// Operation
// -----------------

const Key = 'LoadListingOperation';
/**
 * Transforms a `LazyListing` model into a `Listing` model.
 *
 * ```ts
 * const listing = await metaplex
 *   .auctionHouse()
 *   .loadListing({ lazyListing })
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const loadListingOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const loadListingOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      lazyListing,
      loadJsonMetadata = true,
      commitment
    } = operation.input;
    const asset = await metaplex.nfts().findByMetadata({
      metadata: lazyListing.metadataAddress,
      tokenOwner: lazyListing.sellerAddress,
      commitment,
      loadJsonMetadata
    }).run(scope);
    assertNftOrSftWithToken(asset);
    return { ...lazyListing,
      model: 'listing',
      lazy: false,
      asset,
      tokens: amount(lazyListing.tokens, asset.mint.currency)
    };
  }
};

export { loadListingOperation, loadListingOperationHandler };
//# sourceMappingURL=loadListing.mjs.map
