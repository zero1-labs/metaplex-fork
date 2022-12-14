'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var GuestIdentityDriver = require('./GuestIdentityDriver.cjs');

/** @group Plugins */

const guestIdentity = publicKey => ({
  install(metaplex) {
    metaplex.identity().setDriver(new GuestIdentityDriver.GuestIdentityDriver(publicKey));
  }

});

exports.guestIdentity = guestIdentity;
//# sourceMappingURL=plugin.cjs.map
