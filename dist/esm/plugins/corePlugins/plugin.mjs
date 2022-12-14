import { identityModule } from '../identityModule/plugin.mjs';
import { storageModule } from '../storageModule/plugin.mjs';
import { rpcModule } from '../rpcModule/plugin.mjs';
import { operationModule } from '../operationModule/plugin.mjs';
import { programModule } from '../programModule/plugin.mjs';
import { utilsModule } from '../utilsModule/plugin.mjs';
import { guestIdentity } from '../guestIdentity/plugin.mjs';
import { systemModule } from '../systemModule/plugin.mjs';
import { tokenModule } from '../tokenModule/plugin.mjs';
import { nftModule } from '../nftModule/plugin.mjs';
import { candyMachineModule } from '../candyMachineModule/plugin.mjs';
import { auctionHouseModule } from '../auctionHouseModule/plugin.mjs';

// Low-level modules.
const corePlugins = () => ({
  install(metaplex) {
    // Low-level modules.
    metaplex.use(identityModule());
    metaplex.use(storageModule());
    metaplex.use(rpcModule());
    metaplex.use(operationModule());
    metaplex.use(programModule());
    metaplex.use(utilsModule()); // Default drivers.

    metaplex.use(guestIdentity()); // metaplex.use(bundlrStorage());
    // Verticals.

    metaplex.use(systemModule());
    metaplex.use(tokenModule());
    metaplex.use(nftModule());
    metaplex.use(candyMachineModule());
    metaplex.use(auctionHouseModule());
  }

});

export { corePlugins };
//# sourceMappingURL=plugin.mjs.map
