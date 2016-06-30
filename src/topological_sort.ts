import ArrayHelper from './tools/array_helper';

export default class TopologicalSort {

    /**
     * @param {array} dag, adjacency list representation of a DAG
     * @returns {array} A linear order of the vertices
     */
    public static topologicalSort(dag) {

        /**
         * @param {number} vertex
         * @param {array} inDegree
         * @param {array} next
         */
        function adjust(vertex, inDegree, next) {
            dag[vertex].forEach(function (v) {
                inDegree[v] -= 1;
                if (inDegree[v] === 0) {
                    next.push(v);
                }
            });
        }

        /**
         * @param {array} dag, adjacency list representation of a DAG
         * @returns {array} each index represents a vertex; each value represents the vertex's in-degree
         */
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

    public static test() {

        var dag = new Array(11);

        dag[0] = [];
        dag[1] = [3, 5, 9];
        dag[2] = [4];
        dag[3] = [8, 10];
        dag[4] = [];
        dag[5] = [10];
        dag[6] = [];
        dag[7] = [];
        dag[8] = [7, 0];
        dag[9] = [7];
        dag[10] = [6, 2];

        var actualResult = TopologicalSort.topologicalSort(dag);

        function testEdge(arr, u, v) {
            console.log('topologicalSort:' + (arr.indexOf(u) < arr.indexOf(v)));
        }

        // 0
        testEdge(actualResult, 1, 3);
        testEdge(actualResult, 1, 5);
        testEdge(actualResult, 1, 9);
        testEdge(actualResult, 2, 4);
        testEdge(actualResult, 3, 8);
        testEdge(actualResult, 3, 10);
        // 4
        testEdge(actualResult, 5, 10);
        // 6 
        // 7 
        testEdge(actualResult, 8, 7);
        testEdge(actualResult, 8, 0);
        testEdge(actualResult, 9, 7);
        testEdge(actualResult, 10, 6);
        testEdge(actualResult, 10, 2);

        //           The DAG
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
    }
}