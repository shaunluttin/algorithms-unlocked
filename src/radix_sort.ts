import ArrayHelper from './tools/array_helper';

{
    function rearrange(array, less, length, digit) {
        var result: Array<number> = ArrayHelper.fillArray(0, length);
        var next = less.map(function (item, index) {
            return less[index];
        });

        array.forEach(function (item) {

            var asString = String(item);
            var theDigit = asString.charAt(asString.length - 1 - digit);
            var asNum = Number(theDigit);
            var key = asNum;

            var nextIndexForKey = next[key];
            result[nextIndexForKey] = item;
            next[key] = next[key] + 1;
        });

        return result;
    }

    function countKeysLess(equal, range) {
        var less: Array<number> = ArrayHelper.fillArray(0, range + 1);

        less.forEach(function (item, index) {
            if (index === 0) {
                return;
            }

            less[index] = less[index - 1] + equal[index - 1];
        });

        return less;
    }

    function countKeysEqual(array, length, range, digit) {
        let equal: Array<number> = ArrayHelper.fillArray(0, range + 1);

        array.forEach(function (item) {

            var asString = String(item);
            var theDigit = asString.charAt(asString.length - 1 - digit);
            var asNum = Number(theDigit);

            var key = asNum;
            equal[key] = equal[key] + 1;
        });

        return equal;
    }

    function countingSort(array, length, range, digit) {
        var equal = countKeysEqual(array, length, range, digit);
        var less = countKeysLess(equal, range);
        return rearrange(array, less, length, digit);
    }

    function radixSort(array, base, digits) {
        var result = array;

        var i = 0;
        while (i < digits) {
            result = countingSort(result, array.length, base, i);
            i = i + 1;
        }

        return result;
    }

    function test() {
        var initialArray = [102, 414, 326, 348, 210, 425, 562, 905, 317, 228, 444, 57];
        var sortedExpected = [57, 102, 210, 228, 317, 326, 348, 414, 425, 444, 562, 905];

        var sortedActual = radixSort(initialArray, 10, 3);

        var passed = JSON.stringify(sortedActual) === JSON.stringify(sortedExpected);
        console.log('radixSort:' + passed);
    }

    test();
}