import ArrayHelper from './tools/array_helper';

{

    function topologicalSort(dag) {

        function adjust(vertex, inDegree, next) {
            dag[vertex].forEach(function (v) {
                inDegree[v] -= 1;
                if (inDegree[v] === 0) {
                    next.push(v);
                }
            });
        }

        function toInDegree(dag) {
            var inDegree = ArrayHelper.fillArray(0, dag.length);
            dag.forEach(function (adjacentVertices, vertex) {
                adjacentVertices.forEach(function (adjacentVertex) {
                    inDegree[adjacentVertex] += 1;
                });
            });

            return inDegree;
        }

        var inDegree = toInDegree(dag);

        var linearOrder = [];

        // contains vertices with in-degree zero
        var next = [];
        inDegree.forEach(function (inDegree, index) {
            if (inDegree === 0) {
                next.push(index);
            }
        });

        while (next.length > 0) {

            var u = next.pop();
            linearOrder.push(u);
            adjust(u, inDegree, next);
        }

        return linearOrder;
    }

    function shortestPath(G, start) {

        var shortest = ArrayHelper.fillArray(Number.POSITIVE_INFINITY, G.V.length);
        var pred = ArrayHelper.fillArray(null, G.V.length);

        shortest[start] = 0;

        var weight = G.E;

        function relax(u, v) {
            var current = shortest[v];
            var candidate = shortest[u] + weight[u][v];
            if (candidate < current) {
                shortest[v] = candidate;
                pred[v] = u;
            }
        }

        var sortedDag = topologicalSort(G.V);

        sortedDag.forEach(function (u) {
            G.V[u].forEach(function (v) {
                relax(u, v);
            });
        });

        return {
            shortest,
            pred
        }
    }

    function testAll() {

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
        for (var i = 0; i < G.V.length; ++i) {
            G.E[i] = ArrayHelper.fillArray(0, G.V.length);
        }

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

        var result = shortestPath(G, source);

        function test(vertex, expectedShortest, expectedPred) {
            var isCorrect = result.shortest[vertex] === expectedShortest && result.pred[vertex] === expectedPred;
            console.log(`dag - The shortest path from ${source} to ${vertex} is ${result.shortest[vertex]} with predecessor ${expectedPred} - ${isCorrect}`);
        }

        test(1, 0, null);
        test(2, 6, 10);
        test(3, 2, 1);
        test(4, 8, 2);
        test(5, 2, 1);
        test(6, 6, 10);
        test(7, 4, 9);
        test(8, 4, 5);
        test(9, 2, 1);
        test(10, 4, 3);
    }

    testAll();
}