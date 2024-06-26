import saveNoteReducer from "@/reducers/save-note-reducer";
import searchReducer from "@/reducers/search-reducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({ saveNoteReducer, searchReducer });

export default rootReducer;
