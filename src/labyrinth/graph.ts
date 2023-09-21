

export class Graph {
    adjacencyList: Map<string, {node: string, weight: number}[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex: string) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1: string, vertex2: string, weight: number) {
        this.adjacencyList.get(vertex1).push({node: vertex2, weight: weight});
        this.adjacencyList.get(vertex2).push({node: vertex1, weight: weight});
    }

    generateSquareGrid(width: number, height: number) {
        for (let iw = 0; iw < width; iw++) {
            for (let ih = 0; ih < height; ih++) {
                const vertex = `${iw},${ih}`;
                this.addVertex(vertex);

                // Connect with the left node
                if (iw > 0) {
                    const leftVertex = `${iw - 1},${ih}`;
                    const weight = Math.floor(Math.random() * 100) + 1;
                    this.addEdge(vertex, leftVertex, weight);
                }
                // Connect with the top node
                if (ih > 0) {
                    const topVertex = `${iw},${ih - 1}`;
                    const weight = Math.floor(Math.random() * 100) + 1;
                    this.addEdge(vertex, topVertex, weight);
                }
            }
        };
    }   

    printGraph(): void {
        for (let [vertex, neighbors] of this.adjacencyList) {
            const neighborsStr = neighbors.map(neighbor => `${neighbor.node}(${neighbor.weight})`).join(', ');
            console.log(`${vertex} -> ${neighborsStr}`);
        }
    }
}

