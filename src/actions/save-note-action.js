import { SAVE_NOTE } from "@/lib/constants";

function saveNoteAction(note) {
    return {
        type: SAVE_NOTE,
        payload: note,
    };
}

export default saveNoteAction