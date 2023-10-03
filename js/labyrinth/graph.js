"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquareGrid = exports.Graph = exports.genWeight = void 0;
function genWeight(start, end) {
    return Math.floor(Math.random() * 100) + 1;
}
exports.genWeight = genWeight;
class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }
    getVertexKey(vertex) {
        return vertex.toString();
    }
    StringToVertex(vertexStr) {
        return vertexStr.split(',').map(Number);
    }
    addVertex(vertex) {
        const vertexKey = this.getVertexKey(vertex);
        if (!this.adjacencyList.has(vertexKey)) {
            this.adjacencyList.set(vertexKey, []);
        }
    }
    addEdge(vertex1, vertex2, weight) {
        const vertex1Key = this.getVertexKey(vertex1);
        const vertex2Key = this.getVertexKey(vertex2);
        this.adjacencyList.get(vertex1Key).push({ node: vertex2Key, weight: weight });
        this.adjacencyList.get(vertex2Key).push({ node: vertex1Key, weight: weight });
    }
    printGraph() {
        for (let [vertex, neighbors] of this.adjacencyList) {
            const neighborsStr = neighbors.map(neighbor => `${neighbor.node}(${neighbor.weight})`).join(', ');
            console.log(`${vertex} -> ${neighborsStr}`);
        }
    }
}
exports.Graph = Graph;
class SquareGrid extends Graph {
    constructor(nXnodes, nYnodes, p) {
        super();
        this.center = [Math.floor(nXnodes / 2), Math.floor(nYnodes / 2)];
        this.x_step = p.windowWidth / (nXnodes - 1);
        this.y_step = p.windowHeight / (nYnodes - 1);
        this.pathXwidth = this.x_step / 2.5;
        this.pathYwidth = this.y_step / 2.5;
        this.x_offset = 0;
        this.y_offset = 0;
        this.generateSquareGrid(nXnodes, nYnodes);
        this.vertCoordinates = this.generateSquareDistances(nXnodes, nYnodes);
    }
    printGraph() {
        console.log(`The grid with center at ${this.center} has the following graph:`);
        super.printGraph();
    }
    generateSquareGrid(nXnodes, nYnodes) {
        for (let iw = 0; iw < nXnodes; iw++) {
            for (let ih = 0; ih < nYnodes; ih++) {
                const vertex = [iw, ih];
                this.addVertex(vertex);
                if (iw > 0) {
                    const leftVertex = [iw - 1, ih];
                    const weight = genWeight(vertex, leftVertex);
                    this.addEdge(vertex, leftVertex, weight);
                }
                if (ih > 0) {
                    const topVertex = [iw, ih - 1];
                    const weight = genWeight(vertex, topVertex);
                    this.addEdge(vertex, topVertex, weight);
                }
            }
        }
        ;
    }
    generateSquareDistances(width, height) {
        let vertices_coords = new Map();
        for (let iw = 0; iw < width; iw++) {
            for (let ih = 0; ih < height; ih++) {
                vertices_coords.set(this.getVertexKey([iw, ih]), [this.x_offset + iw * this.x_step, this.y_offset + ih * this.y_step]);
            }
        }
        return vertices_coords;
    }
    drawNode(p, node, intensity = 100) {
        const nodeCoords = this.vertCoordinates.get(node);
        p.ellipse(nodeCoords[0], nodeCoords[1], this.x_step / 3, this.y_step / 3);
        p.fill(intensity);
    }
    drawEdge(p, node1, node2, edge, intensity = 100) {
        const node1Coords = this.vertCoordinates.get(node1);
        const node2Coords = this.vertCoordinates.get(node2);
        let direction = node1Coords[0] == node2Coords[0] ? "y" : "x";
        p.stroke(intensity);
        if (direction == "x") {
            p.strokeWeight(this.x_step / 2.5);
        }
        else {
            p.strokeWeight(this.y_step / 2.5);
        }
        p.line(node1Coords[0], node1Coords[1], node2Coords[0], node2Coords[1]);
    }
    setLabyrinthStart(p) {
        let startNode = this.getVertexKey(this.center);
        console.log(`Starting at ${startNode}`);
        let activeNodes = [];
        let visited = [];
        visited.push(startNode);
        const neighbors = this.adjacencyList.get(startNode);
        console.log(`Neighbors of ${startNode}: ${neighbors.map(neighbor => neighbor.node)}`);
        neighbors.forEach(neighbor => {
            console.log(`Drawing edge ${startNode} -> ${neighbor.node}`);
            const neighborCoords = this.vertCoordinates.get(neighbor.node);
            this.drawEdge(p, startNode, neighbor.node, neighbor);
            console.log(`Done drawing edge ${startNode} -> ${neighbor.node}`);
            activeNodes.push(neighbor.node);
            visited.push(neighbor.node);
        });
        return [activeNodes, visited];
    }
    drawPrimsLabyrinth(p) {
        let [activeNodes, visited] = this.setLabyrinthStart(p);
        let totalWight = 0;
        while (activeNodes.length > 0) {
            let activeNode = activeNodes[Math.floor(Math.random() * activeNodes.length)];
            let availableNeighbors = (this.adjacencyList.get(activeNode)
                .filter(neighbor => !visited.includes(neighbor.node)));
            if (availableNeighbors.length > 0) {
                let nextEdge = availableNeighbors.reduce((prev, curr) => {
                    return prev.weight < curr.weight ? prev : curr;
                });
                const activeNodeCoords = this.vertCoordinates.get(activeNode);
                const nextNodeCoords = this.vertCoordinates.get(nextEdge.node);
                this.drawEdge(p, activeNode, nextEdge.node, nextEdge);
                totalWight += nextEdge.weight;
                visited.push(nextEdge.node);
                activeNodes.push(nextEdge.node);
            }
            else {
                activeNodes = activeNodes.filter(node => node != activeNode);
            }
        }
    }
}
exports.SquareGrid = SquareGrid;
function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=graph.js.map