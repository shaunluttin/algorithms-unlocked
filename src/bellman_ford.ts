import ArrayHelper from './tools/array_helper';
import GraphHelper from './tools/graph_helper';

export default class BellmanFord {

    /* 
     * For each non-source vertex v in V, shortest[v] is the weight of a shortest path from s to v
     * and pred[v] is the vertex preceding v on some shortest path. For the source vertex s, shortest[s]
     * is zero and pred[s] is null. If there no path from s to v, then shortest[v] is infinite and 
     * pred[v] is null. 
     * @param {Array} G, a directed graph containing a set V of n vertices 
     * and a set E of m directed edges with non-negative weights.
     * @param {number} s, a source vertex
     * @returns an object containing shortest and pred.
     */
    public static bellmanFord(G, s) {

        // 
        // step one
        //

        // indexes represent vertex numbers v, 
        // items represent the weight of a shortest path from s to v
        let shortest: Array<number> = ArrayHelper.fillArray(Number.POSITIVE_INFINITY, G.V.length);
        shortest[s] = 0;
        // indexes represent vertex numbers v, 
        // values represent the predecessor to v on a shortest path from s to v 
        let pred: Array<number> = ArrayHelper.fillArray(null, G.V.length);

        // 
        // step two
        //

        var n = G.V.length; // loop one time fewer than the length.
        while (n > 0) {
            G.E.forEach(function (adjacents, u) {
                adjacents.forEach(function (weight, v) {
                    GraphHelper.relax(u, v, shortest, pred, G.E);
                })
            });
            n = n - 1;
        }

        return {
            shortest,
            pred
        };
    }

    public static test() {

        let G: any = {
            V: [], // adjacency list
            E: []  // adjacency matrix
        };

        // adjacency matrix representation of a graph with edge weights
        var i = 0;
        while (i < 5) {
            G.E.push([]);
            ++i;
        }

        G.E[0][1] = 6;
        G.E[0][2] = 7;
        G.E[1][2] = 8;
        G.E[1][3] = 5;
        G.E[1][4] = -4;
        G.E[2][3] = -3;
        G.E[2][4] = 9;
        G.E[3][1] = -2;
        G.E[4][0] = 2;
        G.E[4][3] = 7;

        // @todo refactor this into a GraphHelper.AdjacencyMatrixToAdjacencyList method.
        G.V = G.E.map((item) => item.map((item, index) => index).filter((item) => item !== undefined));

        let s: number = 0; // source

        console.log(G.V);
        console.log(G.E);

        var result = BellmanFord.bellmanFord(G, s);

        console.log('bellmanFord:' + (result.shortest[0] === 0));
        console.log('bellmanFord:' + (result.shortest[1] === 2));
        console.log('bellmanFord:' + (result.shortest[2] === 7));
        console.log('bellmanFord:' + (result.shortest[3] === 4));
        console.log('bellmanFord:' + (result.shortest[4] === -2));

        console.log(result.shortest);
        console.log(result.pred);

        console.log('bellmanFord:' + (result.pred[0] === null));
        console.log('bellmanFord:' + (result.pred[1] === 3));
        console.log('bellmanFord:' + (result.pred[2] === 0));
        console.log('bellmanFord:' + (result.pred[3] === 2));
        console.log('bellmanFord:' + (result.pred[4] === 1));
    }
}