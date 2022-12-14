import { PublicKey } from '@solana/web3.js';
import { OperationUnauthorizedForGuestsError } from '../../errors/SdkError.mjs';

class GuestIdentityDriver {
  constructor(publicKey) {
    this.publicKey = publicKey !== null && publicKey !== void 0 ? publicKey : PublicKey.default;
  }

  async signMessage(_message) {
    throw new OperationUnauthorizedForGuestsError('signMessage');
  }

  async signTransaction(_transaction) {
    throw new OperationUnauthorizedForGuestsError('signTransaction');
  }

  async signAllTransactions(_transactions) {
    throw new OperationUnauthorizedForGuestsError('signAllTransactions');
  }

}

export { GuestIdentityDriver };
//# sourceMappingURL=GuestIdentityDriver.mjs.map
