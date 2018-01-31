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
