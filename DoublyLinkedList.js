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
