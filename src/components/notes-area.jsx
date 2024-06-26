"use client";

import { useDispatch, useSelector } from "react-redux";
import Note from "./note";
import Popover from "./popover";
import { useEffect } from "react";
import saveNoteAction from "@/actions/save-note-action";

function NotesArea() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.saveNoteReducer);

    useEffect(() => {
        let notes = localStorage.getItem("data");
        dispatch(saveNoteAction(notes ? JSON.parse(notes) : []));
    }, []);

    return (
        <div className="flex flex-wrap gap-4 sm:gap-10 justify-start sm:justify-center items-start w-full">
            {data?.length ? data.map((item) => <Popover trigger={<Note data={item} />} item={item} />) : <></>}
        </div>
    );
}
export default NotesArea;
