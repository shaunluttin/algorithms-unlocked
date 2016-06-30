{

    "use strict";

    function dijkstra(G, s) {

        var weight = G.E;

        // inserts an item into set Q
        function insert(Q, item) {
            Q.push(item);
        }

        function relax(u, v, G, shortest, pred) {
            var current = shortest[v];
            var candidate = shortest[u] + G.E[u][v];
            if (candidate < current) {
                shortest[v] = candidate;
                pred[v] = u;
            }
        }

        function relaxAll(u, G, shortest, pred) {
            G.V[u].forEach((v) => relax(u, v, G, shortest, pred));
        }

        // removes the item in Q with the minimum shortest value,
        // and returns this item to the caller
        function extractMin(Q) {

            var i = null;
            var current = Number.MAX_VALUE;

            Q.forEach(function (item) {
                if (shortest[item] < current) {
                    current = shortest[item];
                    i = item;
                }
            });

            Q[i] = null;
            return i;
        }

        function any(Q) {
            return Q.filter((x) => x !== null).length > 0;
        }

        // step 1
        var shortest = G.V.map(function () {
            return Number.POSITIVE_INFINITY;
        });

        var pred = G.V.map(function () {
            return null;
        });

        shortest[s] = 0;

        // step 2
        var Q = [];
        G.V.forEach(function (item, index) {
            insert(Q, index);
        });

        var u;
        while (any(Q)) {
            u = extractMin(Q);
            relaxAll(u, G, shortest, pred);
        }

        return {
            shortest,
            pred
        };
    }

    //
    // inputs
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
        console.log(`dijkstra 02 - The shortest path from ${source} to ${vertex} is ${result.shortest[vertex]} with predecessor ${expectedPred} - ${isCorrect}`);
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