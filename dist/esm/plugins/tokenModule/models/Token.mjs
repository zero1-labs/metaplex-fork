import { findAssociatedTokenAccountPda } from '../pdas.mjs';
import assert from '../../../utils/assert.mjs';
import { token, amount } from '../../../types/Amount.mjs';

/** @group Model Helpers */
const isToken = value => typeof value === 'object' && value.model === 'token';
/** @group Model Helpers */

function assertToken(value) {
  assert(isToken(value), `Expected Token model`);
}
/** @group Model Helpers */

const toToken = account => {
  const associatedTokenAddress = findAssociatedTokenAccountPda(account.data.mint, account.data.owner);
  const isAssociatedToken = associatedTokenAddress.equals(account.publicKey);
  return {
    model: 'token',
    address: isAssociatedToken ? associatedTokenAddress : account.publicKey,
    isAssociatedToken,
    mintAddress: account.data.mint,
    ownerAddress: account.data.owner,
    amount: token(account.data.amount.toString()),
    closeAuthorityAddress: account.data.closeAuthorityOption ? account.data.closeAuthority : null,
    delegateAddress: account.data.delegateOption ? account.data.delegate : null,
    delegateAmount: token(account.data.delegatedAmount.toString()),
    state: account.data.state
  };
};
/** @group Models */

/** @group Model Helpers */
const isTokenWithMint = value => typeof value === 'object' && value.model === 'tokenWithMint';
/** @group Model Helpers */

function assertTokenWithMint(value) {
  assert(isTokenWithMint(value), `Expected TokenWithMint model`);
}
/** @group Model Helpers */

const toTokenWithMint = (tokenAccount, mintModel) => {
  const token = toToken(tokenAccount);
  return { ...token,
    model: 'tokenWithMint',
    mint: mintModel,
    amount: amount(token.amount.basisPoints, mintModel.currency),
    delegateAmount: amount(token.delegateAmount.basisPoints, mintModel.currency)
  };
};

export { assertToken, assertTokenWithMint, isToken, isTokenWithMint, toToken, toTokenWithMint };
//# sourceMappingURL=Token.mjs.map
