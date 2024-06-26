"use client";

import { useDispatch, useSelector } from "react-redux";
import Note from "./note";
import Popover from "./popover";
import { useEffect } from "react";
import saveNoteAction from "@/actions/save-note-action";

function NotesArea() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.saveNoteReducer);

    function preventDefault(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        debugger;
        e.preventDefault();
        let item = JSON.parse(e.dataTransfer.getData("note"));
        // dispatch(saveNoteAction([...data, item]));
    }

    useEffect(() => {
        let notes = localStorage.getItem("data");
        dispatch(saveNoteAction(notes ? JSON.parse(notes) : []));
    }, []);

    return (
        <div className="flex flex-wrap justify-center items-start w-full" onDrop={handleDrop} onDragOver={preventDefault} onDragEnd={preventDefault}>
            {data?.length ? (
                data.map((item) => <Popover trigger={<Note data={item} />} item={item} className="min-w-[50%] max-w-[50%] sm:min-w-60 sm:max-w-60" />)
            ) : (
                <></>
            )}
        </div>
    );
}
export default NotesArea;
