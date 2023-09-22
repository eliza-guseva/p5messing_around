

export type PlaneCoord = [x: number, y:number];

export function genWeight(start: PlaneCoord, end: PlaneCoord): number {
    return Math.floor(Math.random() * 100) + 1;
}


export class Graph {
    adjacencyList: Map<string, 
                    {node: string, weight: number}[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    getVertexKey(vertex: PlaneCoord): string {
        return vertex.toString();
    }

    StringToVertex(vertexStr: string): PlaneCoord {
        return vertexStr.split(',').map(Number) as PlaneCoord;
    }

    addVertex(vertex: PlaneCoord) {
        const vertexKey = this.getVertexKey(vertex);
        if (!this.adjacencyList.has(vertexKey)) {
            this.adjacencyList.set(vertexKey, []);
        }
    }

    addEdge(vertex1: PlaneCoord, vertex2: PlaneCoord, weight: number) {
        const vertex1Key = this.getVertexKey(vertex1);
        const vertex2Key = this.getVertexKey(vertex2);
        this.adjacencyList.get(vertex1Key).push({node: vertex2Key, weight: weight});
        this.adjacencyList.get(vertex1Key).push({node: vertex2Key, weight: weight});
    }

    printGraph(): void {
        for (let [vertex, neighbors] of this.adjacencyList) {
            const neighborsStr = neighbors.map(neighbor => `${neighbor.node}(${neighbor.weight})`).join(', ');
            console.log(`${vertex} -> ${neighborsStr}`);
        }
    }
}


export class SquareGrid extends Graph {
    center: PlaneCoord;
    vertCoordinates: Map<string, PlaneCoord>;
    x_step: number;
    y_step: number;
    x_offset: number;
    y_offset: number;

    constructor(width: number, height: number, p: p5) {
        super();
        this.center = [Math.ceil(width / 2), Math.ceil(height / 2)];
        this.x_step = p.windowWidth / width;
        this.y_step = p.windowHeight / height;
        this.x_offset = this.x_step / 2;
        this.y_offset = this.y_step / 2;
        this.generateSquareGrid(width, height);
        this.vertCoordinates = this.generateSquareDistances(
            width, height);
    }

    generateSquareGrid(width: number, height: number) {
        for (let iw = 0; iw < width; iw++) {
            for (let ih = 0; ih < height; ih++) {
                const vertex: PlaneCoord = [iw, ih];
                this.addVertex(vertex);

                // Connect with the left node
                if (iw > 0) {
                    const leftVertex: PlaneCoord = [iw - 1, ih];
                    const weight = genWeight(vertex, leftVertex);
                    this.addEdge(vertex, leftVertex, weight);
                }
                // Connect with the top node
                if (ih > 0) {
                    const topVertex: PlaneCoord = [iw, ih - 1];
                    const weight = genWeight(vertex, topVertex);
                    this.addEdge(vertex, topVertex, weight);
                }
            }
        };
    } 

    generateSquareDistances(
        width: number, // number of nodes in x direction
        height: number, // number of nodes in y direction
        ) {
        // create empty map str -> PlaneCoord
        let vertices_coords = new Map<string, PlaneCoord>();
        for (let iw = 0; iw < width; iw++) {
            for (let ih = 0; ih < height; ih++) {
                vertices_coords.set(
                    this.getVertexKey([iw, ih]), 
                    [this.x_offset + iw * this.x_step, this.y_offset + ih * this.y_step]);
        } 
        }
        return vertices_coords;
    }

    drawPrimsLabyrinth(p: p5) {
        let startNode = this.getVertexKey(this.center);
        let startCoords = this.vertCoordinates.get(startNode);
        p.ellipse(startCoords[0], startCoords[1], this.x_step / 3, this.y_step / 3);
        p.fill(255);

        const nodes = this.adjacencyList.keys();
        const visited: Set<string> = new Set();
        const edgeList: { node: string, weight: number, from: string }[] = [];

        visited.add(startNode);
        let totalWeight = 0;

        this.adjacencyList.get(startNode).forEach(edge => {
            edgeList.push({ ...edge, from: startNode });
        });

        while (edgeList.length > 0) {
            edgeList.sort((a, b) => a.weight - b.weight);
            const nextEdge = edgeList.shift();

            if (!visited.has(nextEdge.node)) {
                visited.add(nextEdge.node);
                p.ellipse(
                    this.vertCoordinates.get(nextEdge.node)[0], 
                    this.vertCoordinates.get(nextEdge.node)[1], 
                    this.x_step / 3, 
                    this.y_step / 3
                );
                p.fill(100);

                totalWeight += nextEdge.weight;
                console.log(`Edge added: ${nextEdge.from} - ${nextEdge.node}, weight: ${nextEdge.weight}`);
                this.adjacencyList.get(nextEdge.node).forEach(edge => {
                    if (!visited.has(edge.node)) {
                        edgeList.push({ ...edge, from: nextEdge.node });
                    }
                });
            }
        }

    }
}

