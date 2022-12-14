'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var IdentityClient = require('./IdentityClient.cjs');

/** @group Plugins */

const identityModule = () => ({
  install(metaplex) {
    const identityClient = new IdentityClient.IdentityClient();

    metaplex.identity = () => identityClient;
  }

});

exports.identityModule = identityModule;
//# sourceMappingURL=plugin.cjs.map
