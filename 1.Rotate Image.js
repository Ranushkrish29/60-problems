/**You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
 
Example 1:

    1   2   3               7   4   1
    
    4   5   6       ==>     8   5   2
    
    7   8   9               9   6   3

    Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
    Output: [[7,4,1],[8,5,2],[9,6,3]]

Example 2:
    Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
    Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
    
Constraints:
    n == matrix.length == matrix[i].length
    1 <= n <= 20
    -1000 <= matrix[i][j] <= 1000 */

//javaScript program

//Brute-Force Implemention with out any conditions 
function rotate(matrix) {
    let result = [];
    for (let i = 0; i < matrix.length; i++) {
        let temp = [];
        for (let j = matrix.length - 1; j >= 0; j--) {
            temp.push(matrix[j][i]);
        }
        result.push(temp);
    }
    return result;
}
console.log(rotate([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));


/**
param { number[][] } matrix
return { void} Do not return anything, modify matrix in -place instead. */
//optimized Implemenatation
function rotate(matrix) {

    for (let x = 0, y = matrix.length - 1; x < matrix.length / 2 && y >= 0; x++, y--) {
        for (let i = 0, j = matrix.length - 1; i < matrix.length / 2 && j >= 0; i++, j--) {
            [matrix[x][i], matrix[x][j], matrix[y][i], matrix[y][j]] = [matrix[y][i], matrix[x][i], matrix[y][j], matrix[x][j]];
        }
    }
    return matrix;

}
