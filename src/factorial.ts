export default class Factorial {

    // n: a number greater than zero.
    public static Factorial(n: number): number {

        let solution: number;

        console.log(`winding up ${n}`)

        if (n == 0) {
            // base case
            // compute the solution directly without recursion
            solution = 1;
            console.log("base case");
        } else {
            // recursive step
            // compute the solution on a smaller instance of the problem
            // that will eventually lead to the base case
            solution = (n * this.Factorial(n - 1));
            console.log(`unwinding ${n}! = ${solution}`);
        }

        return solution;
    }

    public static test() {

        console.log(`passed: ${this.Factorial(5) === 120}`);
    }
}

Factorial.test();