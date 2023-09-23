

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

    printGraph(): void {
        console.log(`The grid with center at ${this.center} has the following graph:`);
        super.printGraph();
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

    drawNode(p: p5, node: string, intensity: number = 100) {
        const nodeCoords = this.vertCoordinates.get(node);
        p.ellipse(nodeCoords[0], nodeCoords[1], this.x_step / 3, this.y_step / 3);
        p.fill(intensity);
    }

    drawEdge(p: p5, 
        node1: string, node2: string, edge: {node: string, weight: number}, 
        direction: string) {
        const node1Coords = this.vertCoordinates.get(node1);
        const node2Coords = this.vertCoordinates.get(node2);
        p.line(node1Coords[0], node1Coords[1], node2Coords[0], node2Coords[1]);
        p.stroke(50);
        // stroke weight is equal to ellipse diameter
        if (direction == "x") {
            p.strokeWeight(this.x_step / 3);
        }
        else {
            p.strokeWeight(this.y_step / 3);
        }
        p.textSize(20);
                p.textAlign(p.CENTER, p.CENTER);
                p.text(edge.weight, 
                    (node1Coords[0] + node2Coords[0]) / 2, 
                    (node1Coords[1] + node2Coords[1]) / 2);
    }

    private setLabyrinthStart(p: p5) {
        let startNode = this.getVertexKey(this.center);
        this.drawNode(p, startNode, 255);
        console.log(`Starting at ${startNode}`)
        let activeNodes: Array<string> = [];
        let visited: Array<string> = [];
        visited.push(startNode);
        // add all 4 neighbors, draw vertices and edges, determine direction
        const neighbors = this.adjacencyList.get(startNode);
        neighbors.forEach(neighbor => {
            const neighborCoords = this.vertCoordinates.get(neighbor.node);
            this.drawNode(p, neighbor.node);
            // if direction is x, draw horisontal edge, otherwise vertical
            const direction = neighborCoords[0] == this.center[0] ? "x" : "y";
            this.drawEdge(p, startNode, neighbor.node, neighbor, direction);
            activeNodes.push(neighbor.node);
            visited.push(neighbor.node);
        });
        return [activeNodes, visited];
        
    }

    drawPrimsLabyrinth(p: p5) {
        // setting labyrinth start
        let [activeNodes, visited] = this.setLabyrinthStart(p);
        
        let totalWight = 0;
        while (activeNodes.length > 0) {
            let activeNode = activeNodes[Math.floor(Math.random() * activeNodes.length)];
            let availableNeighbors = (
                this.adjacencyList.get(activeNode)
                .filter(neighbor => !visited.includes(neighbor.node)));

            // check if there are any available neighbors
            if (availableNeighbors.length > 0) {
                // get an edge with lowest weight
                let nextEdge = availableNeighbors.reduce((prev, curr) => {
                    return prev.weight < curr.weight ? prev : curr;
                });
                // draw edge
                const activeNodeCoords = this.vertCoordinates.get(activeNode);
                const nextNodeCoords = this.vertCoordinates.get(nextEdge.node);
                const direction = activeNodeCoords[0] == nextNodeCoords[0] ? "x" : "y";
                this.drawEdge(p, activeNode, nextEdge.node, nextEdge, direction);
                // add the weight to the total weight
                totalWight += nextEdge.weight;
                console.log(`Adding edge ${activeNode} -> ${nextEdge.node} with weight ${nextEdge.weight}`);
                // add the edge to the visited set
                visited.push(nextEdge.node);
                // draw the edge
                this.drawNode(p, nextEdge.node);
                // add the neighbor to the active nodes
                activeNodes.push(nextEdge.node);
            }
            else {
                // remove the node from the active nodes
                activeNodes = activeNodes.filter(node => node != activeNode);
            }
        }
        // draw the graph only once, do not redraw it
    }

}


