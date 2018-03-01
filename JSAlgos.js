const isPrime = num => {
  if (num < 2) {
    return false
  }
  for (var i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

//find all prime factors of a number
const primeFactors = num => {
  let result = [];
  for (var i = 2; i < num; i++) {
    if (num % i === 0 && isPrime(i)) {
      result.push(i)
    }
  }
  return result;
}

//1,1,2,3,5,8
//O(n) time complexity, constant space complexity
const fibonnaci = n => {
  let prev = 1;
  let second_prev = 1;
  let new_num;
  let temp;
  for (var i = 3; i <= n; i++) {
    new_num = prev + second_prev;
    temp = prev;
    prev = new_num;
    second_prev = temp;
  }
  return new_num;
}

const recursiveFib = n => {
  if (n === 2) {
    return 1;
  }
  if (n === 1) {
    return 1;
  }
  return recursiveFib(n-1) + recursiveFib(n-2);
}
//if n === 4, recursiveFib(3) + recursiveFib(2)
//recursiveFib(3) + 1
// 2 + 1 = 3


// Question: How would you find the greatest common divisor of two numbers?
//9 and 6 => 3
const gcd = (a,b) => {
  let min = a > b ? b : a;
  while (min > 0) {
    if (a % min === 0 && b % min === 0) {
      return min;
    }
    min-=1;
  }
}


//remove duplicates
const duplicates = arr => {
  let newArray = [];
  arr.forEach(el => {
    if (!newArray.includes(el)) {
      newArray.push(el)
    }
  })
  return newArray;
}


//merge two sorted arrays

function merge(a,b) {
  let merged = [];
  // let i = 0;
  while (a.length > 0 && b.length > 0) {
    if (a[0] > b[0]) {
      merged.push(b.shift())
    }else{
      merged.push(a.shift())
    }
  }
  return merged.concat(a).concat(b);

}



//reverse a  string in JS

function reverse(string){
  let reversed = '';
  for (var i = string.length-1; i >=0; i--) {
    reversed += string[i]
  }
  return reversed;
}



//find the first non repeating character

function firstNonRepeat(string){
  let charCount = {};
  for (var i = 0; i < string.length; i++) {
    if (charCount[string[i]]) {
      charCount[string[i]] += 1;
    }else{
      charCount[string[i]] = 1;
    }
  }
  for(var j in charCount){
    if(charCount[j] === 1) return j;
  }
}


//unsorted array of numbers from 1 to 100, one is missing. find it.

function missing(arr){
  let hash = {};
  arr.forEach(el => hash[el] = 1);
  for(let key = 1;key <= arr.length;key++){
    if (!hash[key]){
      return key;
    }
  }
}


function missing2(arr){
  let sum = 0;
  for (var i = 1; i <= arr.length+1; i++) {
    sum+=i;
  }
  let actualSum = 0;
  arr.forEach(el => actualSum+=el);
  return sum - actualSum;
}

//CANT BREAK OUT OF A FOREACH LOOP EVEN WITH RETURN!!
function twoSum(arr,target){
  let result = false;
  let hash = {};
  //to deal with doubles
  arr.forEach(el => {
    if(hash[el]){
      hash[el] += 1;
    }else{
      hash[el] = 1;
    }
  })
  arr.forEach(el => {
    let desired = target - el;
    if (hash[desired] && desired !== el) {
      result = true;
    }else if(hash[desired] > 1 && desired === target){
      result = true;
    }
  })
  return result;
}

const twoSum = (arr,target) => {
  //loop thru array and add to a values object, where the key is the arr element and the value is the arr element
  let values = {};
  for(let i = 0;i < arr.length; i++){
    values[arr[i]] = i;
  }
  for(let i = 0;i < arr.length; i++){
    let desired = target - arr[i]
   if(values[desired] && values[desired] !== i){
     return [i,values[desired]]
   }
  }
  return null;
}




function topSum(arr){
  let largest = null;
  let second = null;
  let temp;

  arr.forEach(el => {
    if (largest === null || el > largest) {
      temp = largest;
      largest = el;
      second = temp;

    }else if(second === null || el > second){
      second = el;
    }
  })
  return second + largest;
}

function countZeros(n){
  let result = 0;
  let divide;
  for (var i = 0; i <= n; i++) {
    divide = i / 10;
    if (divide % 1 === 0) {
      result += 1
    }
  }
  return result;
}

//rotate arr to the left n times
function leftRotation(arr,n){
  let start = arr.slice(n,arr.length);
  let begin = arr.slice(0,n);
  return start.concat(begin)
}



//setup a counter hash for both
//loop through each counter hash, find the respective key in the other hash, and add the difference to the counter
function anagrams(a,b){
  let count = 0;
  let hash1 = {};
  let hash2 = {};
  for(let i = 0; i < a.length; i++){
    if(hash1[a[i]]){
      hash1[a[i]] += 1;
    }else{
      hash1[a[i]] = 1;
    }
  }

  for(let j = 0; j < b.length; j++){
    if(hash2[b[j]]){
      hash2[b[j]] += 1;
    }else{
      hash2[b[j]] = 1;
    }
  }

  //find extra letters in a
  for(let key in hash1){
    if(hash2[key]){
      count+= Math.abs(hash1[key] - hash2[key])
    }else{
      count+=hash1[key]
    }
  }

  for(let key2 in hash2){
    if(!hash1[key2]){
      count+=hash2[key2]
    }
  }
  return count

}



//ransom note
//are the choices enough for me to make a target?
//both inputs are strings

function ransom(choices,target){
  let choicesHash = {}
  let targetHash = {}

  choices.split(" ").forEach(word => {
    if(choicesHash[word]){
      choicesHash[word] += 1;
    }else{
      choicesHash[word] = 1;
    }
  })

  target.split(" ").forEach(word => {
    if(targetHash[word]){
      targetHash[word] += 1;
    }else{
      targetHash[word] = 1;
    }
  })

  for(let key in targetHash){
    if(!choicesHash[key]){
      return false;
    }else if(choicesHash[key] < targetHash[key]){
      return false;
    }
  }
  return true;
}



// {[()]} yes
// {[(])} no
// {{[[(())]]}} yes

//matching bracket must be an odd number of spaces away

function brackets(string){
  let midpoint = string.length/2 //right midpoint
  let bracket;
  let counterbracket;
  let distance; //from midpoint
  let endpoint;
  for(let i=0;i < midpoint;i++){
    bracket = string[i];
    if(bracket === '{'){
      counterbracket = '}';
    }else if(bracket === '['){
      counterbracket = ']';
    }else if(bracket === '('){
      counterbracket = ')';
    }else{
      break
    }
  distance = midpoint - i;
  endpoint = midpoint + distance -1 ;
  if(string[endpoint] !== counterbracket){
    return false;
  }

  }
  return true;
}





//make a queue out of two stacks

function Stack(){
  this.stack = [];
}

Stack.prototype.push = function(val){
  return this.stack.push(val)
}

Stack.prototype.pop = function(){
   return this.stack.pop();
}

//two queues to make a stack
//queues dequeue from the beginning of the line
//

function queue(){
  this.inStack = new Stack();
  this.outStack = new Stack();
}

queue.prototype.enqueue = function(val){
  this.inStack.push(val);
}

queue.prototype.dequeue = function(){
  let length = this.inStack.stack.length
  for(let i = 0;i < length;i++){
    this.outStack.push(this.inStack.pop())
  }
  this.outStack.pop()

  //switch in stack and out stack after dequeueing
  let temp = this.inStack.stack;
  this.inStack.stack = this.outStack.stack;
  this.outStack.stack = temp;
}


//arr is sorted
//find middle index in arr and compare to the target
//if target is larger, get rid of the whole first half of the array and recurse, making sure to add the middle index
//if target is less, get rid of the second half and recurse
function bs(arr,target){

  let mid = Math.floor(arr.length/2);
  if(arr[mid] === target){
    return mid;
  }
  if(arr[mid] > target){
    return bs(arr.slice(0,mid),target);
  }else{
    return bs(arr.slice(mid,arr.length),target) + mid
  }
}



function bubbleSort(arr){
  let sorted = false;
  while(sorted === false){
    sorted = true;
    for(let i = 0; i < arr.length-1; i++){
      if(arr[i] > arr[i+1]){
        //switch
        //also make sorted equal false
        sorted = false;
        let temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
      }
    }
  }
  return arr;
}


//return the row of depth n
// 1
// 11
// 121
// 1331
// 14641
function pascal(n){
  if(n === 1){
    return [1]
  }else if(n === 2){
    return [1,1]
  }
  let result = [1]
  //assume n = 3
  let prev = pascal(n-1); //will return [1,1]
  for(let i = 0;i < prev.length-1;i++){
    result.push(prev[i] + prev[i+1])
  }
  result.push(1)
  return result

}



//most common string in array
function mostCommon(arr){
  //arr is array of strings
  //build a counter hash
  //loop through the hash and find the best
  let counter = {}
  arr.forEach(word => {
    if(counter[word]){
      counter[word] += 1;
    }else{
      counter[word] = 1;
    }
  })
  //counter hash is finished
  let result = arr[0];
  let mostCommonFrequency = 1
  for(let key in counter){
    if(counter[key] > mostCommonFrequency){
      mostCommonFrequency = counter[key];
      result = key;
    }
  }
  return result;
}


//bind apply an call
//prototypal inheritance
//map/reduce/filter/reduce/sort/etc
//create buttons inside a loop that would alert their index when clicked
//insert method for a binary search tree
//if it was a binary search tree
//

Array.prototype.myMap = function(cb){
  let result = [];
  this.forEach(el => {
    result.push(cb(el));
  })
  return result;
}

var array1 = [1, 4, 9, 16];

array1.myMap(el => el + 1)
//[2,5,10,17]


Array.prototype.myFilter = function(cb){
  let result = [];
  this.forEach(el => {
    if (cb(el)) {
      result.push(el)
    }
  })
  return result;
}

var array1 = [1, 4, 9, 16];

array1.myFilter(el => el > 4)
//[2,5,10,17]


Array.prototype.myReduce = function(cb){
  let accum = this[0];
  for(let i = 1; i < this.length; i++){
    //calling the callback and passing in accum and current el
    accum = cb(accum,this[i])
  }
  return accum;
}

a = [3,2,3]
a.myReduce((accum,el) => accum + el)


//create buttons inside a loop that would alert their index when clicked
//  window.onload = function() {
    //     for(var i = 1; i < 21; i++) {
    //         var button = document.createElement("button");
    //         var text = document.createTextNode(i);
    //         button.appendChild(text);
    //         button.addEventListener("click", function() {
    //            // get the clicked on button with this
    //            alert(this.firstChild.nodeValue);
    //         });
    //         document.body.appendChild(button);
    //     }
    // }
//find bst
//is binary search tree?



//given sorted array, do this in O(1) extra space
//loop through array, for each element, search the entire array up to that point
//if there is a repeat remove that element, and bring the counter back one, since we are deleting while iterating
function removeDuplicates(arr){
  //array.splice(index,number of elements you want to remove)
  for (var i = 0; i < arr.length; i++) {
    let duplicate = false;
    for(var j = 0; j < i; j++){
      if(arr[i] === arr[j]){
        duplicate = true;
      }
    }
    if (duplicate) {
      arr.splice(i,1);
      i -=1
    }

  }
  return arr
}


function stock(arr){
  //[4,6,3,6,4] returns [2,3]
  //loop thru each element in array, for each element have a nested array that searches for selling dates, keep track of largest profit and the indices
  let result = [0,1];
  let profit = arr[1]-arr[0];
  for(let i=0; i<arr.length; i++){
    for(let j=i+1;j < arr.length;j++){
      let newProfit = arr[j] - arr[i];
      if(newProfit > profit){
        profit = newProfit;
        result = [i,j]
      }
    }
  }
  return result;
}



//Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2, 2].

const intersection = (arr1,arr2) => {
  let frequency1 = {};
  let frequency2 = {};
  let result = [];

  arr1.forEach(el =>{
    if(frequency1[el]){
      frequency1[el] += 1
    }else{
      frequency1[el] = 1
    }
  })

  arr2.forEach(el => {
    if(frequency2[el]){
      frequency2[el] += 1;
    }else{
      frequency2[el] = 1;
    }
  })

  //iterate through frequency1 and look up each key in frequency2
  //if it exists

  for(let key in frequency1){
    if(frequency2[key]){
      let value1 = frequency1[key];
      let value2 = frequency2[key];
      let difference = Math.abs(value2-value1);
      let intersection = Math.max(value1,value2)-difference;
      for(let i = 0;i < intersection; i++){
        result.push(parseInt(key))
      }
    }
  }
  return result

}



const transpose = arr => {
  //iterate through each element, above the central diagonal of the matrix, and switcch with the element that has the opposite row, col ccoordinates

  for(let row = 0; row < arr.length; row++){
    let col = row;
    while(col < arr.length){
      let temp = arr[row][col];
      arr[row][col] = arr[col][row];
      arr[col][row] = temp;
      col+=1
    }
  }
  return arr
}



//must be in place
function remove_zeroes(arr){
  let counter = 0
  for(let i = 0;i < arr.length;i++){
    //only make as many iterations as there are arr elements
    if(counter >= arr.length-1){
      return arr;
    }

    //if hit a zero, delete and shift everything, decrement index
    if(arr[i] === 0){
      arr.splice(i,1);
      arr[arr.length] = 0
      i -= 1
    }

    //increment counter
    counter+=1
  }

  return arr
}


//return true if no repeats

const noRepeats = arr => {
  let seen = {};
  for(let i = 0;i < arr.length; i++){
    if(seen[arr[i]]){
      return false;
    }else{
      seen[arr[i]] = true;
    }
  }
  return true;
}


// Given an array of integers, every element appears twice except for one. Find that single one.

const single = arr => {
  let counter = {};
  arr.forEach(el => {
    if(counter[el]){
      counter[el] += 1;
    }else{
      counter[el] = 1;
    }
  });
  for(let key in counter){
    if(counter[key] === 1){
      return parseInt(key)
    }
  }
}






//3 sum to zero
// For example, given array S = [-1, 0, 1, 2, -1, -4],

// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

//


 //loop thru arr, for each element, do two sum
const ThreeSum = arr => {
  let result = [];
  for(let i=0;i < arr.length;i++){
    let target = -arr[i];
    let arrayCopy = arr.slice(0);
    arrayCopy.splice(i,1);
    let twoSumResult = twoSum(arrayCopy,target);
    if(twoSumResult){
      result.push([arr[i]].concat(twoSumResult));
    }
  }
  return removeRepeats(result);

}


const twoSum = (arr,target) => {
  //loop thru array and add to a values object, where the key is the arr element and the value is the arr element
  let values = {};
  for(let i = 0;i < arr.length; i++){
    values[arr[i]] = i;
  }
  for(let i = 0;i < arr.length; i++){
    let desired = target - arr[i]
   if(values[desired] && values[desired] !== i){
     return [arr[i],arr[values[desired]]]
   }
  }
  return null;
}


const removeRepeats = (arr) => {
  let hash = {}
  let result = [];
  for(let i=0;i < arr.length;i++){
    hash[arr[i].sort()] = true;
  }
  for(let key in hash){
    key = key.split(',');

    result.push(key);
  }
  result.forEach(sub => {
    for(let i = 0;i < sub.length; i++){
      sub[i] = parseInt(sub[i])
    }
  })
  return result;

}



// Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in place.

const matrix = (arr) => {
  //iterate thru arr, locate all zeros and store in an a separate array
  //iterate thru separate array and set arr rows/cols to zero for each location
  let locations = [];
  for(let row=0;row < arr.length;row++){
    for(let col=0;col< arr[row].length;col++){
      if(arr[row][col] === 0){
        locations.push([row,col])
      }
    }
  }

  let row0,col0;
  //locations array filled
  locations.forEach(location => {
    row0 = location[0];
    col0 = location[1];
    for(let idx = 0;idx < arr[row0].length;idx++){
      arr[row0][idx] = 0;
    }

    for(let idx2 = 0; idx2 < arr.length;idx2++){
      arr[idx2][col0] = 0;
    }

  })
  return arr;

}
