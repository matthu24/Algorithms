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