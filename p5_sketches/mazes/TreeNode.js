class TreeNode {
  constructor(index, value) {
    this.index = index;
    this.value = value;
    
    this.neighbours = [];
  }
}

TreeNode.prototype.toString = function() {
  return this.value.toString()
}