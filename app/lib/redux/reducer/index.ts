import { combineReducers } from "@reduxjs/toolkit";
import genre from "./genre";
import player from "./player";
import shows from "./shows";

export default combineReducers({ genre, player, shows });
