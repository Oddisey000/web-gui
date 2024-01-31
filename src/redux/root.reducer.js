// Imports from global libraries
import { combineReducers } from "redux";
// Imports custom reducers
import appReducer from "./app-reducer/app.reducer";

const rootReducer = combineReducers({
  appReducer: appReducer
});

export default rootReducer;