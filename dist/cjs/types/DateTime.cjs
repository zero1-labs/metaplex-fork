'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var BN = require('bn.js');
var assert = require('../utils/assert.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BN__default = /*#__PURE__*/_interopDefaultLegacy(BN);

const toDateTime = value => {
  if (typeof value === 'string' || isDateObject(value)) {
    const date = new Date(value);
    const timestamp = Math.floor(date.getTime() / 1000);
    return new BN__default["default"](timestamp);
  }

  return new BN__default["default"](value);
};
const now = () => toDateTime(new Date());
const toOptionDateTime = value => {
  return value === null ? null : toDateTime(value);
};
const isDateTime = value => {
  return (value === null || value === void 0 ? void 0 : value.__opaque__) === 'DateTime';
};
function assertDateTime(value) {
  assert["default"](isDateTime(value), 'Expected DateTime type');
}

const isDateObject = value => {
  return Object.prototype.toString.call(value) === '[object Date]';
};

const formatDateTime = (value, // @ts-ignore
locales = 'en-US', // @ts-ignore
options = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}) => {
  const date = new Date(value.toNumber() * 1000);
  return date.toLocaleDateString(locales, options);
};

exports.assertDateTime = assertDateTime;
exports.formatDateTime = formatDateTime;
exports.isDateTime = isDateTime;
exports.now = now;
exports.toDateTime = toDateTime;
exports.toOptionDateTime = toOptionDateTime;
//# sourceMappingURL=DateTime.cjs.map
