"use strict";

import { boardFactory } from "./chessBoard";
import { display } from "./interface";
import "./style.css";

const newBoard = boardFactory();
const newDisplay = display();
newDisplay.initDisplay();
newBoard.startGame();