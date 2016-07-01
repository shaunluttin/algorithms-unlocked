export default class ArrayHelper {

    /* 
     * @param {any} value, the value with which to fill the array
     * @param {number} len, the length of the array to create
     */
    public static fillArray(value, len) {
        var A = []; 
        var i = 0;

        while (i < len) {
            A[i++] = value;
        }

        return A;
    }
}