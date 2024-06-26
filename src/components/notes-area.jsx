"use client";

import saveNoteAction from "@/actions/save-note-action";
import { ScrollText } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Note from "./note";
import Popover from "./popover";

function NotesArea() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.saveNoteReducer);

    function preventDefault(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        let noteElement;
        let item = JSON.parse(e.dataTransfer.getData("note"));

        let element = e.target;
        while (element) {
            if (element.id == "note") {
                noteElement = element;
                break;
            }
            element = element.parentNode;
        }

        if (!noteElement) return;

        let dropId = noteElement.getAttribute("idNumber");
        let dragId = item.id;

        if (dropId == dragId) return;

        let newData = [...data];

        let dropIndex;
        let dragIndex;

        for (let index = 0; index < newData.length; index++) {
            const element = newData[index];
            if (element.id == dragId) {
                dragIndex = index;
            }
            if (element.id == dropId) {
                dropIndex = index;
            }
        }

        newData.splice(dragIndex, 1);
        newData.splice(dropIndex, 0, item);
        dispatch(saveNoteAction(newData));
    }

    useEffect(() => {
        let notes = localStorage.getItem("data");
        dispatch(saveNoteAction(notes ? JSON.parse(notes) : []));
    }, []);

    return (
        <div
            id="notes-area"
            className="flex flex-wrap justify-center items-start w-full"
            onDrop={handleDrop}
            onDragOver={preventDefault}
            onDragEnd={preventDefault}
        >
            {data?.length ? (
                data.map((item) => (
                    <Popover
                        trigger={<Note data={item} className="" />}
                        item={item}
                        className="min-w-[50%] max-w-[50%] sm:min-w-60 sm:max-w-60 hover:cursor-none"
                    />
                ))
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <ScrollText size={300} className="" stroke="#cbd5e1" />
                    <p className="text-3xl text-slate-400 font-bold">Notes you add appear here !</p>
                </div>
            )}
        </div>
    );
}
export default NotesArea;
