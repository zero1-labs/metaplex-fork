'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var splToken = require('@solana/spl-token');
var web3_js = require('@solana/web3.js');
var program = require('../program.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'CreateMintOperation';
/**
 * Creates a new mint account.
 *
 * ```ts
 * const { mint } = await metaplex.tokens().createMint().run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */

const createMintOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const createMintOperationHandler = {
  async handle(operation, metaplex, scope) {
    const builder = await createMintBuilder(metaplex, operation.input);
    scope.throwIfCanceled();
    const output = await builder.sendAndConfirm(metaplex, operation.input.confirmOptions);
    scope.throwIfCanceled();
    const mint = await metaplex.tokens().findMintByAddress({
      address: output.mintSigner.publicKey
    }).run(scope);
    return { ...output,
      mint
    };
  }

}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * Creates a new mint account.
 *
 * ```ts
 * const transactionBuilder = await metaplex.tokens().builders().createMint();
 * ```
 *
 * @group Transaction Builders
 * @category Constructors
 */
const createMintBuilder = async (metaplex, params) => {
  var _params$createAccount, _params$initializeMin;

  const {
    decimals = 0,
    mint = web3_js.Keypair.generate(),
    payer = metaplex.identity(),
    mintAuthority = metaplex.identity().publicKey,
    freezeAuthority = mintAuthority,
    tokenProgram = program.TokenProgram.publicKey
  } = params;
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer).setContext({
    mintSigner: mint
  }) // Create an empty account for the mint.
  .add(await metaplex.system().builders().createAccount({
    payer,
    newAccount: mint,
    space: splToken.MINT_SIZE,
    program: tokenProgram,
    instructionKey: (_params$createAccount = params.createAccountInstructionKey) !== null && _params$createAccount !== void 0 ? _params$createAccount : 'createAccount'
  })) // Initialize the mint.
  .add({
    instruction: splToken.createInitializeMintInstruction(mint.publicKey, decimals, mintAuthority, freezeAuthority, tokenProgram),
    signers: [mint],
    key: (_params$initializeMin = params.initializeMintInstructionKey) !== null && _params$initializeMin !== void 0 ? _params$initializeMin : 'initializeMint'
  });
};

exports.createMintBuilder = createMintBuilder;
exports.createMintOperation = createMintOperation;
exports.createMintOperationHandler = createMintOperationHandler;
//# sourceMappingURL=createMint.cjs.map
