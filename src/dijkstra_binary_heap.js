"use strict";
var binary_heap_helper_1 = require('./tools/binary_heap_helper');
{
    'use strict';
    /*
     * Finds the shortest path from a source vertex s within a directed graph G that contains a set V of n vertices
     * and a set E of m directed edges with non-negative weights.
     * @param {Array} G
     * @param {Number} s
     * @returns
     */
    function dijkstra(G, s) {
        function relax(u, v, G, shortest, pred) {
            var current = shortest[v];
            var candidate = shortest[u] + G.E[u][v];
            if (candidate < current) {
                shortest[v] = candidate;
                pred[v] = u;
                return true;
            }
            return false;
        }
        function any(array) {
            return array.filter(function (x) { return x !== null; }).length > 0;
        }
        // 
        // step 1: set shortest and pred defaults
        //
        var shortest = G.V.map(function () { return Number.MAX_VALUE; });
        var pred = G.V.map(function () { return null; });
        shortest[s] = 0;
        //
        // step 2: make binaryHeap an empty priority queue
        //
        var binaryHeap = [];
        // 
        // step 3: insert each vertex into the queue, ordered by shortest value.
        //
        G.V.forEach(function (item, vertexNumber) {
            binary_heap_helper_1.default.insert(binaryHeap, vertexNumber, shortest);
        });
        while (any(binaryHeap)) {
            var u = binary_heap_helper_1.default.extractMin(binaryHeap, shortest);
            G.V[u].forEach(function (adjacentVertex) {
                var decreased = relax(u, adjacentVertex, G, shortest, pred);
                if (decreased) {
                    binary_heap_helper_1.default.decreaseKey(binaryHeap, adjacentVertex, shortest);
                }
            });
        }
        return {
            shortest: shortest,
            pred: pred
        };
    }
    //
    // test
    //
    // the source vertex
    // from which to find the shortest path to other vertices
    var source = 1;
    // a directed graph with a set of V vertices
    // and a set of E directed edges
    var G = {
        V: [],
        E: []
    };
    // add vertices and their adjacent vertices
    G.V[0] = [];
    G.V[1] = [3, 5, 9];
    G.V[2] = [4];
    G.V[3] = [8, 10];
    G.V[4] = [];
    G.V[5] = [8];
    G.V[6] = [];
    G.V[7] = [];
    G.V[8] = [7, 0];
    G.V[9] = [7];
    G.V[10] = [6, 2];
    // add edge weights
    G.V.forEach(function (item, i) {
        G.E[i] = [];
    });
    G.E[1][3] = 2;
    G.E[1][5] = 2;
    G.E[1][9] = 2;
    G.E[9][7] = 2;
    G.E[5][8] = 2;
    G.E[3][8] = 2;
    G.E[3][10] = 2;
    G.E[10][6] = 2;
    G.E[10][2] = 2;
    G.E[2][4] = 2;
    G.E[8][7] = 2;
    G.E[8][0] = 2;
    //           The DAG - all edges have a weight of (2).
    //
    //           +-------+1+-------+
    //           |        |        |
    //           |        |        |
    //           v        v        v
    // +---------3        5        9
    // |         |        |        |
    // |         |        |        |
    // |         |        v        v
    // |         +------->8+------>7
    // v                  |
    // 10+------+         |
    // |        |         |
    // |        |         |
    // v        v         v
    // 6        2         0
    //          |
    //          |
    //          v
    //          4
    var result = dijkstra(G, source);
    function test(vertex, expectedShortest, expectedPred) {
        var isCorrect = result.shortest[vertex] === expectedShortest && result.pred[vertex] === expectedPred;
        console.log("The shortest path from " + source + " to " + vertex + " is " + result.shortest[vertex] + " with predecessor " + expectedPred + " - " + isCorrect);
    }
    test(1, 0, null);
    test(2, 6, 10);
    test(3, 2, 1);
    test(4, 8, 2);
    test(5, 2, 1);
    test(6, 6, 10);
    test(7, 4, 9);
    test(8, 4, 3);
    test(9, 2, 1);
    test(10, 4, 3);
}
//# sourceMappingURL=dijkstra_binary_heap.js.map