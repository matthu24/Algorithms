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
