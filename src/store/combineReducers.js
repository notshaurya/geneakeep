import { combineReducers } from "redux";
import saveNoteReducer from "@/reducers/save-note-reducer";
const rootReducer = combineReducers({ saveNoteReducer });

export default rootReducer;
