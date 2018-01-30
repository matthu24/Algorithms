//implement a stack
//js already has stack built into array class

let stack = [];
stack.push(1);
stack.push(2);
stack.push(3);

stack.pop(); //3
stack.pop(); //2
stack.pop(); //1
//stack is LIFO
//stack is now empty





//Implement a queue
//first in first out

let queue = [];
queue.push(1);
queue.push(2);
queue.push(3);

//queue is now [1,2,3]
//need to take the first off

queue.shift();//1
queue.shift();//2
queue.shift();//3

//queue is now empty
