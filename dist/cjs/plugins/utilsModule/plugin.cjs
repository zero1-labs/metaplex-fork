'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var UtilsClient = require('./UtilsClient.cjs');

/** @group Plugins */

const utilsModule = () => ({
  install(metaplex) {
    const utilsClient = new UtilsClient.UtilsClient(metaplex);

    metaplex.utils = () => utilsClient;
  }

});

exports.utilsModule = utilsModule;
//# sourceMappingURL=plugin.cjs.map
