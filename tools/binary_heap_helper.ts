export default class BinaryHeapHelper {

    /*
    * Gets the parent index of an item in a zero indexed binary heap.
    * @param {Number} itemIndex
    * @returns {Number} the parent index
    */
    static binaryParent(itemIndex) {
        return Math.floor((itemIndex - 1) / 2);
    }

    /*
     * Moves an itemKey up a binary heap based on its itemValue.
     * @param {Array} binaryHeap
     * @param {Number} itemKey
     * @param {Array} itemValues
     */

    static bubbleUp(binaryHeap, itemKey, itemValues) {
        var itemIndex = binaryHeap.lastIndexOf(itemKey);
        if (itemIndex === 0) {
            return;
        }
        var parentIndex = BinaryHeapHelper.binaryParent(itemIndex);
        var parentKey = binaryHeap[parentIndex];
        var itemValue = itemValues[itemKey];
        var parentValue = itemValues[parentKey];
        while (itemValue < parentValue) {
            if (itemIndex === 0) {
                break;
            }
            binaryHeap[itemIndex] = parentKey;
            binaryHeap[parentIndex] = itemKey;
            itemIndex = parentIndex;
            parentIndex = this.binaryParent(itemIndex);
            parentKey = binaryHeap[parentIndex];
            parentValue = itemValues[parentKey];
        }
    }

    /*
     * Inserts an item into a binary tree and positions it based on its value.
     * @param {Array} binaryHeap
     * @param {Number} itemKey
     * @param {Array} itemValues
     */
    public static insert(binaryHeap, itemKey, itemValues) {
        binaryHeap.push(itemKey);
        BinaryHeapHelper.bubbleUp(binaryHeap, itemKey, itemValues);
    }

    /* 
     * Removes the item with the lowest value from a binary heap, and return that item to the caller.
     * @param {Array} binaryHeap
     * @param {Array} itemValues
     * @return {Number} item
     */
    public static extractMin(binaryHeap, itemValues) {

        function binaryFirstChild(itemIndex) {
            return itemIndex * 2 + 1;
        }

        if (binaryHeap.length === 1) {
            return binaryHeap.pop();
        }

        // save the contents of the root
        var originalRoot = binaryHeap[0];

        // move the last leaf's content into the root
        binaryHeap[0] = binaryHeap.pop();

        // bubble down until the heap property holds
        var parentIndex = 0;

        var parentKey = binaryHeap[parentIndex];
        var parentValue = itemValues[parentKey];

        var firstChildIndex = binaryFirstChild(parentIndex);
        var firstChildKey = binaryHeap[firstChildIndex];
        var firstChildValue = itemValues[firstChildKey];

        var secondChildIndex = firstChildIndex + 1;
        var secondChildKey = binaryHeap[secondChildIndex];
        var secondChildValue = itemValues[secondChildKey];

        function doSwapSecond(first, second, parent) {
            return second !== undefined
                && second <= first
                && second < parent;
        }

        function doSwapFirst(first, second, parent) {
            return (second === undefined || (first <= second))
                && first < parent;
        }

        function isHeap(first, second, parent) {
            return (first === undefined) // no children
                || (second === undefined && parent <= first) // one child
                || (second !== undefined && parent <= first && parent <= second); // two children
        }

        while (!isHeap(firstChildValue, secondChildValue, parentValue)) {

            parentKey = binaryHeap[parentIndex];
            parentValue = itemValues[parentKey];

            firstChildIndex = binaryFirstChild(parentIndex);
            firstChildKey = binaryHeap[firstChildIndex];
            firstChildValue = itemValues[firstChildKey];

            secondChildIndex = firstChildIndex + 1;
            secondChildKey = binaryHeap[secondChildIndex];
            secondChildValue = itemValues[secondChildKey];

            if (doSwapSecond(firstChildValue, secondChildValue, parentValue)) {
                binaryHeap[parentIndex] = secondChildKey;
                binaryHeap[secondChildIndex] = parentKey;
                parentIndex = secondChildIndex;
            }

            if (doSwapFirst(firstChildValue, secondChildValue, parentValue)) {
                binaryHeap[parentIndex] = firstChildKey;
                binaryHeap[firstChildIndex] = parentKey;
                parentIndex = firstChildIndex;
            }
        }

        // return the original root to the caller
        return originalRoot;
    }

    /* 
     * Moves an item into the appropriate location in a binary tree, based on its value.
     * @param {Array} binaryHeap
     * @param {Number} itemKey
     * @param {Array} itemValues
     */
    public static decreaseKey(binaryHeap, itemKey, itemValues) {
        BinaryHeapHelper.bubbleUp(binaryHeap, itemKey, itemValues);
    }
}