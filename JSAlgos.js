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
