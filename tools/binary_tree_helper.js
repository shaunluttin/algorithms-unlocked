"use strict";
var BinaryHeapHelper = (function () {
    function BinaryHeapHelper() {
    }
    /*
 * Gets the parent index of an item in a zero indexed binary heap.
 * @param {Number} itemIndex
 * @returns {Number} the parent index
 */
    BinaryHeapHelper.prototype.binaryParent = function (itemIndex) {
        return Math.floor((itemIndex - 1) / 2);
    };
    /*
     * Moves an itemKey up a binary heap based on its itemValue.
     * @param {Array} binaryHeap
     * @param {Number} itemKey
     * @param {Array} itemValues
     */
    BinaryHeapHelper.prototype.bubbleUp = function (binaryHeap, itemKey, itemValues) {
        var itemIndex = binaryHeap.lastIndexOf(itemKey);
        if (itemIndex === 0) {
            return;
        }
        var parentIndex = this.binaryParent(itemIndex);
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
    };
    /*
     * Inserts an item into a binary tree and positions it based on its value.
     * @param {Array} binaryHeap
     * @param {Number} itemKey
     * @param {Array} itemValues
     */
    BinaryHeapHelper.prototype.insert = function (binaryHeap, itemKey, itemValues) {
        binaryHeap.push(itemKey);
        this.bubbleUp(binaryHeap, itemKey, itemValues);
    };
    return BinaryHeapHelper;
}());
exports.BinaryHeapHelper = BinaryHeapHelper;
//# sourceMappingURL=binary_tree_helper.js.map