export default class GraphHelper {
    public static relax(u: number, v: number, shortest: Array<number>, pred: Array<number>, weight: Array<number>) {
        var current = shortest[v];
        var candidate = shortest[u] + weight[u][v];
        if (candidate < current) {
            shortest[v] = candidate;
            pred[v] = u;
            return true;
        }
        return false;
    }
}