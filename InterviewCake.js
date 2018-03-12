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
