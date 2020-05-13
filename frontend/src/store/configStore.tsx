import { configureStore, Action } from "@reduxjs/toolkit";
import reducer, { RootState } from "./service";
import { ThunkAction } from "redux-thunk";


const store = configureStore({
    reducer
})

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export default store;