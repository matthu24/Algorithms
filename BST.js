//most optimized data structure
//find insert and delete are all log(n) time complexity!


function Node(val){
  this.value = val;
  this.left = null;
  this.right = null;
}


function BST() {
  this.root = null;
}

//1. if root node doesn't exist, then push onto root
//2. make a new node, as well as a current variable that points to the current node
//3. traverse tree
BST.prototype.push = function(val){
  let newNode = new Node(val);
  if (!this.root) {
    this.root = newNode;
    return;
  }
  let current = this.root;
  while(current){
    //case where val is less than the current node
    //go left
    if (current.value > val) {
      if (current.left) {
        current = current.left
      }else {
        current.left = newNode
        return;
      }
      //case where val is greater than or equal to the current node
    }else{
      if (current.right) {
        current = current.right
      }else{
        current.right = newNode;
        return;
      }
    }
  }
}

// return the node with the same val
BST.prototype.find = function(val){
  let current = this.root;

  while (current) {
    if (val === current.value) {
      return current;
    }
    //go left, getting rid of everything on the right
    if (val < current.value) {
      current = current.left;
    }else{
      current = current.right;
    }
  }
  return;
}


//return maximum node

BST.prototype.maximum = function(){
  let current = this.root;
  while (current.right) {
    current = current.right
  }
  return current;
}

//find depth of bst
//depth is defined as the longest path from root to any leaf
//input the root of the tree for node
function depth(node){
  //basecase
  if (!node) {
    return 0;
  }
  
  let leftHeight = depth(node.left);
  let rightHeight = depth(node.right);
  //adding one is a counter for each iteration
  return Math.max(leftHeight,rightHeight) + 1;
}
