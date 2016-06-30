export default class SelectionSort {
    // @author Shaun Luttin
    public static selectionSort(array) {
        for (var i = 0; i < array.length; ++i) {
            var indexOfSmallestItem = i;
            for (var j = i + 1; j < array.length; ++j) {
                if (array[j] < array[indexOfSmallestItem]) {
                    indexOfSmallestItem = j;
                }
            }

            // sometimes this will be a glorified no-op.
            var currentItem = array[i];
            var smallestItem = array[indexOfSmallestItem];

            array[i] = smallestItem;
            array[indexOfSmallestItem] = currentItem;
        }

        return array;
    }

    public static test() {
        var initialArray = [2, 4, 6, 8, 0, 5, 2, 5, 7, 8, 4, 7, 9];
        var solutionArray = [0, 2, 2, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9];

        var sortedArray = SelectionSort.selectionSort(initialArray);

        var passed = JSON.stringify(sortedArray) == JSON.stringify(solutionArray);
        console.log("selectionSort:" + passed);
    }
}