(function () {

    var shortest = [];
    var pred = [];

    function getValue(itemKey) {
        return shortest[itemKey];
    }

    // insert an item in the Q
    // making sure that the heap property holds.
    // i.e. the key of each node is <= the keys of its children.
    function insert(Q, itemKey) {

        Q.push(itemKey);    

        var itemIndex = Q.indexOf(itemKey);
        var parentIndex = Math.floor(itemIndex / 2);

        var parentKey = Q[parentIndex];
        
        var itemValue = getValue(itemKey);
        var parentValue = getValue(parentKey);
    
        while(itemValue < parentValue) {
            Q[itemIndex] = parentKey;
            Q[parentIndex] = itemKey;
            itemIndex = parentIndex;
            parentIndex = Math.floor(itemIndex / 2);
            parent = Q.parentIndex;
            parentValue = getValue(parent);
        }
    }

    /*
     * @input G: a directed graph containing a set V of n vertices
     * and a set E of m directed edges with non-negative weights.
     * @input s: a source vertex in V
     * @result: for each non-source vertex v in V, shortest[v] is 
     * the weight sp(s, v) of a shortest path from s to v and pred[v]
     * is the vertex preceding v on some shortest path.
     */
    function dijkstra(G, s) {

        console.log('Now finding the shortest paths from ' + s + ' to all other vertices.');
        console.log();

        // step 1
        shortest = G.V.map(() => Number.MAX_VALUE);
        shortest[G.V.indexOf('s')] = 0;
        pred = G.V.map(() => null);

        // step 2
        var Q = [];
        G.V.forEach(function (item, index) {
            insert(Q, index);
        });

        console.log(Q);

        // step 3

        // step 4

        // results
        console.log('Results:')
        console.log('shortest:' + shortest);
        console.log('pred:' + pred);
        console.log();
    }

    // 
    // setup
    //

    // create the directed graph object
    var G = {
        V: [],
        E: []
    };

    // add vertices
    G.V[0] = 's';
    G.V[1] = 't';
    G.V[2] = 'x';
    G.V[3] = 'y';
    G.V[4] = 'z';

    // add edges via an adjacency list
    G.E[0] = [null, 6, null, 4, null]; // s
    G.E[1] = [null, null, 3, 2, null]; // t
    G.E[2] = [null, null, null, null, 4]; // x
    G.E[3] = [null, 1, 9, null, 3]; // y
    G.E[4] = [7, null, 5, null, null]; // z

    console.log('Weighted DAG:')
    console.log();

    G.E.forEach(function (items, u) {
        console.log(' Vertex ' + G.V[u] + ' has index ' + u + ' and edges:');
        items.forEach(function (weight, v) {
            if (weight !== null) {
                console.log('  ' + G.V[u] + ',' + G.V[v] + ' with weight ' + weight);
            }
        });
    });
    console.log();

    var s = 's';
    dijkstra(G, s);

})();