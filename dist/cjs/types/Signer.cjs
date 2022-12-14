'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isSigner = input => {
  return typeof input === 'object' && 'publicKey' in input && ('secretKey' in input || 'signTransaction' in input);
};
const isKeypairSigner = input => {
  return isSigner(input) && 'secretKey' in input && input.secretKey != null;
};
const isIdentitySigner = input => {
  return isSigner(input) && !isKeypairSigner(input);
};
const getSignerHistogram = signers => signers.reduce((signers, signer) => {
  var _signers$all$duplicat;

  const duplicateIndex = signers.all.findIndex(({
    publicKey
  }) => publicKey.equals(signer.publicKey));
  const duplicate = (_signers$all$duplicat = signers.all[duplicateIndex]) !== null && _signers$all$duplicat !== void 0 ? _signers$all$duplicat : null;
  const duplicateIsIdentity = duplicate ? isIdentitySigner(duplicate) : false;
  const signerIsIdentity = isIdentitySigner(signer);

  if (!duplicate) {
    signers.all.push(signer);
    signerIsIdentity ? signers.identities.push(signer) : signers.keypairs.push(signer);
  } else if (duplicateIsIdentity && !signerIsIdentity) {
    // Prefer keypair than identity signer as it requires less user interactions.
    const duplicateIdentitiesIndex = signers.identities.findIndex(({
      publicKey
    }) => publicKey.equals(signer.publicKey));
    signers.all.splice(duplicateIndex, 1);
    signers.identities.splice(duplicateIdentitiesIndex, 1);
    signers.all.push(signer);
    signers.keypairs.push(signer);
  }

  return signers;
}, {
  all: [],
  keypairs: [],
  identities: []
});

exports.getSignerHistogram = getSignerHistogram;
exports.isIdentitySigner = isIdentitySigner;
exports.isKeypairSigner = isKeypairSigner;
exports.isSigner = isSigner;
//# sourceMappingURL=Signer.cjs.map
