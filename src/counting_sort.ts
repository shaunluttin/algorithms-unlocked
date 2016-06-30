import ArrayHelper from './tools/array_helper';

export default class CountingSort
{
    public static rearrange(array, less, length) {
        var result = ArrayHelper.fillArray(0, length);

        var next = less.map(function (item, index) {
            return less[index];
        });

        array.forEach(function (key) {
            var nextIndexForKey = next[key];
            result[nextIndexForKey] = key;
            next[key] = next[key] + 1;
        });

        return result;
    }

    public static countKeysLess(equal, range) {
        var less = ArrayHelper.fillArray(0, range + 1);
        less.forEach(function (item, index) {
            if (index === 0) {
                return;
            }

            less[index] = less[index - 1] + equal[index - 1];
        });

        return less;
    }

    // array: an array of integers inclusively between 0 and `range`.
    // length: the number of elements in `array`.
    // range: the highest value in `array`.
    // returns an array in which each index represents a value from `array`
    // and each value indicates the frequency of that value in `array`.
    public static countKeysEqual(array, length, range) {
        var equal = ArrayHelper.fillArray(0, range + 1);
        array.forEach(function (item) {
            var key = item;
            equal[key] = equal[key] + 1;
        });

        return equal;
    }

    public static countingSort(array, length, range) {
        var equal = CountingSort.countKeysEqual(array, length, range);
        var less = CountingSort.countKeysLess(equal, range);
        return CountingSort.rearrange(array, less, length);
    }

    public static test() {
        var initialArray = [2, 4, 6, 8, 0, 5, 2, 5, 7, 8, 4, 7, 9];

        var equalExpected = [1, 0, 2, 0, 2, 2, 1, 2, 2, 1];
        var equalActual = CountingSort.countKeysEqual(initialArray, initialArray.length, Math.max(...initialArray));
        var passed01 = JSON.stringify(equalExpected) === JSON.stringify(equalActual);
        console.log('countKeysEqual:' + passed01);

        var lessExpected = [0, 1, 1, 3, 3, 5, 7, 8, 10, 12];
        var lessActual = CountingSort.countKeysLess(equalActual, Math.max(...initialArray));
        var passed02 = JSON.stringify(lessExpected) === JSON.stringify(lessActual);
        console.log('countKeysLess:' + passed02);

        var sortedExpected = [0, 2, 2, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9];
        var sortedActual = CountingSort.countingSort(initialArray, initialArray.length, Math.max(...initialArray));
        var passed = JSON.stringify(sortedActual) === JSON.stringify(sortedExpected);
        console.log('countingSort:' + passed);
    }
}