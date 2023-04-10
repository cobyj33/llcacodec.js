/**
 * @author Jacoby Johnson
 * @file src/common/Set2D.ts
 * @package jsutil
 * @github https://www.github.com/cobyj33/jsutil
 * @description A Set implementation to hold a unique set of 2D vector
 * values that can easily be queried for existence and iterated over
 * @version 0.1.0
 * @date 2023-4-09
 */
/**
 * A Set implementation to quickly and reliably hold a unique set of 2D vector
 * values that can easily be queried for existence and iterated over
 */
export declare class Set2D {
    /**
     * @brief This map internally holds all of the data to query into the Set2D.
     *
     * @summary It consists of a key which represents the first component of a 2-dimensional vector,
     * with a set of number values which represent any second component values associated with the given first component
     */
    private map;
    /**
     * @brief the internally tracked length of the set. Perhaps "size" would have been a better name, but we are stuck with
     * length for now until the next major version bump.
     */
    private _length;
    constructor(values?: Array<[number, number]> | Set2D);
    /**
     * Clear all data within this Set2D instance.
     *
     * @param total An optional parameter on whether to totally clear the allocated internal data
     * structures used in the Set2D or not. Defaults to false. Note that whether this "total" parameter
     * is false or true does not affect this function's purpose: This function will always remove all 2D
     * vectors present in this Set2D instance. However, users can choose whether to reallocate storage containers
     * within the Set2D instance with the "total" parameter
     */
    clear(total?: boolean): void;
    /**
     * @brief The number of unique 2D vectors stored in this Set2D instance
     * This number cannot be set by the user. It is instead changed by the
     * Set2D class internally among additions and removals.
     */
    get length(): number;
    /**
     * @returns An array of 2D tuples in the form {[number, number]} of the unique
     * 2D vectors present in this Set2D instance
     */
    getTuples(): Array<[number, number]>;
    /**
     * Perform a callback function for every vector present in t
     *
     * @note The ordering of the calls to the forEach function should not be assumed and is not
     * guaranteed to stay the same between different versions of jsutil.
     *
     * @param callbackfn The callback function to be performed on each 2D vector in this Set2D instance. The
     * callback function will be passed a 2D vector in the form of {[number, number]}.
     */
    forEach(callbackfn: (curr: [number, number]) => void): void;
    /**
     * Add a 2D vector to this Set2D instance
     *
     * If the given 2D vector is already present in this Set2D instance
     * the vector will NOT be added to the Set2D and the Set2D instance will not change
     *
     * @param first The first component of the 2D vector to add
     * @param second The second component of the 2D vector to add
     */
    add(first: number, second: number): void;
    /**
     * Remove a 2D vector to this Set2D instance
     *
     * If the given 2D vector is not present in this Set2D instance, then
     * the Set2D instance will not change and this function will do nothing
     *
     * @param first The first component of the 2D vector to remove
     * @param second The second component of the 2D vector to remove
     */
    remove(first: number, second: number): void;
    /**
     * Check whether this Set2D instance contains a given 2D vector.
     *
     * @param first The first component of the 2D Vector to check
     * @param second The second component of the 2D Vector to check
     * @returns Whether the given 2D vector is present in this Set2D instance
     */
    has(first: number, second: number): boolean;
    /**
     * Check whether this Set2D instance contains all of the given 2D vectors in a list.
     *
     * @param tuples The 2D vectors to check for existence in this Set2D instance
     * @returns Whether all given 2D vectos are present in this Set2D instance
     */
    hasAll(tuples: Array<[number, number]>): boolean;
    /**
     * Check whether this Set2D instance contains all and ONLY all of the given 2D vectors in a list.
     *
     * @param tuples The 2D vectors to check for existence in this Set2D instance
     * @returns Whether all given 2D vectos are present in this Set2D instance,
     */
    hasAllExact(tuples: Array<[number, number]>): boolean;
    /**
     * Combine this Set2D with other Set2D's and/or 2D vector arrays
     *
     * Similar to the concat function in Javascript Arrays
     *
     * Note that this Set2D instance will NOT be modified by the "combine" function. In order to push 2D vector data and
     * modify this Set2D instance in-place, use the "push" function.
     *
     * @param others Variable arguments. Other Set2D's or 2D vector arrays
     * @returns A new Set2D instance created by combining 2D vectors present in this Set2D instance,
     * given Set2D instances, and given 2D vector arrays
     */
    combine(...others: (Set2D | [number, number])[]): Set2D;
    /**
     * Push 2D vector values into this Set2D instance
     *
     * Similar to the push function in Javascript Arrays
     *
     * Note that this Set2D instance will be modified by pushing data. In order to create a new Set2D instance
     * with combined data without modifying this Set2D instance in-place, use the "combine" function.
     *
     * @param others Variable argument parameter, where other Set2D's or arrays of 2D vectors can be pushed into this Set2D instance.
     * Each given vector is added to this Set2D instance.
     */
    push(...others: (Set2D | [number, number])[]): void;
    /**
     * Iterator integration for "for ... of " syntax
     */
    [Symbol.iterator](): IterableIterator<[number, number]>;
    /**
     * Check whether 2 Set2D instances are equal
     *
     * 2 Set2D instances are considered "equal" if they have the same stored vectors present within
     *
     * @param other The other Set2D instance to check equality with
     * @returns Whether the two Set2D instances are equal according to the stated conditions.
     */
    equals(other: Set2D): boolean;
}
//# sourceMappingURL=set2D.d.ts.map