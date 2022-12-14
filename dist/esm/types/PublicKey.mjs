import { PublicKey } from '@solana/web3.js';

const toPublicKey = value => {
  if (typeof value === 'object' && 'publicKey' in value) {
    return value.publicKey;
  }

  if (typeof value === 'object' && 'address' in value) {
    return value.address;
  }

  return new PublicKey(value);
};

export { toPublicKey };
//# sourceMappingURL=PublicKey.mjs.map
