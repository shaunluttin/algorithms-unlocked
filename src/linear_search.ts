import Constants from "./constants";

// page 13
// the best search
// if we know nothing about the order of the array
// O(n)
export default class LinearSearch {

    // A: an array 
    // n: the number of elements in A to search through
    // x: the value being searched for
    // returns either an index i for which A[i] equals x, 
    // or the special value NOT-FOUND (which we represent with -1)
    public static linearSearch(A: Array<string>, n: number, x: string) {
        let answer: number = Constants.NotFound;
        for (let i = 0; i < n; i += 1) {
            let current = A[i];
            if (current === x) {
                answer = i;
            }
        }

        return answer;
    }

    // this has a better best case,
    // because it returns early
    public static betterLinearSearch(A: Array<string>, n: number, x: string) {
        for (let i = 0; i < n; i += 1) {
            let current = A[i];
            if (current === x) {
                return i;
            }
        }

        return Constants.NotFound;
    }

    // A: an array 
    // n: the number of elements in A to search through
    // x: the value being searched for
    // i: the starting index in the array 
    // returns either an index i for which A[i] equals x, 
    // or the special value NOT-FOUND (which we represent with -1)
    public static recursiveLinearSearch(A: Array<string>, n: number, x: string, i: number) {

        // loop-invarient:
        // if x is present in the array,
        // then it is present in the sub array

        // contra-positive
        // if x is not present in the sub array
        // then it is not present in the array

        // base case
        if (i === n) {
            // the sub array is of length zero
            return Constants.NotFound;
        } else {
            // the sub array is of length n - i 
            if (A[i] === x) {
                return i;
            } else {
                return this.recursiveLinearSearch(A, n, x, i + 1); 
            }
        }
    }

    // this return early AND has a better constant, 
    // because it only does one comparison per iteration
    public static sentinalLinearSearch(A: Array<string>, n: number, x: string) {
        // set the sentinal
        let last: string = A[n];
        A[n] = x;

        // search until we've found x
        let i = 0;
        while (A[i] !== x) {
            i += 1;
        }

        // restore the last value 
        // and return the answer
        A[n] = last;
        if (i < n || A[n] === x) {
            return i;
        } else {
            return Constants.NotFound;
        }
    }

    public static test() {

        let A: Array<string> = [
            "Ishmal",
            "Starbuck",
            "Flask",
            "Ahab",
            "Stubb",
            "Quequag",
            "Tashtago",
        ];

        let passed =
            LinearSearch.linearSearch(A, A.length, "Ahab") === 3 &&
            LinearSearch.linearSearch(A, A.length, "Tashtago") === 6 &&
            LinearSearch.linearSearch(A, A.length, "Moby") === Constants.NotFound &&

            LinearSearch.betterLinearSearch(A, A.length, "Ahab") === 3 &&
            LinearSearch.betterLinearSearch(A, A.length, "Tashtago") === 6 &&
            LinearSearch.betterLinearSearch(A, A.length, "Moby") === Constants.NotFound &&

            LinearSearch.sentinalLinearSearch(A, A.length, "Ahab") === 3 &&
            LinearSearch.sentinalLinearSearch(A, A.length, "Tashtago") === 6 &&
            LinearSearch.sentinalLinearSearch(A, A.length, "Dick") === Constants.NotFound &&

            LinearSearch.recursiveLinearSearch(A, A.length, "Ahab", 0) === 3 &&
            LinearSearch.recursiveLinearSearch(A, A.length, "Tashtago", 0) === 6 &&
            LinearSearch.recursiveLinearSearch(A, A.length, "Moby", 0) === Constants.NotFound;

        console.log("LinearSearch:" + passed);
    }
}

LinearSearch.test();
