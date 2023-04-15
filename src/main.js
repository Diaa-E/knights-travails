"use strict";

import { boardFactory } from "./chessBoard";
import "./style.css";

const newBoard = boardFactory();
newBoard.goCrazy();