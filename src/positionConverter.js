"use strict";

export function stringToPos(posString)
{
    return posString.split(",").map(x => parseInt(x));
}

export function posToString(pos)
{
    return pos.join(",");
}