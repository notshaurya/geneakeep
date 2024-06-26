import { SEARCH_NOTE } from "@/lib/constants";

function searchAction(payload) {
    return {
        type: SEARCH_NOTE,
        payload: payload,
    };
}

export default searchAction;
