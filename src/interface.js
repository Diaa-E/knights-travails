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
        body.append(controls())
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