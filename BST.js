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


//this is not right!
function isBST(node){
   //basecase, if node.left && node.right both don't exist, return true
  //for each node, check left and right and compare to node,
  //if they are not smaller and bigger respectively, return false
   //iterate through each node recursively

  if(!node.left && !node.right){
    return true;
  }
  if(node.left && node.left.value > node.value){
    return false;
  }else if(node.right && node.right.value < node.value){
    return false;
  }
  if(node.left){
    isBST(node.left)
  }
  if(node.right){
    isBST(node.right)
  }
  return true;
}

//given two nodes, find the lowest common ancestor
function lowestCommonAncestor(node1,node2,root){
  //return common Ancestor if node1 is greater AND node2 is less //OR node1 is less AND node2 is greater
  //if not, keep going down tree, if both node 1 and node 2 are greater than or both are less than the common ancestor
  let commonAncestor = root;
  while((commonAncestor.value > node1.value && commonAncestor.value > node2.value) || (commonAncestor.value < node1.value && commonAncestor.value < node2.value ) ){
    if(commonAncestor.value > node1.value){
      commonAncestor = commonAncestor.left;
    }else{
      commonAncestor = commonAncestor.right;
    }
  }
  return commonAncestor;
}





//binary search tree DFS
function BinaryTreeNode(value) {
  this.value = value;
  this.left  = null;
  this.right = null;
}



function dfsRecursive(node){
if(!node.left && !node.right){
  console.log(node.value)
  return;
}
console.log(node.value);

if(node.right){
  dfsRecursive(node.right)
}
  if(node.left){
  dfsRecursive(node.left)
}
}


function dfs(node) {
let result = []
let nodes = []
nodes.push(node);
while(nodes.length){
  let popped = nodes.pop();
  result.push(popped.value);
  if(popped.left){
    nodes.push(popped.left);
    // console.log(popped.left)
  }
  if(popped.right){
    nodes.push(popped.right);
    // console.log(popped.right);
  }
}

console.log(result)


}
