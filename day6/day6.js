const fs = require('fs');
const input = fs
    .readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .map(e => e.split(')'));

const orbits = {};
for (const orbit of input) {
    if (orbits.hasOwnProperty(orbit[0])) {
        orbits[orbit[0]].push(orbit[1]);
    } else {
        orbits[orbit[0]] = [orbit[1]];
    }
}

class Node {
    constructor(name, nest, parent = undefined) {
        this.name = name;
        this.children = [];
        this.nest = nest;
        this.parent = parent;
    }

    addChild(name) {
        this.children.push(new Node(name, this.nest + 1, this));
        return this.nest + 1;
    }
}

const foundNodes = [];
let totalNest = 0;
const graph = new Node('COM', 0);

const addChildren = (node, namesToAdd) => {
    let total = 0;
    for (const name of namesToAdd) {
        total += node.addChild(name);
    }
    return total;
};

const recursion = node => {
    for (const currentNode of node.children) {
        if (orbits[currentNode.name]) {
            totalNest += addChildren(currentNode, orbits[currentNode.name]);
        }

        if (currentNode.name === 'SAN' || currentNode.name === 'YOU') {
            foundNodes.push(currentNode);
        }

        recursion(currentNode);
    }
};

function part1() {
    totalNest += addChildren(graph, orbits[graph.name]);
    recursion(graph);
    return totalNest;
}

function part2() {
    const parentsYOU = [];
    const parentsSAN = [];
    let sharedParent;

    let currentParent = foundNodes[0].parent;
    while (currentParent) {
        parentsYOU.push(currentParent);
        currentParent = currentParent.parent;
    }

    currentParent = foundNodes[1].parent;
    while (currentParent) {
        parentsSAN.push(currentParent);
        currentParent = currentParent.parent;
    }

    for (const parent of parentsYOU) {
        if (parentsSAN.some(e => e.name === parent.name)) {
            sharedParent = parent;
            break;
        }
    }

    return (
        foundNodes[0].nest -
        1 -
        sharedParent.nest +
        foundNodes[1].nest -
        1 -
        sharedParent.nest
    );
}

console.log(part1());
console.log(part2());
