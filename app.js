class Graph {
  constructor(v) {
    this.adj = new Array(v);
  }

  connect(v, w) {
    if(!this.adj[v]) this.adj[v] = [];
    this.adj[v].push(w);
  }

  getList(v) {
    return this.adj[v];
  }
}

class Board {
  constructor() {
    this.graph = new Graph(64);
    this.width = 8;
  }

  makeBoard() {
    for(let row = 0; row < this.width; row++) {
      for(let col = 0; col < this.width; col++) {
        if(row - 2 >= 0 && col - 1 >= 0) this.graph.connect(this.convertToIndex(row, col), this.convertToIndex(row - 2, col - 1));
        if(row - 2 >= 0 && col + 1 < this.width) this.graph.connect(this.convertToIndex(row, col), this.convertToIndex(row - 2, col + 1));
        if(row + 2 < this.width && col - 1 >= 0) this.graph.connect(this.convertToIndex(row, col), this.convertToIndex(row + 2, col - 1));
        if(row + 2 < this.width && col + 1 < this.width) this.graph.connect(this.convertToIndex(row, col), this.convertToIndex(row + 2, col + 1));
        if(row - 1 >= 0 && col - 2 >= 0) this.graph.connect(this.convertToIndex(row, col), this.convertToIndex(row - 1, col - 2));
        if(row - 1 >= 0 && col + 2 < this.width) this.graph.connect(this.convertToIndex(row, col), this.convertToIndex(row - 1, col + 2));
        if(row + 1 < this.width && col - 2 >= 0) this.graph.connect(this.convertToIndex(row, col), this.convertToIndex(row + 1, col - 2));
        if(row + 1 < this.width && col + 2 < this.width) this.graph.connect(this.convertToIndex(row, col), this.convertToIndex(row + 1, col + 2));
      }
    }
  }

  getPath(start, end) {
    let startIndex;
    let endIndex;
    try {
      startIndex = this.convertToIndex(start[0], start[1]);
      endIndex = this.convertToIndex(end[0], end[1]);
    } catch (e) {
      console.log(e);
      return;
    }
  
    const queue = [startIndex];
    const edgeTo = new Array(64);
    const marked = new Array(64);
    marked[startIndex] = true;

    let current = queue.shift();
    while(current !== endIndex) {
      const adj = this.graph.getList(current);
      let found = null;
      for(let v of adj) {
        if(!marked[v]) {
          marked[v] = true;
          edgeTo[v] = current;
        }
        if(v === endIndex) found = v;
        queue.push(v);
      }
      if(found) current = found;
      else current = queue.shift();
    }

    const path = [this.convertToCoordinates(endIndex)];
    while(current !== startIndex) {
      path.unshift(this.convertToCoordinates(edgeTo[current]));
      current = edgeTo[current];
    }
    return path;
  }

  convertToIndex(row, col) {
    if(row < 0 || row >= this.width || col < 0 || col >= this.width) throw new Error("Out of bounds");
    return row * this.width + col;
  }

  convertToCoordinates(index) {
    return [Math.floor(index / this.width), index % this.width];
  }
}

const b = new Board();
b.makeBoard();
console.log(b.graph.getList(27));
console.log(b.convertToCoordinates(8));
const path = b.getPath([0, 0], [0, 1]);
console.log(`You made it in ${path.length} moves:`)
for(let v of path) console.log(v);