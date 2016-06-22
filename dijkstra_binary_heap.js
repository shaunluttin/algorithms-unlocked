(function () {

    var shortest = [];
    var pred = [];

    /*
     * @input G: a directed graph containing a set V of n vertices
     * and a set E of m directed edges with non-negative weights.
     * @input s: a source vertex in V
     * @result: for each non-source vertex v in V, shortest[v] is 
     * the weight sp(s, v) of a shortest path from s to v and pred[v]
     * is the vertex preceding v on some shortest path.
     */
    function dijkstra(G, s) {



    }

    var G = {
        V: [],
        E: []
    };

    // vertices
    G.V[0] = 's';
    G.V[1] = 't';
    G.V[2] = 'x';
    G.V[3] = 'y';
    G.V[4] = 'z';

    // edges in an adjacency list
    G.E[0] = [null, 6, null, 4, null]; // s
    G.E[1] = [null, null, 3, 2, null]; // t
    G.E[2] = [null, null, null, null, 4]; // x
    G.E[3] = [null, 1, 9, null, 3]; // y
    G.E[4] = [7, null, 5, null, null];

    console.log('DAG Weights:')
    G.E.forEach(function (items, u) {
        items.forEach(function (weight, v) {
            if (weight !== null) {
                console.log(' Edge ' + G.V[u] + ',' + G.V[v] + ' has weight ' + weight);
            }
        });
    });

})();