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
    const search = useSelector((state) => state.searchReducer);

    function preventDefault(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        let dropNoteElement;
        let draggedData = JSON.parse(e.dataTransfer.getData("note"));

        let element = e.target;
        while (element) {
            if (element.id == "note") {
                dropNoteElement = element;
                break;
            }
            element = element.parentNode;
        }

        if (!dropNoteElement) return;

        let dropId = Number(dropNoteElement.getAttribute("idnumber"));
        let dragId = draggedData.id;

        if (dropId == dragId) return;

        let newData = [...data];

        let dropIndex;
        let dragIndex;

        for (let index = 0; index < newData.length; index++) {
            const e = newData[index];
            if (e.id == dragId) {
                dragIndex = index;
            }
            if (e.id == dropId) {
                dropIndex = index;
            }
        }

        newData.splice(dragIndex, 1);
        newData.splice(dropIndex, 0, draggedData);
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
                data
                    .filter((item) => search == "" || (item.title?.toLowerCase() ?? "").includes(search.toLowerCase()))
                    .map((item) => (
                        <Popover
                            key={item.id}
                            trigger={<Note data={item} />}
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
