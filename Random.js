//binary search
//start from middle and compare with target
//if middle is higher, get rid of the whole right half
//if it is lower, get rid of whole left half but add the index
//it's recursive

//example: [1,3,4,7], target = 7
//mid is idx 2

//example: [1,3,4]
//mid is idx 1

function binarySearch (arr,target){
  let mid = Math.floor(arr.length/2)
  if(arr[mid] === target){
    return mid;
  }else if(arr[mid] > target){
    return binarySearch(arr.slice(0,mid),target)
  }else{
    return binarySearch(arr.slice(mid,arr.length),target) + mid
  }
}

//find kth most frequent number in array
//make frequency hash table
//convert to array
//sort by frequency
//grab the kth element
//return the number

function kth(arr,k){
  let frequency = {};
  arr.forEach((el,idx) => {
    if(frequency[el]){
      frequency[el] += 1;
    }else{
      frequency[el] = 1;
    }
  })

  let frequencyArray = Object.entries(frequency);
  frequencyArray = frequencyArray.sort(function(a,b){
    return a[1] < b[1]
  })
  //if grabbing the second most frequent number: grab index 1
  return parseInt(frequencyArray[k-1][0])
}
