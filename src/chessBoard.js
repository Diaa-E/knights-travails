"use strict";

import { listGraph } from "./graph";
import { display } from "./interface";

export function boardFactory()
{   
    const knight = "K";
    let knightPos = getRandomPosition();
    const visited = "V";
    const empty = "☐";
    let board = [];
    let columnLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let rowNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    const graphMoves = listGraph();

    const boardChangeEvent = new CustomEvent("boardChange", {
        bubbles: true,
        detail: {
            board: board,
            knight: knight,
            visited: visited,
            empty: empty,
        }
    });

    function startGame()
    {
        const newDisplay = display();
    
        initBoard();
        buildGraph();
        logBoard();
        newDisplay.initDisplay();
        document.dispatchEvent(boardChangeEvent);
    }

    function getRandomPosition()
    {
        return [Math.round(Math.random()*7), Math.round(Math.random()*7)];
    }

    function goCrazy() //visit all squares
    {
        for (let y = 0; y < 8; y++)
        {
            for (let x = 0; x < 8; x++)
            {
                if (!(board[y][x] === knight || board[y][x] === visited)) //skip visited squares
                {
                    const path = getPath(knightPos, [x, y]);
                    movePath(path);
                }
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
            let row = Array(8).fill(empty);
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
        if (knightPos[0] === x && knightPos[1] === y) return; 
        //fix knight getting stuck for 1 turn because it move to where it already is

        if (mark === true) markVisited(knightPos[0], knightPos[1]);
        board[y][x] = knight;
        knightPos = [x, y];
        logBoard();

        document.dispatchEvent(boardChangeEvent);
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
        goCrazy: goCrazy,
        startGame: startGame
    };
}