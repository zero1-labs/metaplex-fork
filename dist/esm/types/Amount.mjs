import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import BN from 'bn.js';
import { toBigNumber } from './BigNumber.mjs';
import { UnexpectedCurrencyError, CurrencyMismatchError } from '../errors/SdkError.mjs';

/** @group Constants */
const SOL = {
  symbol: 'SOL',
  decimals: 9
};

/** @group Constants */
const USD = {
  symbol: 'USD',
  decimals: 2
};
const amount = (basisPoints, currency) => {
  return {
    basisPoints: toBigNumber(basisPoints),
    currency
  };
};
const lamports = lamports => {
  return amount(lamports, SOL);
};
const sol = sol => {
  return lamports(sol * LAMPORTS_PER_SOL);
};
const usd = usd => {
  return amount(usd * 100, USD);
};
const token = (amount, decimals = 0, symbol = 'Token') => {
  if (typeof amount !== 'number') {
    amount = toBigNumber(amount).toNumber();
  }

  return {
    basisPoints: toBigNumber(amount * Math.pow(10, decimals)),
    currency: {
      symbol,
      decimals,
      namespace: 'spl-token'
    }
  };
};
const isSol = currencyOrAmount => {
  return sameCurrencies(currencyOrAmount, SOL);
};
const sameAmounts = (left, right) => {
  return sameCurrencies(left, right) && left.basisPoints.eq(right.basisPoints);
};
const sameCurrencies = (left, right) => {
  if ('currency' in left) {
    left = left.currency;
  }

  if ('currency' in right) {
    right = right.currency;
  }

  return left.symbol === right.symbol && left.decimals === right.decimals && left.namespace === right.namespace;
};
function assertCurrency(actual, expected) {
  if ('currency' in actual) {
    actual = actual.currency;
  }

  if (!sameCurrencies(actual, expected)) {
    throw new UnexpectedCurrencyError(actual, expected);
  }
}
function assertSol(actual) {
  assertCurrency(actual, SOL);
}
function assertSameCurrencies(left, right, operation) {
  if ('currency' in left) {
    left = left.currency;
  }

  if ('currency' in right) {
    right = right.currency;
  }

  if (!sameCurrencies(left, right)) {
    throw new CurrencyMismatchError(left, right, operation);
  }
}
const addAmounts = (left, right) => {
  assertSameCurrencies(left, right, 'add');
  return amount(left.basisPoints.add(right.basisPoints), left.currency);
};
const subtractAmounts = (left, right) => {
  assertSameCurrencies(left, right, 'subtract');
  return amount(left.basisPoints.sub(right.basisPoints), left.currency);
};
const multiplyAmount = (left, multiplier) => {
  return amount(left.basisPoints.muln(multiplier), left.currency);
};
const divideAmount = (left, divisor) => {
  return amount(left.basisPoints.divn(divisor), left.currency);
};
const compareAmounts = (left, right) => {
  assertSameCurrencies(left, right, 'compare');
  return left.basisPoints.cmp(right.basisPoints);
};
const isEqualToAmount = (left, right) => compareAmounts(left, right) === 0;
const isLessThanAmount = (left, right) => compareAmounts(left, right) < 0;
const isLessThanOrEqualToAmount = (left, right) => compareAmounts(left, right) <= 0;
const isGreaterThanAmount = (left, right) => compareAmounts(left, right) > 0;
const isGreaterThanOrEqualToAmount = (left, right) => compareAmounts(left, right) >= 0;
const isZeroAmount = value => compareAmounts(value, amount(0, value.currency)) === 0;
const isPositiveAmount = value => compareAmounts(value, amount(0, value.currency)) >= 0;
const isNegativeAmount = value => compareAmounts(value, amount(0, value.currency)) < 0;
const formatAmount = value => {
  if (value.currency.decimals === 0) {
    return `${value.currency.symbol} ${value.basisPoints.toString()}`;
  }

  const power = new BN(10).pow(new BN(value.currency.decimals));
  const basisPoints = value.basisPoints;
  const {
    div,
    mod
  } = basisPoints.divmod(power);
  const units = `${div.toString()}.${mod.abs().toString(10, value.currency.decimals)}`;
  return `${value.currency.symbol} ${units}`;
};

export { SOL, USD, addAmounts, amount, assertCurrency, assertSameCurrencies, assertSol, compareAmounts, divideAmount, formatAmount, isEqualToAmount, isGreaterThanAmount, isGreaterThanOrEqualToAmount, isLessThanAmount, isLessThanOrEqualToAmount, isNegativeAmount, isPositiveAmount, isSol, isZeroAmount, lamports, multiplyAmount, sameAmounts, sameCurrencies, sol, subtractAmounts, token, usd };
//# sourceMappingURL=Amount.mjs.map
