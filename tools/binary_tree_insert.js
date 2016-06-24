// insert an item into a binary tree,
// making sure that the heap property holds;
// ie, the key of each node is <= the keys of its children.
function insert(Q, itemKey, getItemValue) {

    "use strict";

    function binaryParent(itemIndex) {
        return Math.floor((itemIndex - 1) / 2);
    }

    Q.push(itemKey);

    var itemIndex = Q.lastIndexOf(itemKey);
    if (itemIndex === 0) {
        return;
    }

    var parentIndex = binaryParent(itemIndex);
    var parentKey = Q[parentIndex];

    var itemValue = getItemValue(itemKey);
    var parentValue = getItemValue(parentKey);

    while (itemValue < parentValue) {

        if (itemIndex === 0) {
            break;
        }

        Q[itemIndex] = parentKey;
        Q[parentIndex] = itemKey;

        itemIndex = parentIndex;
        parentIndex = binaryParent(itemIndex);

        parentKey = Q[parentIndex];
        parentValue = getItemValue(parentKey);
    }
}

function passThruValue(itemKey) {
    "use strict";
    return itemKey;
}

// test
var keys = [9, 3, 2, 6, 5, 0, 9, 8, 7, 6, 0, 17, 2, 3];

var result = [];
keys.forEach((key) => insert(result, key, passThruValue));

console.log(result);

result.forEach(function (key, index) {

    "use strict";

    var childIndex1 = index * 2 + 1;
    var childIndex2 = childIndex1 + 1;

    var childKey1 = result[childIndex1];
    var childKey2 = result[childIndex2];

    var childValue1 = passThruValue(childKey1);
    var childValue2 = passThruValue(childKey2);
    var parentValue = passThruValue(key);

    if (parentValue > childValue1 || parentValue > childValue2) {
        console.log("fail");
    } else {
        console.log("pass");
    }
});