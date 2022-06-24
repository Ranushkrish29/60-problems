/**Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Example 1:

    |
    |                           _____
  3 |                           |   |
    |           _____           |   |____   _____
  2 |           |   |~~~~~~~~~~~|       |~~~|   |
    |   _____   |   |____~~~____|       |___|   |____
  1 |   |   |~~~|       |~~~|                       |
    |   |   |~~~|       |~~~|                       |
  0 |-------------------------------------------------------------

    Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
    Output: 6
    Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:
    Input: height = [4,2,0,3,2,5]
    Output: 9
 
Constraints:
    n == height.length
    1 <= n <= 2 * 104 
    0 <= height[i] <= 105 */


//Brute Force Implementaion -- > works but time limit is Exceeded:
function trap(height) {
  let total = 0;
  //loops the height list
  for (let i = 1; i < height.length - 1; i++) {
    let left = i - 1,
      right = i + 1;
    //finds the left side bound for the current height trap
    while (left > -1) {
      if (height[left] <= height[i])
        left--;
      else
        break;

    }
    //finds the right side bound for the current height trap
    while (right < height.length - 1) {
      if (height[right] < height[i])
        right++;
      else
        break;
    }
    //eliminates the not properly bounded trap EX -> null - 3 || 3 - null
    if (height[right] < height[i] || right == height.length || left == -1 || height[right] === height[i] || height[left] === height[i]) {
      continue;
    }
    //Formula --> 
    //    compare the left and right side of bound height and find the min height  EX--> 2 - 3 returns 2 
    let min = height[left] < height[right] ? height[left] : height[right];
    //    find the differnce between the left and right trap heights "index" ( number of boxes in the range ) EX-->  3 - 6  two boxes in the range 
    let diff = right - left - 1;
    //    total += (min height - current height of the trap ) * difference 
    total += (min - height[i]) * diff;
  }
  return total;
}
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));//6



