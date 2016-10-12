// page 13

export default class LinearSearch {

    // A: an array 
    // n: the number of elements in A to search through
    // x: the value being searched for
    // returns either an index i for which A[i] equals x, 
    // or the special value NOT-FOUND (which we represent with -1)
    public static linearSearch(A: Array<string>, n: number, x: string) {
        let answer: number = -1;
        for (var i = 0; i <= n; i += 1) {
            var current = A[i];
            if (current == x) {
                answer = i;
            }
        }

        return answer;
    }

    // this has a better best case,
    // because it returns early
    public static betterLinearSearch(A: Array<string>, n: number, x: string) {
        let answer: number = -1;
        for (var i = 0; i <= n; i += 1) {
            var current = A[i];
            if (current == x) {
                return i;
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
        if (i < n || A[n] == x) {
            return i;
        }
        else {
            return -1;
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
            "Tashtago"
        ];
        
        let passed = 
            LinearSearch.linearSearch(A, A.length - 1, "Ahab") == 3 && 
            LinearSearch.linearSearch(A, A.length -1, "Tashtago") == 6 &&
            
            LinearSearch.betterLinearSearch(A, A.length - 1, "Ahab") == 3 && 
            LinearSearch.betterLinearSearch(A, A.length -1, "Tashtago") == 6 &&

            LinearSearch.sentinalLinearSearch(A, A.length - 1, "Ahab") == 3 && 
            LinearSearch.sentinalLinearSearch(A, A.length -1, "Tashtago") == 6; 

        console.log("LinearSearch:" + passed);
    }
}

LinearSearch.test();