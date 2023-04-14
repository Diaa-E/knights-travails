"use strict";

import { listGraph } from "./graph";

export function boardFactory()
{
    const knight = "K";
    let knightPos = [0, 0];
    const visited = "V";
    let board = [];
    let columnLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let rowNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

    const graphMoves = listGraph();

    initBoard();
    buildGraph();
    knightsTravails();

    function knightsTravails()
    {
        for (let x = 0; x < 8; x++)
        {
            for (let y = 0; y < 8; y++)
            {
                if (board[y][x] === knight || board[y][x] === visited) continue; //skip visited squares

                const path = getPath(knightPos, [x, y]);
                movePath(path);
            }
        }
    }

    function getPath(start, end)
    {
        return graphMoves.findShortestPath(posToString(start), posToString(end));
    }

    function movePath(path)
    {
        path.forEach(step => {

            step = stringToPos(step);
            move(step[0], step[1]);
            logBoard();
        })
    }

    function stringToPos(posString)
    {
        return posString.split(",").map(x => parseInt(x));
    }

    function posToString(pos)
    {
        return pos.join(",");
    }

    function initBoard()
    {
        for (let i = 0; i < 8; i++)
        {
            let row = Array(8).fill("☐");
            board.push(row);
        }

        board[knightPos[1]][knightPos[0]] = knight; //place knight at starting position
    }

    function logBoard()
    {
        for (let i = 0; i < 8; i++)
        {
            const row = [];

            for (let j = 0; j < 8; j++)
            {
                if (j === 0) row.push(`${rowNumbers[i]} |`);
                row.push(`${board[i][j]} `);
            }

            console.log(row.join(" "));
        }
  
        console.log(`  | ${columnLetters.join("   ")}`)
    }

    function move(x, y, mark = true)
    {
        if (x > 7 || y > 7) throw new Error(`Illegal move [${x}, ${y}]: out of board bounds`)

        board[y][x] = knight;
        if (mark === true) markVisited(knightPos[0], knightPos[1]);
        knightPos = [x, y];
    }

    function markVisited(x, y)
    {
        board[y][x] = visited;
    }

    function getNextMoves(position = knightPos)
    {
        const patterns = [
            [2, 1],
            [-2, 1],
            [2, -1],
            [-2, -1],
            [1, 2],
            [-1, 2],
            [1, -2],
            [-1, -2],
        ];

        const nextMoves = [];

        patterns.forEach(pattern => {

            let currentMove = [0, 0];
            currentMove[0] = position[0] + pattern[0];
            currentMove[1] = position[1] + pattern[1];

            //exclude illegal moves
            if (!(currentMove[0] > 7 || currentMove[1] > 7 || currentMove[0] < 0 || currentMove[1] < 0))
            {
                nextMoves.push(currentMove);
            }
        });

        return nextMoves;
    }

    function buildGraph()
    {
        for (let i = 0; i < 8; i++)
        {
            for (let j = 0; j < 8; j++)
            {
                let neightbors = getNextMoves([i, j]);
                graphMoves.addNode(posToString([i, j]));
                
                neightbors.forEach(neighbor => {

                    graphMoves.addEdge(posToString([i, j]), posToString(neighbor))
                });
            }
        }
    }

    return {
        board: board,
        logBoard: logBoard,
        move: move,
        getNextMoves: getNextMoves,
    };
}