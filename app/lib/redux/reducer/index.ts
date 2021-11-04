import { combineReducers } from "@reduxjs/toolkit";
import genre from "./genre";
import player from "./player";
import movies from "./movies";

export default combineReducers({ genre, player, movies });
