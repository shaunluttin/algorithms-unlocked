// remove the item with the lowest value from a binary heap,
// and return that item to the caller.
// make sure that the heap property holds;
// ie, the key of each node is <= the keys of its children.
function extractMin(Q, getItemValue) {

    "use strict";

    function binaryFirstChild(itemIndex) {
        return itemIndex * 2 + 1;
    }

    if (Q.length === 1) {
        return Q.pop();
    }

    // save the contents of the root
    var originalRoot = Q[0];

    // move the last leaf's content into the root
    Q[0] = Q.pop();

    // bubble down until the heap property holds
    var parentIndex = 0;

    var parentKey = Q[parentIndex];
    var parentValue = getItemValue(parentKey);

    var firstChildIndex = binaryFirstChild(parentIndex);
    var firstChildKey = Q[firstChildIndex];
    var firstChildValue = getItemValue(firstChildKey);

    var secondChildIndex = firstChildIndex + 1;
    var secondChildKey = Q[secondChildIndex];
    var secondChildValue = getItemValue(secondChildKey);

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

        parentKey = Q[parentIndex];
        parentValue = getItemValue(parentKey);

        firstChildIndex = binaryFirstChild(parentIndex);
        firstChildKey = Q[firstChildIndex];
        firstChildValue = getItemValue(firstChildKey);

        secondChildIndex = firstChildIndex + 1;
        secondChildKey = Q[secondChildIndex];
        secondChildValue = getItemValue(secondChildKey);

        if (doSwapSecond(firstChildValue, secondChildValue, parentValue)) {
            Q[parentIndex] = secondChildKey;
            Q[secondChildIndex] = parentKey;
            parentIndex = secondChildIndex;
        }

        if (doSwapFirst(firstChildValue, secondChildValue, parentValue)) {
            Q[parentIndex] = firstChildKey;
            Q[firstChildIndex] = parentKey;
            parentIndex = firstChildIndex;
        }
    }

    // return the original root to the caller
    return originalRoot;
}

function test() {
    "use strict";
    var binaryTree = [0, 0, 2, 7, 5, 2, 3, 9, 8, 6, 6, 17, 3, 9];

    var min = 0;
    var prevMin = -1;
    while (binaryTree.length > 0) {
        min = extractMin(binaryTree, passThruValue);
        console.log(`${min} >= ${prevMin} ${(min >= prevMin)}`);
        prevMin = min;
    }
}

test();

