"use strict";

export function listGraph()
{
    let graph = new Map();

    function addNode(nodeValue)
    {
        graph.set(nodeValue, []);
    };

    function addEdge(node, destination)
    {
        graph.get(node).push(destination);
    };

    function findShortestPath(start, target)
    {
        if (!graph.has(target)) throw new Error("The value you are searching for does not exist in the graph.");
        if (!graph.has(start)) throw new Error("The starting node provided does not exist in the graph.");
        const pred = bfs(start);
        return reconstructPath(start, target, pred);
    }

    function bfs(start)
    {
        const q = [start];
        const visited = new Set();
        
        //init predecessor map
        let pred = new Map();
        for (const [key, value] of graph)
        {
            pred.set(key, null);
        }

        while (q.length > 0)
        {
            const currentNode = q.shift();
            const currentNeighs = graph.get(currentNode);

            for (const neigh of currentNeighs)
            {
                if (!visited.has(neigh))
                {
                    q.push(neigh);
                    visited.add(neigh);
                    pred.set(neigh, currentNode);
                }
            }
        }

        return pred;
    }

    function reconstructPath(start, target, pred)
    {
        const path = [target];

        while(target !== null && target !== start)
        {
            path.push(pred.get(target));
            target = pred.get(target); //move the target to the parent until it reaches the starting node
        }

        return path.reverse();
    }

    return {graph: graph, addNode, addEdge, findShortestPath};
}