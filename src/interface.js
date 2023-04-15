"use strict";

import domUtility from "./dom.utility";

export function display()
{

    function initDisplay()
    {
        const body = document.querySelector("body");
        domUtility.addClasses(body, ["main-grid"]);
    }

    return {
        initDisplay: initDisplay,
    }
}