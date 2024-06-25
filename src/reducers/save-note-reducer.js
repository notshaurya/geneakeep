import { SAVE_NOTE } from "@/lib/constants";

function saveNoteReducer(state = [], action) {
    switch (action.type) {
        case SAVE_NOTE:
            return [...action.payload];
        default:
            return state;
    }
}

export default saveNoteReducer;
