'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var CandyMachine = require('../models/CandyMachine.cjs');
var pdas = require('../pdas.cjs');
var program = require('../program.cjs');
var common = require('../../../utils/common.cjs');
var Operation = require('../../../types/Operation.cjs');
var SdkError = require('../../../errors/SdkError.cjs');

// Operation
// -----------------

const Key = 'FindCandyMachinesByPublicKeyOperation';
/**
 * Find all Candy Machines matching by a given `publicKey` or a given `type`.
 *
 * The following two types are supported.
 *
 * `authority`: Find Candy Machines whose authority is the given `publicKey`.
 * ```ts
 * const someAuthority = new PublicKey('...');
 * const candyMachines = await metaplex
 *   .candyMachines()
 *   .findAllBy({ type: 'authority', someAuthority });
 *   .run();
 * ```
 *
 * `wallet`: Find Candy Machines whose wallet address is the given `publicKey`.
 * ```ts
 * const someWallet = new PublicKey('...');
 * const candyMachines = await metaplex
 *   .candyMachines()
 *   .findAllBy({ type: 'wallet', someWallet });
 *   .run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const findCandyMachinesByPublicKeyFieldOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findCandyMachinesByPublicKeyFieldOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      type,
      publicKey,
      commitment
    } = operation.input;
    const accounts$1 = program.CandyMachineProgram.accounts(metaplex).mergeConfig({
      commitment
    });
    let candyMachineQuery;

    switch (type) {
      case 'authority':
        candyMachineQuery = accounts$1.candyMachineAccountsForAuthority(publicKey);
        break;

      case 'wallet':
        candyMachineQuery = accounts$1.candyMachineAccountsForWallet(publicKey);
        break;

      default:
        throw new SdkError.UnreachableCaseError(type);
    }

    const unparsedAccounts = await candyMachineQuery.get();
    scope.throwIfCanceled();
    const collectionPdas = unparsedAccounts.map(unparsedAccount => pdas.findCandyMachineCollectionPda(unparsedAccount.publicKey));
    const unparsedCollectionAccounts = await metaplex.rpc().getMultipleAccounts(collectionPdas, commitment);
    scope.throwIfCanceled();
    return common.zipMap(unparsedAccounts, unparsedCollectionAccounts, (unparsedAccount, unparsedCollectionAccount) => {
      const account = accounts.parseCandyMachineAccount(unparsedAccount);
      const collectionAccount = unparsedCollectionAccount ? accounts.parseCandyMachineCollectionAccount(unparsedCollectionAccount) : null;
      return CandyMachine.toCandyMachine(account, unparsedAccount, collectionAccount);
    });
  }
};

exports.findCandyMachinesByPublicKeyFieldOperation = findCandyMachinesByPublicKeyFieldOperation;
exports.findCandyMachinesByPublicKeyFieldOperationHandler = findCandyMachinesByPublicKeyFieldOperationHandler;
//# sourceMappingURL=findCandyMachinesByPublicKeyField.cjs.map
