"use strict";

import domUtility from "./dom.utility";
import logo from "../assets/images/logo.svg";

export function display()
{

    function initDisplay()
    {
        const body = document.querySelector("body");
        domUtility.addClasses(body, ["main-grid"]);

        body.append(header());
        body.append(controls());
        body.append(moveLog());
        body.append(board());
    }

    return {
        initDisplay: initDisplay,
    }
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

    const btnReset = document.createElement("button");
    domUtility.addClasses(btnReset, ["button-regular"]);
    btnReset.innerText = "Reset";

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
    
    const ulLog = document.createElement("ul");
    domUtility.addClasses(ulLog, ["log-list"]);
    
    divLog.append(hTitle, ulLog);

    return divLog;
}

function board()
{
    const divBoard = document.createElement("div");
    domUtility.addClasses(divBoard, ["board-wrapper"]);

    return divBoard;
}