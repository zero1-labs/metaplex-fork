import BN from 'bn.js';
import assert from '../utils/assert.mjs';

const toBigNumber = (value, endian) => {
  return new BN(value, endian);
};
const toOptionBigNumber = value => {
  return value === null ? null : toBigNumber(value);
};
const isBigNumber = value => {
  return (value === null || value === void 0 ? void 0 : value.__opaque__) === 'BigNumber';
};
function assertBigNumber(value) {
  assert(isBigNumber(value), 'Expected BigNumber type');
}

export { assertBigNumber, isBigNumber, toBigNumber, toOptionBigNumber };
//# sourceMappingURL=BigNumber.mjs.map
