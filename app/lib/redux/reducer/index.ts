import { combineReducers } from "@reduxjs/toolkit";
import genre from "./genre";
import player from "./player";

export default combineReducers({ genre, player });
