import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { CandyMachine } from '../models/CandyMachine';
declare const Key: "FindCandyMachineByAddressOperation";
/**
 * Find an existing Candy Machine by its address.
 *
 * ```ts
 * const candyMachine = await metaplex.candyMachines().findbyAddress({ address }).run();
 * ```
 *
 * @group Operations
 * @category Constructors
 */
export declare const findCandyMachineByAddressOperation: import("../../../types").OperationConstructor<FindCandyMachineByAddressOperation, "FindCandyMachineByAddressOperation", FindCandyMachineByAddressInput, CandyMachine>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindCandyMachineByAddressOperation = Operation<typeof Key, FindCandyMachineByAddressInput, CandyMachine>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindCandyMachineByAddressInput = {
    /** The Candy Machine address. */
    address: PublicKey;
    /** The level of commitment desired when querying the blockchain. */
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const findCandyMachineByAddressOperationHandler: OperationHandler<FindCandyMachineByAddressOperation>;
export {};
