import BinaryHeapHelper from './tools/binary_heap_helper'

{
    function heapSort(A: Array<number>, n: number) {

        // 
        // step 1
        // 
        let Q: Array<number> = [];
        A.forEach(function (item, index) {
            BinaryHeapHelper.insert(Q, item);
        });

        //
        // step 2
        // 
        let B: Array<number> = [];

        // 
        // step 3
        // 
        var index = 0;
        while (index < n) {
            let min = BinaryHeapHelper.extractMinValue(Q);
            B.push(min);
            index += 1;
        }

        return B;
    }

    function test() {
        let A: Array<number> = [1, 7, 43, 8, 9, 0, 3, 4, 5, 6, 8, 3, 6, 7, 8, 9, 4];
        let n: number = 10;

        let expected = A.sort((n1: number, n2: number) => n1 - n2).slice(0, n);
        let actual = heapSort(A, n);

        console.log('heapSort:' + (actual.length === expected.length));
        expected.forEach(function (item, index) {
            console.log('heapSort:' + (item === actual[index]));
        });
    }

    test();
}