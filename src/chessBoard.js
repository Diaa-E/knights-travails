"use strict";

export function boardFactory()
{
    let board = []
    let columnLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let rowNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

    initBoard();

    function initBoard()
    {
        for (let i = 0; i < 8; i++)
        {
            let row = Array(8).fill("☐");
            board.push(row);
        }
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

    return {
        board: board,
        logBoard: logBoard
    };
}