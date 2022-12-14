import { MintLayout, AccountLayout } from '@solana/spl-token';
import { getAccountParsingFunction, getAccountParsingAndAssertingFunction } from '../../types/Account.mjs';

const mintAccountParser = {
  name: 'MintAccount',
  deserialize: (data, offset) => {
    const span = MintLayout.getSpan(data, offset);
    const decoded = MintLayout.decode(data, offset);
    return [decoded, span];
  }
};
/** @group Accounts */

/** @group Account Helpers */
const parseMintAccount = getAccountParsingFunction(mintAccountParser);
/** @group Account Helpers */

const toMintAccount = getAccountParsingAndAssertingFunction(mintAccountParser);
const tokenAccountParser = {
  name: 'TokenAccount',
  deserialize: (data, offset) => {
    const span = AccountLayout.getSpan(data, offset);
    const decoded = AccountLayout.decode(data, offset);
    return [decoded, span];
  }
};
/** @group Accounts */

/** @group Account Helpers */
const parseTokenAccount = getAccountParsingFunction(tokenAccountParser);
/** @group Account Helpers */

const toTokenAccount = getAccountParsingAndAssertingFunction(tokenAccountParser);

export { parseMintAccount, parseTokenAccount, toMintAccount, toTokenAccount };
//# sourceMappingURL=accounts.mjs.map
