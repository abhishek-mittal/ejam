import { combineReducers } from "redux";
import deployment  from "./../components/deployment/slice";

const reducer = combineReducers({
  deployment
});

export type RootState = ReturnType<typeof reducer>;
export default reducer;
