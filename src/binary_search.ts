import Constants from "./constants";

// page 40
// requires a sorted array
// O(log n)
export default class BinarySearch {

    // A: an array which is lexographically sorted (i.e. English dictionary order)
    // n: the number of elements in A to search through
    // x: the value being searched for
    // returns either an index i for which A[i] equals x, 
    // or the special value NOT-FOUND (which we represent with -1)
    public static binarySearch(A: Array<string>, n: number, x: string) {
        let result: number = Constants.NotFound;

        // loop invariant
        // if x is anywhere in the array
        // then it is somewhere in the subarray A[p..r]

        let p: number = 0;
        let r: number = n;

        while (p <= r) {
            let index: number = Math.floor((p + r) / 2);
            let item: string = A[index];

            if (item === x) {
                return index;
            } else if (x < item) {
                r = index - 1;
            } else {
                p = index + 1;
            }
        }

        return result;
    }

    public static test() {

        let sortedArray: Array<string> = [
            "Ahab",
            "Flask",
            "Ishmael",
            "Starbuck",
            "Stubb",
        ];
        let passed: boolean =
            this.binarySearch(sortedArray, sortedArray.length, "Barbie") === -1 &&
            this.binarySearch(sortedArray, sortedArray.length, "Flask") === 1 &&
            this.binarySearch(sortedArray, sortedArray.length, "Stubb") === 4 &&
            this.binarySearch(sortedArray, sortedArray.length, "Ahab") === 0;

        console.log("BinarySearch:" + passed);
    }
}

BinarySearch.test();
