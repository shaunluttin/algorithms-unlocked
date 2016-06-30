import ArrayHelper from './tools/array_helper';

{
    function rearrange(array, less, length) {
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

    function countKeysLess(equal, range) {
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
    function countKeysEqual(array, length, range) {
        var equal = ArrayHelper.fillArray(0, range + 1);
        array.forEach(function (item) {
            var key = item;
            equal[key] = equal[key] + 1;
        });

        return equal;
    }

    function countingSort(array, length, range) {
        var equal = countKeysEqual(array, length, range);
        var less = countKeysLess(equal, range);
        return rearrange(array, less, length);
    }

    //test
    var initialArray = [2, 4, 6, 8, 0, 5, 2, 5, 7, 8, 4, 7, 9];

    var equalExpected = [1, 0, 2, 0, 2, 2, 1, 2, 2, 1];
    var equalActual = countKeysEqual(initialArray, initialArray.length, Math.max(...initialArray));

    var passed01 = JSON.stringify(equalExpected) === JSON.stringify(equalActual);
    console.log(equalExpected);
    console.log(equalActual);
    console.log('passed countKeysEqual:' + passed01);

    var lessExpected = [0, 1, 1, 3, 3, 5, 7, 8, 10, 12];
    var lessActual = countKeysLess(equalActual, Math.max(...initialArray));

    var passed02 = JSON.stringify(lessExpected) === JSON.stringify(lessActual);
    console.log(lessExpected);
    console.log(lessActual);
    console.log('passed countKeysLess:' + passed02);

    var sortedExpected = [0, 2, 2, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9];
    var sortedActual = countingSort(initialArray, initialArray.length, Math.max(...initialArray));

    var passed = JSON.stringify(sortedActual) === JSON.stringify(sortedExpected);
    console.log(sortedExpected);
    console.log(sortedActual);
    console.log('passed sortedExpected:' + passed);

}