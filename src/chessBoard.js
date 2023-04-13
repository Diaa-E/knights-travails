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
            let row = Array(8).fill(null);
            board.push(row);
        }
    }

    return {board: board};
}