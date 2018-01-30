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




//create a singly linked list
function LinkedList(){
  this.head = null;
}

LinkedList.prototype.push = function(val) {
  var node = {
    value: val,
    next: null
  }
  //this.head doesn't exist yet
  if (!this.head) {
    this.head = node;
  }else{
    //this.head exists already
    //loop to last in linkedlist
    let current = this.head;
    while (current.next) {
      current = current.next
    }
    current.next = node
  }
}
//Removing a node-  first you need to find it
//If you want to remove a node from your linked list you have to find the node. There are three conditions here
// case -1: your targeted node is in the head. you have to replace the head with the next node
// case -2: your targeted node is in the tail. you just have to remove it from the tail. Hence next of the node before the tail will be null.
// case-3: your targeted node is in the middle of the LinkedList, you have to make the node after your targeted node to be the next node of the node before your targeted node.
LinkedList.prototype.remove = function(val) {
  let current = this.head
  //if head is the specified value
  if (current.value === val) {
    let newHead = current.next
    this.head = newHead;
  }else{
    //loop through list
    let previous = current;
    while (current.next) {
      current = current.next
      if (current.value == val) {
        //we've found the specified value in the middle of the list
        //we want to get rid of it
        previous.next = current.next
        break;
      }
    }
    //at this point, if we've exited the loop, which could mean two things:
    //1. we reached the end of the list
    //2. we found the value and deleted it
    //let's make a conditional for the last node in the list
    if (current.value === val) {
      previous.next = null;
    }
  }
}
