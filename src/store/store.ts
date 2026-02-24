import { configureStore, combineReducers } from "@reduxjs/toolkit";
import siteSlice from "./siteSlice";

const rootReducer = combineReducers({siteSlice})

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = (typeof store)["dispatch"];
