import { combineReducers } from "@reduxjs/toolkit";
import genre from "./genre";
import player from "./player";
import shows from "./shows";
import seasons from "./seasons";

export default combineReducers({ genre, player, shows, seasons });
