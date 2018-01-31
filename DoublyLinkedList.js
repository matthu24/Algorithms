function DLinkedList(){
  this.head = null;
}

DLinkedList.prototype.push = function(val){
  let head = this.head
  let current = head;
  let previous = head;
  if (!head) {
    this.head = {
      value: val,
      previous: null,
      next: null
    }
  }else{
    //traverse the list until current is null
    //when current is null, that means previous is the last node.  we will push onto previous' next
    current = current.next
    while (current) {
      current = current.next
      previous = previous.next
    }
    previous.next = {value: val, previous: previous, next: null}
  }
}



//reverse doubly linked list without using space
//traverse list and switch previous with next for each node
//when reach the end, assign the last node to this.head
function reverseDLL(dll) {
  let current = dll.head;
  let temp;
  while (current) {
    //switch
    temp = current.next;
    current.next = current.previous;
    current.previous = temp;
    //assign the last node in list as head
    if (!temp) {
      dll.head = current;
    }
    //at the end of the list, the current will be null and break out of loop
    current = temp;
  }
  return dll;
}


//delete node from doubly linked list
//input is value of node we want to delete
DLinkedList.prototype.remove = function(val){
  let current = this.head;
  let previous;
  //remove the head
  if (val === current.value) {
    this.head = current.next;
    //need to check if after removing the head there is anything else in the list
    if(this.head) this.head.previous = null;
    return;
  }else {
    //traverse the list
    previous = current;
    current = current.next;
    while (current) {
      //make sure current is not the last node 
      if (current.value === val && current.next) {
        let next = current.next
        previous.next = next;
        next.previous = previous;
        return;
      }
      current = current.next
      previous = previous.next
    }
    //account for the last node
    //if we reach this point, we are at the last node
    if (previous.value === val ) {
      previous.previous.next = null;
      return;
    }
    return;
  }
}
