export default class MergeSortLoop
{
    public static mergeSort(array, firstIndex, lastIndex) {
        // base case
        if (firstIndex >= lastIndex) return;

        var midpoint = Math.floor((firstIndex + lastIndex) / 2);

        MergeSortLoop.mergeSort(array, firstIndex, midpoint);
        MergeSortLoop.mergeSort(array, midpoint + 1, lastIndex);

        return MergeSortLoop.merge(array, firstIndex, midpoint, lastIndex);
    }

    public static merge(array, firstIndex, midpoint, lastIndex) {
        var leftCopy = array.slice(firstIndex, midpoint + 1).concat([Number.MAX_VALUE]);
        var rightCopy = array.slice(midpoint + 1, lastIndex + 1).concat([Number.MAX_VALUE]);

        var i = 0;
        var j = 0;

        for (var k = firstIndex; k <= lastIndex; ++k) {
            var nextLeft = leftCopy[i];
            var nextRight = rightCopy[j];

            if (nextLeft <= nextRight) {
                array[k] = nextLeft;
                ++i;
            }
            else {
                array[k] = nextRight;
                ++j;
            }
        }

        return array;
    }

    public static test() {

        var initialArray = [2, 4, 6, 8, 0, 5, 2, 5, 7, 8, 4, 7, 9];
        var solutionArray = [0, 2, 2, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9];

        var sortedArray = MergeSortLoop.mergeSort(initialArray, 0, initialArray.length - 1);

        var passed = JSON.stringify(sortedArray) == JSON.stringify(solutionArray);
        console.log('mergeSort:' + passed);
    }
}