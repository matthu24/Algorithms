//Example of Greedy approach!  "best answer so far", may also need "additional information"
//iterate through once, grab the best profit for each iteration
//we need to track additional information: in this case the lowest price insofar
function getMaxProfit(stockPrices) {

    // keep track of max profit
    let max = stockPrices[1]-stockPrices[0];
    //keep track of lowest price
    let lowest = stockPrices[0];

    for(let i = 1;i < stockPrices.length; i++){
     //see if we can find a better profit than before
     //doing this step before redefining the lowest price is critical beause
     //of the edge case where the prices go down every time
     //in that case, the lowest will always be the last price, and so in the last
     //iteration, stockPrices[i] - lowest will be 0, and so max will be 0 a
     //at the end
     if(stockPrices[i] - lowest > max){
         max = stockPrices[i] - lowest
     }
     //keep track of the lowest price we've seen
     if (stockPrices[i] < lowest ){
         lowest = stockPrices[i]
     }

    }
    return max;
}

const stockPrices = [10,8,7];
console.log(getMaxProfit(stockPrices));






function getProductsOfAllIntsExceptAtIndex(intArray) {

    // make a list of the products
    let result = [];
    let current = 1;
    //get products of all numbers to the left of the element
    //So to get the products of all the integers before each index, we could greedily store
    //each product so far and multiply that by the next integer.
    for(let i=0;i < intArray.length;i++){

        result[i] = current;
        current *= intArray[i];
    }

    let newCurrent = 1;
    for(let i = intArray.length-1; i >=0 ;i--){
        result[i] *= newCurrent;
        newCurrent *= intArray[i];
    }

    return result;
}

const intArray = [1, 7, 3, 4];
console.log(getProductsOfAllIntsExceptAtIndex(intArray));





//greedy approach: assume we already have the other two highest numbers
//each iteration we would just see if the current element gave
//a higher product than the current max
function highestProductOf33(arrayOfInts) {

    //we need to keep track of the lowest three and the highest two
    //because the lowest two could be negative and their product positive
    let first,second,third,lowest,secondLowest;
    for(let i=0;i< arrayOfInts.length;i++){
        let el = arrayOfInts[i]
        //get first three highest
        if(!first || el > first){
            third = second;
            second = first;
            first = el;
        }else if(!second || el > second){
            third = second;
            second = el;
        }else if(!third || el > third){
            third = el;
        }

        //get the lowest and second lowest
        if(!lowest || el < lowest ){
            secondLowest = lowest;
            lowest = el;
        }else if(!secondLowest || el < secondLowest){
            secondLowest = el;
        }
    }


    return Math.max(first*lowest*secondLowest,first*second*third)
}
const arrayOfInts = [5,6,1,2,-1,-11];
console.log(highestProductOf33(arrayOfInts));




//interview cake solution :]
function highestProductOf3(arrayOfInts) {

    if (arrayOfInts.length < 3) {
        throw new Error('Less than 3 items!');
    }

    // we're going to start at the 3rd item (at index 2)
    // so pre-populate highests and lowests based on the first 2 items.
    // we could also start these as null and check below if they're set
    // but this is arguably cleaner
    var highest = Math.max(arrayOfInts[0], arrayOfInts[1]);
    var lowest  = Math.min(arrayOfInts[0], arrayOfInts[1]);

    var highestProductOf2 = arrayOfInts[0] * arrayOfInts[1];
    var lowestProductOf2  = arrayOfInts[0] * arrayOfInts[1];

    // except this one--we pre-populate it for the first *3* items.
    // this means in our first pass it'll check against itself, which is fine.
    var highestProductOf3 = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];

    // walk through items, starting at index 2
    for (var i = 2; i < arrayOfInts.length; i++) {
        var current = arrayOfInts[i];

        // do we have a new highest product of 3?
        // it's either the current highest,
        // or the current times the highest product of two
        // or the current times the lowest product of two
        highestProductOf3 = Math.max(
            highestProductOf3,
            current * highestProductOf2,
            current * lowestProductOf2
        );

        // do we have a new highest product of two?
        highestProductOf2 = Math.max(
            highestProductOf2,
            current * highest,
            current * lowest
        );

        // do we have a new lowest product of two?
        lowestProductOf2 = Math.min(
            lowestProductOf2,
            current * highest,
            current * lowest
        );

        // do we have a new highest?
        highest = Math.max(highest, current);

        // do we have a new lowest?
        lowest = Math.min(lowest, current);
    }

    return highestProductOf3;
}



//this is potentially O(n^2)
function mergeRanges(meetings) {
    var result = [];
    // merge meeting ranges
    let added = false;
    meetings.forEach(curr => {
       for(let i = 0; i < result.length; i++){
          if(curr.startTime <= result[i].endTime && curr.endTime >= result[i].startTime){
              result[i].endTime = Math.max(curr.endTime, result[i].endTime)
              result[i].startTime = Math.min(curr.startTime, result[i].startTime)

              added = true;
          }
        //   }else if(curr.endTime >= result[i].startTime){
        //       result[i].startTime = Math.min(curr.startTime, result[i].startTime)
        //       added = true;
        //   }
       }
       if(added === false){
           result.push(curr)
       }
       added = false;


    })

    return result;
}

const meetings = [
     {startTime: 1, endTime: 10},
    {startTime: 2, endTime: 6},//9:00 to 9:30
     {startTime: 3, endTime: 5},//10:30 to 11:30
    {startTime: 7, endTime: 9},


];

console.log(mergeRanges(meetings));




//do it again but by sorting the meetings and trying to merge with the previous one
function mergeRanges(meetings) {

  // create a deep copy of the meetings array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Deep_Clone
  var meetingsCopy = JSON.parse(JSON.stringify(meetings));
  // sort by start time
  var sortedMeetings = meetingsCopy.slice().sort(function(a, b) {
      return a.startTime > b.startTime ? 1 : -1;
  });

  // initialize mergedMeetings with the earliest meeting
  var mergedMeetings = [sortedMeetings[0]];

  for (var i = 1; i < sortedMeetings.length; i++) {

      var currentMeeting    = sortedMeetings[i];
      var lastMergedMeeting = mergedMeetings[mergedMeetings.length - 1];

      // if the current meeting overlaps with the last merged meeting, use the
      // later end time of the two
      if (currentMeeting.startTime <= lastMergedMeeting.endTime) {
          lastMergedMeeting.endTime = Math.max(lastMergedMeeting.endTime, currentMeeting.endTime);

      // add the current meeting since it doesn't overlap
      } else {
          mergedMeetings.push(currentMeeting);
      }
  }

  return mergedMeetings;
}


function myFunction(rect1,rect2) {
    // write the body of your function here
    let leftX = Math.max(rect1.leftX, rect2.leftX);
    let bottomY = Math.max(rect1.bottomY, rect2.bottomY);
    let width;
    let rightX1 = rect1.leftX + rect1.width;
    let rightX2 = rect2.leftX + rect2.width;
    width = Math.min(rightX1,rightX2)- leftX;

    let height;
    let topY1 = rect1.bottomY + rect1.height;
    let topY2 = rect2.bottomY + rect2.height;
    height = Math.min(topY1,topY2)- bottomY;
    if(width > 0 && height > 0){
            return {leftX: leftX, bottomY: bottomY, width: width, height: height};
    }else{
        return 'no intersection'
    }
}

// run your function through some test cases here
// remember: debugging is half the battle!
console.log(myFunction({leftX: 1, bottomY: 1,width: 6, height:3},{leftX: 7, bottomY: 2,width: 2, height:1}));



//return indices not the max profit
function stocks(arr){
  let lowestVal = arr[0];
  let sellDate;
  let buyDate;
  let lowestIdx = 0;
  let maxProfit = arr[1] - arr[0];
  for(let i=1;i < arr.length;i++){
    let current = arr[i];

    if(current-lowestVal > maxProfit){
      maxProfit = current - lowestVal;
      sellDate = i;
      //re assign a new variable "buy" to the lowestIdx only if we change the profit
      //then return buy, not the lowestIdx
      buyDate = lowestIdx;
    }
    //we assign lowestVal after the comparison of max profit because we want to compare the lowestVal thus far,
    //and not assign lowestVal before comparing current and lowestVal- they might be the same
    if(current < lowestVal){
      lowestVal = current;
      lowestIdx = i;
    }


  }
  return [buy,highestIdx];
}



//Optimize for space and time. Favor speeding up the getter methods getMax(), getMin(), getMean(), and getMode() over speeding up the insert() method.
//get mode- greedy method: utilize a hashmap and save the variable maximum occurrences, which will update when necessary
function tempTracker() {
  this.minTemp = null;
  this.maxTemp = null;
  this.numTemps = 0;
  this.mean = null;
  this.mode = null;
  this.maxOccurrences = 0;
  this.tempArray = {};
  //each index of tempArray represents a temperature
  // for(let i=0;i <=110;i++){
  //   this.tempArray.push(0);
  // }
}

tempTracker.prototype.insert = function(temp){
  if(!this.minTemp || temp < this.minTemp){
    this.minTemp = temp;
  }
  if(!this.maxTemp || temp > this.maxTemp){
    this.maxTemp = temp;
  }
  this.numTemps += 1;
  if(!this.mean){
    this.mean = temp;
  }else{
    this.mean = (this.mean * (this.numTemps-1) + temp)/this.numTemps;
  }

  if(!this.tempArray[temp]){
    this.tempArray[temp] = 1;
  }else{
    this.tempArray[temp] += 1;
  }

  if(this.tempArray[temp] > this.maxOccurrences){
    this.mode = temp;
    this.maxOccurrences = this.tempArray[temp];
  }


}

tempTracker.prototype.getMax = function(){
  return this.maxTemp;
}

tempTracker.prototype.getMin = function(){
  return this.minTemp;
}

tempTracker.prototype.getMean = function(){
  return this.mean;
}

//O(n) getMode
// tempTracker.prototype.getMode = function(){
//   let highestFrequency = 0;
//   for(let key in this.frequency){
//     if(this.frequency[key] > highestFrequency){
//       this.mode = parseInt(key);
//       highestFrequency = this.frequency[key];
//     }
//   }
//   return this.mode;
// }


//we can do better for getMode
tempTracker.prototype.getMode = function(){
  return this.mode;
}







//bst dfs

function BinaryTreeNode(value) {
  this.value = value;
  this.left  = null;
  this.right = null;
}



function dfsRecursive(node){
if(!node.left && !node.right){
  console.log(node.value)
  return;
}
console.log(node.value);

if(node.right){
  dfsRecursive(node.right)
}
  if(node.left){
  dfsRecursive(node.left)
}
}

//DFS USES A STACK (PUSH, POP)
function dfs(node) {
let result = []
let nodes = []
nodes.push(node);
while(nodes.length){
  let popped = nodes.pop();
  result.push(popped.value);
  if(popped.left){
    nodes.push(popped.left);
    // console.log(popped.left)
  }
  if(popped.right){
    nodes.push(popped.right);
    // console.log(popped.right);
  }
}
console.log(result)
}

//BFS USES A QUEUE (PUSH, SHIFT)
function bfs(node){
  let result = []
  let nodes = []
  nodes.push(node);
  while(nodes.length){
    //gets the first in the array nodes
    let shifted = nodes.shift();
    result.push(shifted.value);
    if(shifted.left){
      nodes.push(shifted.left);
    }
    if(shifted.right){
      nodes.push(shifted.right);
    }
  }
  console.log(result)
}


// A tree is "superbalanced" if the difference between the depths of any two leaf nodes ↴ is no greater than one.

//do dfs,
//track depths for each node you visit (ie. every subsequent node you push will add 1 to the depth, we are keeping track of a running depth for every node),
//if run into a leaf, add depth,but only new depths to depths array
//if there are more than two depths, return false || if there are two depths and the difference is more than two, return false

function balanced(node){
  let newDepths = [];
  //nodes will keep track of the node and it's depth(we can track the depth of every node!)
  let nodes = [];
  nodes.push([node,0]);
  while(nodes.length){
    let popped = nodes.pop();
    let current = popped[0];
    let depth = popped[1];
    if(!current.left && !current.right){
      //it's a leaf
      //add to newDepths if it's a new depth
      if(newDepths.indexOf(depth) < 0){
        newDepths.push(depth);
      }
      //check if tree is unbalanced
      if(newDepths.length > 2 || (newDepths.length === 2 && Math.abs(newDepths[0]-newDepths[1]) > 1)){
        return false
      }
    }else{
      //it's not a leaf, keep pushing to nodes
      if(current.left){
        nodes.push([current.left,depth + 1])
      }
      if(current.right){
        nodes.push([current.right,depth + 1])

      }
    }
  }
  return true;
}



function BinaryTreeNode(value) {
    this.value = value;
    this.left  = null;
    this.right = null;
}



//is valid binary search tree:
//do depth first search,
//each node you push on to stack has a lower bound and a higher bound
//keep track of the node, lower bound, and higher bound in a node bundle
//lower bound is the greatest node the current node must be higher than
//higher bound is the least node the current node must be less than

//trick: each time you go left, you have a new higher bound but the lower bound stays, every time you go right, you have a new lower bound but the higher bound stays

function isBinarySearchTree(root) {
  let stack = [];
  stack.push({node: root, lowerbound: -Infinity, upperbound:Infinity});
  while(stack.length){
    let nodeBundle= stack.pop();
    let currentnode = nodeBundle.node;
    let lowerbound = nodeBundle.lowerbound;
    let upperbound = nodeBundle.upperbound;

    //the check
    if(currentnode.value < lowerbound || currentnode.value > upperbound){
      return false;
    }

    //push left and right
    if(currentnode.left){
      //going left: new upperbound, lowerbound is still the same
      stack.push({node:currentnode.left, lowerbound: lowerbound, upperbound: currentnode.value})
    }
    if(currentnode.right){
      //going right: new lowerbound, upperbound is still the same
      stack.push({node: currentnode.right,lowerbound: currentnode.value, upperbound:upperbound })
    }

  }
   return true;
}



//find second largest node in binary tree
//keep going right, but remembering the node before it
//when you can't go right anymore, return the node before it//this doesn't take into account that the max node could have children to the left
//if max has children to left, find largest node starting from that left subtree

function largest(node){
  let current = node;
  while(current){
    if(!current.right){
      return current
    }
    current = current.right;
  }
}

function second(root){
  let current = root;
  //two scenarios for the max:
  //1. it has no left subtree- return node above max
  //2. it has a left subtree- return max in left subtree
  while(current.right && current.right.right){
    current = current.right;
  }
  //current is now the node right above the max
  //let's check if max is 1. or 2. from above
  if(current.right.left){
    //if left subtree of max exists, find largest of the subtree
    let maxsubtree = largest(current.right.left);
    return maxsubtree.value
  }else{
    return current.value
  }
}


//find mid point
//compare midpoint of array to target and recursively call binary search again with half the array
function binarySearch(array,target){
  let midIndex = Math.floor(array.length/2);
  //this doesn't work if we are adding midIndices
  if(array.length === 1 && array[0] != target){
    return 'not found'
  }
  if(array[midIndex] === target){
    return midIndex
  }else if(array[midIndex] > target){
    //mutates array
    let split = array.splice(0,midIndex)
    return binarySearch(split,target)
  }else if(array[midIndex] < target){
    let split = array.splice(midIndex,array.length)
    return binarySearch(split,target) + midIndex
  }

}


//iterative bs
//move floor and ceiling index accordingly
function binarySearch(target, nums) {
  // see if target appears in nums

  // we think of floorIndex and ceilingIndex as "walls" around
  // the possible positions of our target, so by -1 below we mean
  // to start our wall "to the left" of the 0th index
  // (we *don't* mean "the last index")
  var floorIndex = -1;
  var ceilingIndex = nums.length;

  // if there isn't at least 1 index between floor and ceiling,
  // we've run out of guesses and the number must not be present
  while (floorIndex + 1 < ceilingIndex) {

      // find the index ~halfway between the floor and ceiling
      // we have to round down, to avoid getting a "half index"
      var distance = ceilingIndex - floorIndex;
      var halfDistance = Math.floor(distance / 2);
      var guessIndex = floorIndex + halfDistance;

      var guessValue = nums[guessIndex];

      //check mid index
      if (guessValue === target) {
          return true;
      }

      if (guessValue > target) {

          // target is to the left, so move ceiling to the left
          ceilingIndex = guessIndex;

      } else {

          // target is to the right, so move floor to the right
          floorIndex = guessIndex;
      }
  }
//if we haven't found it yet, return false
  return false;
}




function rotation(array){
  //use binary search
  //find middle index of array
  //take first letter of that element
  //look to the left and to the right
  //base case: if element letter code is less than its left then return the index, or is greater than its right then return the right index
  //if none of the above: if the element letter code is greater than the first item in the array, get rid of the first half (remember to add the middle index ), if the element letter is less than the first item in the array, get rid of second half and recurse
  let midIndex = Math.floor(array.length/2);
  let middleCode = array[midIndex][0].charCodeAt();
  let leftCode = array[midIndex-1][0].charCodeAt();
  let rightCode = array[midIndex+1][0].charCodeAt();
  if(middleCode < leftCode){
    return midIndex
  }else if(middleCode > rightCode){
    return midIndex + 1;
  }

  if(middleCode < array[0][0].charCodeAt()){
    let firstHalf = array.splice(0,midIndex)
    return rotation(firstHalf)
  }else{
    let secondHalf = array.splice(midIndex,array.length);
    return rotation(secondHalf)
  }

}



//called in flight entertainment on interview cake site
function twoSum(array,target){
  //array of integers
  let integers = {}
  array.forEach(integer => {
    if(integers[integer]){
      integers[integer] += 1;
    }else{
      integers[integer] = 1;
    }
  })


  for(let i=0;i < array.length;i++){
    let desired = target - array[i]
    //second conditional checks identical movie lengths of two separate movies
    if(integers[desired] && (desired !== array[i] || integers[desired] > 1)){
      return true;
    }
  }
  return false;
}

//intervew cake solution: does it in O(n) instead of 2n
function canTwoMoviesFillFlight(movieLengths, flightLength) {

    // movie lengths we've seen so far
    var movieLengthsSeen = new Set();

    //check for match first, then add movie length to hash if it's not there
    //do it all in one go
    for (var i = 0; i < movieLengths.length; i++) {
        var firstMovieLength = movieLengths[i];

        var matchingSecondMovieLength = flightLength - firstMovieLength;
        if (movieLengthsSeen.has(matchingSecondMovieLength)) {
            return true;
        }

        movieLengthsSeen.add(firstMovieLength);
    }

    // we never found a match, so return false
    return false;
}




function fib(n){
  //return the nth number
  //1,1,2,3,5,8
  if(n === 1){
    return 1;
  }else if(n === 2){
    return 1;
  }
  return fib(n-2) + fib(n-1)
}


//O(1) space solution (recursive has a big call stack which is bad for space)

function fib(n) {

  // edge cases:
  if (n < 0) {
      throw new Error('Index was negative. No such thing as a negative index in a series.');
  } else if (n === 0 || n === 1) {
      return n;
  }

  // we'll be building the fibonacci series from the bottom up
  // so we'll need to track the previous 2 numbers at each step
  var prevPrev = 0;  // 0th fibonacci
  var prev = 1;      // 1st fibonacci
  var current;       // Declare current

  for (var i = 1; i < n; i++) {

      // Iteration 1: current = 2nd fibonacci
      // Iteration 2: current = 3rd fibonacci
      // Iteration 3: current = 4th fibonacci
      // To get nth fibonacci ... do n-1 iterations.
      current = prev + prevPrev;
      prevPrev = prev;
      prev = current;
  }

  return current;
}







//what will logIt print?
var text = 'outside';
function logIt(){
  console.log(text);
  var text = 'inside';
};
logIt();

//undefined, because the function creates a new scope
//when we declared and assigned text after the console log, the text variable
// was hoisted to the top of the current scope or the logIt function
//so the above code is really the same as:
var text = 'outside';
function logIt(){
  var text;
  console.log(text);
  var text = 'inside';
};
logIt();

//if we hadn't declared and assigned text in the function to 'inside'
//console.log would output 'outside' because it function would make  aclosure





// Delete a node from a singly-linked list, ↴ given only a variable pointing to that node.
//
// The input could, for example, be the variable b below:

function LinkedListNode(value) {
    this.value = value;
    this.next = null;
}

var a = new LinkedListNode('A');
var b = new LinkedListNode('B');
var c = new LinkedListNode('C');

a.next = b;
b.next = c;

// deleteNode(b);

//We only have access to the node we want to delete, also we don't have access to previous node and we don't know where the
//head is

function remove(node){
  //we only have access to node.value and node.next
  //modify current node to be the exact same as node.next
  if(node.next){
    let next = node.next;
    node.value = next.value;
    node.next = next.next;
  }else{
      //what if we want to delete the last node
      node.value = null;

  }

}



//implement a maxStack class that has a getMax() method that returns the largest el in the stack
//need to modify push and pop to keep track of the max
//hint: need to use a stack to keep track of each new max element

function Stack() {
    // initialize an empty array
    this.items = [];
}

// push a new item to the last index
Stack.prototype.push = function(item) {
    this.items.push(item);
};

// remove the last item
Stack.prototype.pop = function() {

    // if the stack is empty, return null
    // (it would also be reasonable to throw an exception)
    if (!this.items.length) {
        return null;
    }
    return this.items.pop();
};

// see what the last item is
Stack.prototype.peek = function() {
    if (!this.items.length) {
        return null;
    }
    return this.items[this.items.length -1];
};

function maxStack(){
  this.stack = new Stack();
  //keep track of all the new maxes, even the old ones
  //the current max will always live at the end of this.maxes stack
  this.maxes = new Stack();
}

maxStack.prototype.getMax = function(){
  return this.maxes.peek()
}


maxStack.prototype.push = function(item){

  if(this.maxes.length === 0 || item > this.maxes.peek()){
    //update this.maxes if we find a larger item than the current max
    this.maxes.push(item);
  }
  this.stack.push(item);
}

maxStack.prototype.pop = function(){
  if(this.maxes.peek() === this.stack.peek()){
    this.maxes.pop();
  }
  this.stack.pop();

}






// does SLL have a cycle?
function cycle(firstNode){
  let slowJumper = firstNode;
  let fastJumper = firstNode;

  //loop until fastJumper hits end of SLL
  while(fastJumper && fastJumper.next){
    slowJumper = firstNode.next;
    fastJumper = firstNode.next.next;

    if(slowJumper === fastJumper){
      return true;
    }
  }
  return false;

}




//
// You have a function rand7() that generates a random integer from 1 to 7. Use it to write a function rand5() that generates a random integer from 1 to 5.
//
// rand7() returns each integer with equal probability. rand5() must also return each integer with equal probability.

function rand7(){
  return Math.floor(Math.random()*7) + 1
}

function rand5(){
  //call rand7
  //return if it result falls between 1 and 5
  //if it doesn't (hits 6 or 7),
  //if it hits 6, we need to make an equal probability between 1 and 3, if it hits 7, we need to make an equal probability between 3 and 5

  let result;
  result = rand7();
  if(result <= 5){
    return result
  }else{
    if(result > 5){
      return Math.floor(Math.random()*5) + 1
    }
  }
}


//or just reroll

function rand5(){
  let result = rand7();
  while(result > 5){
    result = rand7();
  }
  return result;
}



//reverse a string in place, but you can turn the string into array first and do the reversal in place on the array
//strings in js are immutable and can't be changed after it's been created
// Strings are immutable in Javascript:
//
//   var testString = 'mutable?';
//
// testString[7] = '!';
// string is still 'mutable?'
// (but no error is raised!)
//arrays are muteable in JS


 function reverse(str){
   let arr = str.split("");
   let mid = Math.floor(arr.length/2);
   if(arr.length % 2=== 0){
     mid -= 1;
   }
   for (let i=0;i <= mid;i++){
     let secondIndex = arr.length - 1 - i;
     let temp = arr[i];
     arr[i] = arr[secondIndex];
     arr[secondIndex] = temp;
   }
   return arr.join("");
 }






 function LinkedListNode(value) {
  this.value = value;
  this.next = null;
}

var a = new LinkedListNode("Angel Food");
var b = new LinkedListNode("Bundt");
var c = new LinkedListNode("Cheese");
var d = new LinkedListNode("Devil's Food");
var e = new LinkedListNode("Eccles");

a.next = b;
b.next = c;
c.next = d;
d.next = e;


function kthToLastNode(k,head){
//find length of list
let current = head;
let length = 1;
while(current.next){
  current = current.next;
  length += 1;
}

let kFromStart = length - k + 1;
current = head;
for(let i = 1; i < kFromStart; i++){
  current = current.next;
}
return current
}



//this is not necessarily faster than the length solution
function kthToLastNode(k,head){
   //have two pointers spaced out k wide
   //once the second pointer has reached the end, return the first pointer

   let pointer1 = head;
   let pointer2 = head;
   for(let i = 1;i < k;i++){
     pointer2 = pointer2.next;
   }
   while(pointer2.next){
     pointer1 = pointer1.next;
     pointer2 = pointer2.next;
   }

   return pointer1

}




//reverse words

var message = [ 'c', 'a', 'k', 'e', ' ',
              'p', 'o', 'u', 'n', 'd', ' ',
              's', 't', 'e', 'a', 'l' ];

// reverseWords(message);

// console.log(message.join(''));
// // prints: 'steal pound cake'

function reverse(arr){
//initialize results empty string
//also initailze current word string
//walk backward in letters array
//
let result = '';
let current = '';
let index = arr.length - 1;
while(index >= 0){
  current = arr[index] + current;

  if(arr[index] === ' '){
    //add current to result
    //wipe out current
    result += current;
    current = '';
  }


  index-=1;
}
result += " " + current;

return result.slice(1);
}


//we can do reverse in O(1) space
// Reverse all the characters in the entire message, giving us the correct word order but with each word backwards.
// Reverse the characters in each individual word.

function reverseWhole(arr){

  let currentStartIndex = 0;
  reverse(arr,0,arr.length)
  //now reverse characters of individual words
  for(let i=0;i <= arr.length;i++){
    if(arr[i] === " " || i === arr.length ){
      reverse(arr,currentStartIndex,i);
      currentStartIndex = i + 1;
    }
  }
  return arr

}


function reverse(arr,start,end){

   let arrMid = Math.floor((end-start)/2);
 if((end-start)%2=== 0){
   arrMid -= 1;
 }
 let i = 0;
 while(i <= arrMid){
   let firstIndex = start + i;
    let secondIndex = end - 1 - i;
   let temp = arr[firstIndex];
   arr[firstIndex] = arr[secondIndex];
   arr[secondIndex] = temp;
   i+=1;
 }


 return arr
}




// Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing.


function parentheticals(str,position){
  let count = 0;
  while(position < str.length){
    position += 1;
    if(str[position] === "("){
      count += 1;
    }else if(str[position] === ")"){
      if(count === 0){
        return position
      }else{
        count -= 1;
      }
    }
  }
}




//SORT in under nlgn!!!
// var unsortedScores = [37, 89, 41, 65, 91, 53];
// const HIGHEST_POSSIBLE_SCORE = 100;

// sortScores(unsortedScores, HIGHEST_POSSIBLE_SCORE);
// // returns [91, 89, 65, 53, 41, 37]

function sort(arr,highest){
  //use a cheater hash map with an array
  //indices of array represent the score values and the
  //values represent the
  let scoreCounts = [];
  arr.forEach(el => {
    if(scoreCounts[el]){
      scoreCounts[el] += 1;
    }else{
      scoreCounts[el] = 1;
    }
  })

  let result = [];
  scoreCounts.forEach((el,idx) => {
    //el is the number of times of occurrence
    //idx is the value
    while(el >= 1){
      //push on to the beginning to get a reverse
      result.unshift(idx)
      el -= 1;

    }
  })
  return result;

}




// I have an array of n + 1 numbers. Every number in the range 1..n appears once except for one number that appears twice.


function twice(array,n){
  //n is always the max number in array
  let expectedSum = 0;
  let actualSum = 0;
  for(let i = 1;i <= n; i++){
     expectedSum += i;
     actualSum += array[i-1];
  }
  actualSum += array[array.length-1];
  return actualSum - expectedSum;
}







function isLetter(letter){
  return 'abcdefghijklmnopqrstuvwxyz-'.indexOf(letter) >= 0;
}

function cloud(str){
  let result = {};
  //loop through the string, keeping track of all previous letters until you hit a space
  let currentWord = '';
  let currentStartingIndex = 0;
  // let currentEndingIndex = 1;
  //check for word in result
  for(let i = 0; i < str.length; i++){

    if(!isLetter(str[i].toLowerCase())){
    //we have reached the end of a word
      currentWord = str.slice(currentStartingIndex,i).toLowerCase();
      if(currentWord){
        if(result[currentWord]){
          result[currentWord] += 1;
        }else{
          result[currentWord] = 1;
        }
      }
      currentWord = '';
      currentStartingIndex = i+1;
    }

        // currentWord += str[i].toLowerCase();


  }
  if(isLetter(str[str.length-1])){
   currentWord = str.slice(currentStartingIndex,str.length).toLowerCase();
  }
    if(result[currentWord]){
          result[currentWord] += 1;
        }else if(currentWord){
          result[currentWord] = 1;
        }

  return result
}






//in place shuffle

//return random number (represents indices) between floor and ceiling
function getRandom(floor,ceiling){
  return Math.floor(Math.random() * (ceiling-floor + 1)) + floor
}

//use splice(beginning index, how many to delete)
function shuffle(arr){
  let ceiling = arr.length - 1;
  let floor;
  //walk through array, for each index, pick a random value to the right of the specified index, swap these two values
  //as you walk through the array, the range of random indices to pick from should be getting smaller and smaller
  for(let i=0;i < arr.length;i++){
    floor = i;
    let randomIndex = getRandom(floor,ceiling);

    //swap random index with floor
    let temp = arr[floor];
    arr[floor] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}






function perm(str){
  if(str.length === 1){
   return [str];
  }
  let newPerms = [];
  let prev = perm(str.slice(0,str.length-1));
  //take each string in prev, and insert last letter into each position of the string
  //if prev = ['ab','ba'] ==>
  //and new is 'c'
  //['cab','acb','abc','cba','bca','bac']
  prev.forEach(prevPerm => {
    //parse prevPerm and stick the last letter in
    for(let i=0;i <= prevPerm.length;i++){
      newPerms.push(prevPerm.slice(0,i) + str[str.length-1] + prevPerm.slice(i,str.length));
    }

  })
  return newPerms
}




function merge(arr1,arr2){
  //compare the first index of both arrays
  let merged = []
  //keep looping only if both arrays are still alive
  while(arr1.length > 0 && arr2.length > 0){
    if(arr1[0] > arr2[0]){
      merged.push(arr2.shift())
    }else{
      merged.push(arr1.shift())
    }
  }
  return merged.concat(arr1).concat(arr2);
}


//strings are one edit away
function edit(str1,str2){
  //1. cat, csat
  //2. cat, cas
  //determine the length of each word
  //if they differ:
  //loop through the longer word, if i hit a discrepancy, delete the letter in the word, and compare with the other string
  let length1 = str1.length;
  let length2 = str2.length;
  if(length1 !== length2){
  let longerWord = length1 > length2 ? str1 : str2;
  let shorterWord = longerWord === str1 ? str2 : str1;
  for(let i = 0;i < longerWord.length;i++){
    if(longerWord[i] !== shorterWord[i]){
      longerWord = longerWord.slice(0,i) + longerWord.slice(i + 1,longerWord.length);
      break;
    }
  }
  return longerWord === shorterWord;
  }else{
    //words are the same length
      let discrepancy = 0;
      for(let i = 0;i < str1.length;i++){
        if(str1[i] !== str2[i]){
          discrepancy+=1;
        }
      }

      return discrepancy <= 1;

  }

}




//look and say

//1 11 21 1211 111221
function look(n){
  let result = [[1]];
  if(n === 0){
    return result;
  }
  for(let i=1;i <= n;i++){
    let prev = String(result[result.length-1]);
    let newArray = '';
    //loop through prev

    let currentCount = 1;
    for(let j=1;j <= prev.length;j++){

      if(prev[j] !== prev[j-1]){
        // add to newArray, set currentCount back to zero
        newArray += String(currentCount);
        newArray += String(prev[j-1]);
        currentCount= 1;
      }else{
        //update currentCount
        currentCount += 1;
      }
    }
    result.push([parseInt(newArray)])
  }
  return result;
}




function zigzag(str,n){
  //allocate a structure for each row- nested array
  let result = [];
  let stringResult = '';
  for(let i=0;i < n;i++){
    result.push([])
  }

  let row = 0;
  let ascending = true;
  for(let i=0;i < str.length;i++){
    result[row].push(str[i])
    //need to either increment or decrement row
    if(row === n-1 && ascending === true){
      row-=1;
      ascending = false;
    }else if(row === 0 && ascending === false){
      row += 1;
      ascending = true;
    }else if(ascending === true){
      row+=1;
    }else if(ascending === false){
      row -=1;
    }
  }

  result.forEach(sub => {
    stringResult += sub.join('')
  })

  return stringResult
}



//any permutation is a palindrome?

//create hash map of all letters in string
//walk through map, if more than one letter has an odd number of frequencies, return false, otherwise return true

function permPal(str){
  let frequencies = {};
  for(let i=0;i < str.length;i++){
    if(frequencies[str[i]]){
      frequencies[str[i]] += 1;
    }else{
      frequencies[str[i]] = 1;
    }
  }

  let numOddFrequencies = 0;
  for(let letter in frequencies){
    if(frequencies[letter] % 2 === 1){
      numOddFrequencies += 1;
    }
  }
  return numOddFrequencies <= 1
  // return frequencies
}





// random 7 when we already have random 5 method

function rand5(){
  return Math.floor(Math.random()* 5) + 1
}

//if we roll 1 to 5 inclusive twice, we will get 25 total outcomes, which could be represented by a five by five grid.  We could fill each grid with a number between 1 and 7
function rand7(){
  let grid = [];
  let counter = 1;
  for(let row=0; row < 5; row++){
    grid.push([]);
    for(let col = 0;col < 5; col++){
      grid[row].push(counter);
      if(counter === 7){
        counter = 1;
      }else{
        counter+=1;
      }
    }
  }
  while(true){
  let roll1 = rand5()-1;
  let roll2 = rand5()-1;
  let result = grid[roll1][roll2];
  if(roll1 < 4 || roll2 === 0 ){
    return result;
  }
  }
}




//dfs to check if binary tree is valid using DFS: note that this is incorrect because we are just
//checking to see if a node is valid against it's immediate parent, which isn't enough
//store three things for each node: 1. the node, 2. whether it is a right or left branch of its immediate parent,
//3. the value of its immediate parent

//first, insert the root
//then, while the storage array is not empty, pop the last node off the storage array, check if its a valid node, and add right and left to the stack

function BinaryTreeNode(value) {
  this.value = value;
  this.left  = null;
  this.right = null;
}

BinaryTreeNode.prototype.insertLeft = function(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
};

BinaryTreeNode.prototype.insertRight = function(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
};

function isValid(node){
  //dfs uses a stack: first in last out
  //stacks uses push, pop
  //storage is a stack that is storing nodes
  let storage = [];
  //node pair stores node, whether it is a left or right child of its immediate parent, and the parent node value
  let nodeTrio = [node,null,null]
  storage.push(nodeTrio);
  while(storage.length > 0){
    //push right, push  left, then pop one off (it will be the left one)
    let currentNodeTrio = storage.pop();

    //the check
    if(currentNodeTrio[1] === 'right'){
      console.log('right')
      if(currentNodeTrio[0].value < currentNodeTrio[2]){
        return false;
      }
    }else if(currentNodeTrio[1] === 'left'){
            console.log([currentNodeTrio[0].value,currentNodeTrio[2]])

      if(currentNodeTrio[0].value > currentNodeTrio[2]){
        return false;
      }
    }

    //adding the right and left
    if(currentNodeTrio[0].right){
      storage.push([currentNodeTrio[0].right,'right', currentNodeTrio[0].value])
    }

    if(currentNodeTrio[0].left){
      storage.push([currentNodeTrio[0].left,'left', currentNodeTrio[0].value])
    }
  }
  return true;
}


//the above is storing a lot of extra information in memory because we'd have to store the whole chain above the child
//we can do better, we can just track upper and lower bound that a node needs to be



//use dfs, but keep track of a lower and upper bound
//starting from root, if we go left, the root is our new upperbound, and we keep the same lowerbound(which is -Infinity)
//if we go right, we keep the same upper bound,
//and change the new lower bound
function dfs(node){
  //dfs uses a stack: first in last out
  //stacks uses push, pop
  //storage is storing nodes
  let storage = [];
  //node pair stores node, upper, and lower bound
  let nodeTrio = {node:node,upperBound:Infinity,lowerBound:-Infinity}
  storage.push(nodeTrio);
  while(storage.length > 0){

    let currentNodeTrio = storage.pop();
    // console.log(currentNodeTrio)
    if(currentNodeTrio['node'].value > currentNodeTrio['upperBound'] || currentNodeTrio['node'].value < currentNodeTrio['lowerBound'] ){
     return false;
    }

    //add left and right
    if(currentNodeTrio['node'].right){
      storage.push({node:currentNodeTrio['node'].right,upperBound:currentNodeTrio['upperBound'] ,lowerBound:currentNodeTrio['node'].value})
    }

    if(currentNodeTrio['node'].left){
      storage.push({node:currentNodeTrio['node'].left,upperBound: currentNodeTrio['node'].value, lowerBound: currentNodeTrio['lowerBound'] })
    }
  }
  return true;
}



//use a stack for parsing!

//'(hi my) name is (matthew hu(and)))'
function parens(str){
  //brute force: loop through string to track left parens,

  let removeList = [];
  //if we run into a ")" and the parensStack is empty, put that index in the removeList right away
  let parensStack = [];
  //data structure for holding indices of parens
  //stack?
  //every time encounter a ), push in index into parensStack, and pop off two
  for(let i = 0; i < str.length; i++){
    if(str[i] === "("){
      parensStack.push(i);
    }else if(str[i] === ")" && !parensStack.length){
      removeList.push(i);
    }else if(str[i] === ")"){
      //pop off two
      parensStack.push(i)
      parensStack.pop();
      parensStack.pop();
    }
  }
  removeList.push(...parensStack);
  return remove(str,removeList);
}

//remove indices from str as designated by the integers in the array
//return new string
function remove(str,arr){
  //create new string
  let result = '';
  for(let i=0;i < str.length;i++){
    if(arr[0] !== i){
       result += str[i]
    }else{
      arr.shift()
    }

  }
  return result;
}


function remove2(str,arr){
  let shift = 0;
  //loop through arr and slice str at each index


  arr.forEach(index=> {
    index = index - shift;
    str = str.slice(0,index) + str.slice(index+1,str.length)
    shift+=1;
  })
  return str
}




//k closest distances from the origin
//nlgn time

function euc2(points,k){
  //create a new array and store distance with each point
  //sort new array by distance (merge sort)
  //take the first k
  //get rid of distances

  let result = points;
  result.forEach((point,idx) => {
    let distance1 = distance(point);
    result[idx] = [point,distance1];

  })
  //sort result
  result = mergeSort(result);
  result = result.slice(0,k);
  return result.map(result=>{
    return result[0]
  });
}

function distance(points){
  return (points[0]**2 + points[1]**2)**0.5;
}

function mergeSort(arr){
  if(arr.length === 1){
    return arr;
  }

  let left = arr.slice(0, Math.floor(arr.length/2));
  let right = arr.slice(Math.floor(arr.length/2),arr.length);

  return merge(mergeSort(left),mergeSort(right));
}

function merge(arr1,arr2){
  let result = [];
  while(arr1.length && arr2.length){
    //compare first entries of each array
    if(arr1[0][1] > arr2[0][1]){
      result.push(arr2.shift());
    }else{
      result.push(arr1.shift())
    }
  }
  return result.concat(arr1).concat(arr2);
}



// Question 1: Given an input of an array of string, verify if, turned 180 degrees, it is the "same".
// For instance:
// [1, 6, 0, 9, 1] => return true
// [1, 7, 1] => return false

function twist(arr){
  //1, 8, 0, 6/9
  let start = -1;
  let end = arr.length ;
  while(start < end){
      start++;
    end--;
    if(arr[start] === 1 && arr[end] === 1){
      continue;
    }else if(arr[start] === 0 && arr[end] === 0){
      continue;
    }else if(arr[start] === 8 && arr[end] === 8){
      continue;
    }else if(arr[start] === 6 && arr[end] === 9 || arr[start] === 9 && arr[end] === 6){
      continue;
    }else{
      return false;
    }



  }
  return true;

}




//nth fibonnaci, but with less space than the naive recursive solution


function naivefib(n){
  //1,1,2,3,5,8
  if(n === 1){
    return 1;
  }else if(n === 2){
    return 1;
  }
  return fib(n-2) + fib(n-1)
}

function fib(n){
  if(n === 1){
    return 1;
  }else if(n === 2){
    return 1;
  }

  let last = 1;
  let secondLast = 1;
  let current;
  for(let i=3;i <=n;i++){
    current = last + secondLast;
    last = secondLast;
    secondLast = current;
  }
  return current;
}





// Implement a queue ↴ with 2 stacks. ↴ Your queue should have an enqueue and a dequeue method and it should be "first in first out" (FIFO).
//complexity is O(n) for n number of calls
//the reversal when the stack 2 is empty is expensive
//but every other dequeue is O(1)

function queueClass(){
  this.stack1 = [];
  this.stack2 = [];
}

//
queueClass.prototype.enqueue = function(value){
  this.stack1.push(value)
}


//if stack2 is empty, reverse the stacks
//but otherwise, we can just pop off stack2 
queueClass.prototype.dequeue = function(){
  //we need to get the first element out of stack1
  //but we can only use pop

  //check if stack2 has elements, if it does, just pop off(skip the reverse elements)
  if(this.stack2.length === 0){
    while(this.stack1.length){
      this.stack2.push(this.stack1.pop());
    }
  }

  return this.stack2.pop();

}

let a = new queueClass();
a.enqueue(3)
a.enqueue(4)
