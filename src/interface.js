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