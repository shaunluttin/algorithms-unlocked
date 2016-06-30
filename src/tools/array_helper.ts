export default class ArrayHelper {
    public static fillArray(value, len) {
        var A = []; 
        var i = 0;

        while (i < len) {
            A[i++] = value;
        }

        return A;
    }
}