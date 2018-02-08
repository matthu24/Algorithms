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
