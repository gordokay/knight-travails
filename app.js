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
  

  convertToIndex(row, col) {
    return row * this.width + col;
  }
}

const b = new Board();
b.makeBoard();