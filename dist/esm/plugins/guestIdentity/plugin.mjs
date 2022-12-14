import { GuestIdentityDriver } from './GuestIdentityDriver.mjs';

/** @group Plugins */

const guestIdentity = publicKey => ({
  install(metaplex) {
    metaplex.identity().setDriver(new GuestIdentityDriver(publicKey));
  }

});

export { guestIdentity };
//# sourceMappingURL=plugin.mjs.map
