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

//--------------------------------------------------------------------------------------------------------------


//Brute Force Implementaion -- > works but time limit is Exceeded: // runtime -> O(n)^2
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


//--------------------------------------------------------------------------------------------------------------


//Optimized Implementation (1)   --------> runtime O(n)
//Runtime: 108 ms, faster than 40.41% of JavaScript online submissions for Trapping Rain Water.
// Memory Usage: 46.3 MB, less than 12.26 % of JavaScript online submissions for Trapping Rain Water.
function trap(height) {
  let total = 0,
    leftmax = height[0],
    rightmax = height[height.length - 1],
    rightbound = {},
    leftbound = {};
  //finds the left bound for the every elements in the height list
  for (let i = 1; i < height.length; i++) {
    leftmax = leftmax < height[i - 1] ? height[i - 1] : leftmax;
    //if left bound of the current height is high then
    if (leftmax > height[i]) {
      //store the index:value in the leftbound { key-value pairs by using JavaScript Objects }
      leftbound[i] = leftmax;
    }
  }
  //finds the right bound for the every elements in the height list
  for (let i = height.length - 2; i >= 0; i--) {
    rightmax = rightmax < height[i + 1] ? height[i + 1] : rightmax;
    //if right bound of the current height is high and the leftbound have the current height's left bound in it then 
    if (rightmax > height[i] && leftbound[i]) {
      //store the index:value in the rightbound { key-value pairs by using JavaScript Objects }
      rightbound[i] = rightmax;
    }
  }
  //loops through all the eligible traps index in the rightbound object.
  for (let i in rightbound) {
    //formula ->
    //  find the min from leftbound and rightbound of the eligible trap index.   EX -> 2<3 2 is the min bound
    let minheightbound = Math.min(leftbound[i], rightbound[i]);
    //  minheightbound mins the current height of the eligible trap index and adds up with the total.
    total += minheightbound - height[i];
  }
  return total;
}

console.log(trap([0, 2, 1, 1, 1, 2, 5]));//3









