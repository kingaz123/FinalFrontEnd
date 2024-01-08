import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";

export const reducer = combineReducers({
  auth: authReducer,
});


