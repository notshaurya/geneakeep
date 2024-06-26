import { SEARCH_NOTE } from "@/lib/constants";

function searchReducer(state = "", action) {
    switch (action.type) {
        case SEARCH_NOTE:
            return action.payload;
        default:
            return state;
    }
}

export default searchReducer;
