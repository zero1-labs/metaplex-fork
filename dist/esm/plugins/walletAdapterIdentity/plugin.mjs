import { WalletAdapterIdentityDriver } from './WalletAdapterIdentityDriver.mjs';

const walletAdapterIdentity = walletAdapter => ({
  install(metaplex) {
    metaplex.identity().setDriver(new WalletAdapterIdentityDriver(walletAdapter));
  }

});

export { walletAdapterIdentity };
//# sourceMappingURL=plugin.mjs.map
