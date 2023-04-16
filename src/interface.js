"use strict";

import domUtility from "./dom.utility";
import { posToString, stringToPos } from "./positionConverter";
import logo from "../assets/images/logo.svg";

export function display()
{
    const divBoardSquares = [];
    const ulLog = document.createElement("ul");

    document.addEventListener("log", e => {

        logMove(e.detail.start, e.detail.end);
    });

    function initDisplay()
    {
        const body = document.querySelector("body");
        domUtility.addClasses(body, ["main-grid"]);

        body.append(
            header(),
            controls(),
            board(),
            moveLog(),
        );

        document.addEventListener("boardChange", e => {

            updateDisplay(
                e.detail.board,
                e.detail.knight,
                e.detail.visited,
                e.detail.empty
                );
        })
    }

    function updateDisplay(gameBoard, knight, visited, empty)
    {
        for (let y = 0; y < 8; y++)
        {
            for (let x = 0; x < 8; x++)
            {
                if (gameBoard[y][x] === empty)
                {
                    stripSquare(divBoardSquares[y][x]);
                }
                else if (gameBoard[y][x] === knight)
                {
                    stripSquare(divBoardSquares[y][x]);
                    domUtility.addClasses(divBoardSquares[y][x], ["sq-knight"]);
                }
                else if (gameBoard[y][x] === visited)
                {
                    stripSquare(divBoardSquares[y][x]);
                    domUtility.addClasses(divBoardSquares[y][x], ["sq-visited"]);
                }
            }
        }
    }

    function logMove(start, end)
    {
        const liLogEntry = document.createElement("li");
        liLogEntry.innerText = formatMove(start, end);
        ulLog.append(liLogEntry);
    }

    function formatMove(start, end)
    {
        const letters = ["A", "B", "C", "D", "E", "F", "G", "H"]
        return `From ${letters[start[0]]}${start[1] + 1} to ${letters[end[0]]}${end[1] + 1}`;
    }

    function stripSquare(square)
    {
        domUtility.removeClasses(square, ["sq-knight", "sq-visited"]);
    }

    function header()
    {
        const imgLogo = new Image();
        imgLogo.src = logo;
        domUtility.addClasses(imgLogo, ["logo"]);

        return imgLogo;
    }

    function controls()
    {
        const divWrapper = document.createElement("div");
        domUtility.addClasses(divWrapper, ["controls-wrapper"]);

        const btnGoCrazy = document.createElement("button");
        domUtility.addClasses(btnGoCrazy, ["button-regular", "button-special"]);
        btnGoCrazy.innerText = "GO CRAZY!";

        const btnClear = document.createElement("button");
        domUtility.addClasses(btnClear, ["button-regular"]);
        btnClear.innerText = "Clear Log";

        btnClear.addEventListener("click", () => {

            ulLog.innerHTML = "";
        })

        const btnReset = document.createElement("button");
        domUtility.addClasses(btnReset, ["button-regular"]);
        btnReset.innerText = "Reset";

        btnReset.addEventListener("click", (e) => {

            const eventReset = new CustomEvent("reset", {
                bubbles: true,
            });

            e.target.dispatchEvent(eventReset);
        });

        divWrapper.append(btnGoCrazy, btnClear, btnReset);

        return divWrapper;
    }

    function moveLog()
    {
        const divLog = document.createElement("div");
        domUtility.addClasses(divLog, ["log-wrapper"]);

        for (let i = 1; i < 10; i++)
        {
            const div = document.createElement("div");
            domUtility.addClasses(div, [`log${i}`, "log"]);
            divLog.append(div);
        }

        const hTitle = document.createElement("h2");
        domUtility.addClasses(hTitle, ["log-title"]);
        hTitle.innerText = "Moves Log"
        
        domUtility.addClasses(ulLog, ["log-list"]);
        
        divLog.append(hTitle, ulLog);

        return divLog;
    }

    function board()
    {
        const divBoard = document.createElement("div");
        domUtility.addClasses(divBoard, ["board-wrapper"]);

        const divCheckers = document.createElement("div");
        domUtility.addClasses(divCheckers, ["checkers-wrapper"]);
        divBoard.append(divCheckers);

        const checkers = ["sq-white", "sq-black"];
        let currentBlack = true;

        for (let y = 0; y < 8; y++)
        {
            currentBlack = !currentBlack; //invert after each row
            const row = [];

            for (let x = 0; x < 8; x++)
            {
                const divSquare = document.createElement("div");

                divSquare.setAttribute("data-XY", posToString([x, y]));

                divSquare.addEventListener("click", e => {

                    const moveEvent = new CustomEvent("move", {
                        bubbles: true,
                        detail: {
                            end: stringToPos(e.target.getAttribute("data-XY")),
                        }
                    });

                    divSquare.dispatchEvent(moveEvent);
                });

                if (currentBlack)
                {
                    domUtility.addClasses(divSquare, [checkers[1]]);
                }
                else
                {
                    domUtility.addClasses(divSquare, [checkers[0]]);
                }

                row.push(divSquare);
                currentBlack = !currentBlack
                divCheckers.append(divSquare);
            }

            divBoardSquares.push(row);
        }

        return divBoard;
    }

    return {
        initDisplay: initDisplay,
    }
}