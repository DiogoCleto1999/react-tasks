import { combineReducers } from "redux";
import tasksReducer from "./Tasks/Reducer";

const rootReducer = combineReducers({ tasksReducer });

export default rootReducer;
