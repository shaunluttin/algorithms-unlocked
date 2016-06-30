"use strict";
var binary_heap_helper_1 = require('./tools/binary_heap_helper');
{
    function heapSort(A, n) {
        // 
        // step 1
        // 
        var Q = [];
        A.forEach(function (item, index) {
            binary_heap_helper_1.default.insert(Q, item);
        });
        //
        // step 2
        // 
        var B = [];
        // 
        // step 3
        // 
        var index = 0;
        while (index < n) {
            var min = binary_heap_helper_1.default.extractMinValue(Q);
            B.push(min);
            index += 1;
        }
        return B;
    }
    //
    // test
    //
    var A = [1, 7, 43, 8, 9, 0, 3, 4, 5, 6, 8, 3, 6, 7, 8, 9, 4];
    var n = 10;
    var expected = A.sort(function (n1, n2) { return n1 - n2; }).slice(0, n);
    var actual_1 = heapSort(A, n);
    console.log('expected: ' + expected);
    console.log('actual: ' + actual_1);
    console.log(actual_1.length === expected.length);
    expected.forEach(function (item, index) {
        console.log(item === actual_1[index]);
    });
}
//# sourceMappingURL=heap_sort.js.map