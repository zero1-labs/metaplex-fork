import { cusper } from '@metaplex-foundation/mpl-token-metadata';
import { TokenMetadataGpaBuilder } from './gpaBuilders.mjs';
import { NftClient } from './NftClient.mjs';
import { TokenMetadataProgram } from './program.mjs';
import { approveNftCollectionAuthorityOperation, approveNftCollectionAuthorityOperationHandler } from './operations/approveNftCollectionAuthority.mjs';
import { approveNftUseAuthorityOperation, approveNftUseAuthorityOperationHandler } from './operations/approveNftUseAuthority.mjs';
import { createNftOperation, createNftOperationHandler } from './operations/createNft.mjs';
import { createSftOperation, createSftOperationHandler } from './operations/createSft.mjs';
import { deleteNftOperation, deleteNftOperationHandler } from './operations/deleteNft.mjs';
import { findNftByMetadataOperation, findNftByMetadataOperationHandler } from './operations/findNftByMetadata.mjs';
import { findNftByMintOperation, findNftByMintOperationHandler } from './operations/findNftByMint.mjs';
import { findNftByTokenOperation, findNftByTokenOperationHandler } from './operations/findNftByToken.mjs';
import { findNftsByCreatorOperation, findNftsByCreatorOperationHandler } from './operations/findNftsByCreator.mjs';
import { findNftsByMintListOperation, findNftsByMintListOperationHandler } from './operations/findNftsByMintList.mjs';
import { findNftsByOwnerOperation, findNftsByOwnerOperationHandler } from './operations/findNftsByOwner.mjs';
import { findNftsByUpdateAuthorityOperation, findNftsByUpdateAuthorityOperationHandler } from './operations/findNftsByUpdateAuthority.mjs';
import { freezeDelegatedNftOperation, freezeDelegatedNftOperationHandler } from './operations/freezeDelegatedNft.mjs';
import { loadMetadataOperation, loadMetadataOperationHandler } from './operations/loadMetadata.mjs';
import { migrateToSizedCollectionNftOperation, migrateToSizedCollectionNftOperationHandler } from './operations/migrateToSizedCollectionNft.mjs';
import { printNewEditionOperation, printNewEditionOperationHandler } from './operations/printNewEdition.mjs';
import { revokeNftCollectionAuthorityOperation, revokeNftCollectionAuthorityOperationHandler } from './operations/revokeNftCollectionAuthority.mjs';
import { revokeNftUseAuthorityOperation, revokeNftUseAuthorityOperationHandler } from './operations/revokeNftUseAuthority.mjs';
import { thawDelegatedNftOperation, thawDelegatedNftOperationHandler } from './operations/thawDelegatedNft.mjs';
import { unverifyNftCollectionOperation, unverifyNftCollectionOperationHandler } from './operations/unverifyNftCollection.mjs';
import { unverifyNftCreatorOperation, unverifyNftCreatorOperationHandler } from './operations/unverifyNftCreator.mjs';
import { updateNftOperation, updateNftOperationHandler } from './operations/updateNft.mjs';
import { uploadMetadataOperation, uploadMetadataOperationHandler } from './operations/uploadMetadata.mjs';
import { useNftOperation, useNftOperationHandler } from './operations/useNft.mjs';
import { verifyNftCollectionOperation, verifyNftCollectionOperationHandler } from './operations/verifyNftCollection.mjs';
import { verifyNftCreatorOperation, verifyNftCreatorOperationHandler } from './operations/verifyNftCreator.mjs';

/** @group Plugins */

const nftModule = () => ({
  install(metaplex) {
    // Token Metadata Program.
    metaplex.programs().register({
      name: 'TokenMetadataProgram',
      address: TokenMetadataProgram.publicKey,
      errorResolver: error => cusper.errorFromProgramLogs(error.logs, false),
      gpaResolver: metaplex => new TokenMetadataGpaBuilder(metaplex, TokenMetadataProgram.publicKey)
    }); // Operations.

    const op = metaplex.operations();
    op.register(approveNftCollectionAuthorityOperation, approveNftCollectionAuthorityOperationHandler);
    op.register(approveNftUseAuthorityOperation, approveNftUseAuthorityOperationHandler);
    op.register(createNftOperation, createNftOperationHandler);
    op.register(createSftOperation, createSftOperationHandler);
    op.register(deleteNftOperation, deleteNftOperationHandler);
    op.register(findNftByMetadataOperation, findNftByMetadataOperationHandler);
    op.register(findNftByMintOperation, findNftByMintOperationHandler);
    op.register(findNftByTokenOperation, findNftByTokenOperationHandler);
    op.register(findNftsByCreatorOperation, findNftsByCreatorOperationHandler);
    op.register(findNftsByMintListOperation, findNftsByMintListOperationHandler);
    op.register(findNftsByOwnerOperation, findNftsByOwnerOperationHandler);
    op.register(findNftsByUpdateAuthorityOperation, findNftsByUpdateAuthorityOperationHandler);
    op.register(freezeDelegatedNftOperation, freezeDelegatedNftOperationHandler);
    op.register(loadMetadataOperation, loadMetadataOperationHandler);
    op.register(migrateToSizedCollectionNftOperation, migrateToSizedCollectionNftOperationHandler);
    op.register(printNewEditionOperation, printNewEditionOperationHandler);
    op.register(revokeNftCollectionAuthorityOperation, revokeNftCollectionAuthorityOperationHandler);
    op.register(revokeNftUseAuthorityOperation, revokeNftUseAuthorityOperationHandler);
    op.register(thawDelegatedNftOperation, thawDelegatedNftOperationHandler);
    op.register(unverifyNftCollectionOperation, unverifyNftCollectionOperationHandler);
    op.register(unverifyNftCreatorOperation, unverifyNftCreatorOperationHandler);
    op.register(updateNftOperation, updateNftOperationHandler);
    op.register(uploadMetadataOperation, uploadMetadataOperationHandler);
    op.register(useNftOperation, useNftOperationHandler);
    op.register(verifyNftCollectionOperation, verifyNftCollectionOperationHandler);
    op.register(verifyNftCreatorOperation, verifyNftCreatorOperationHandler);

    metaplex.nfts = function () {
      return new NftClient(this);
    };
  }

});

export { nftModule };
//# sourceMappingURL=plugin.mjs.map
