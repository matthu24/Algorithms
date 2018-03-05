//Example of Greedy approach!
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
