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
