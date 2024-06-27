"use client";

import saveNoteAction from "@/actions/save-note-action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

function Note({ data }) {
    const notes = useSelector((state) => state.saveNoteReducer);
    const dispatch = useDispatch();
    function handleDragStart(e) {
        e.dataTransfer.setData("note", JSON.stringify(data));
    }

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

        let newNotes = [...notes];

        let dropIndex;
        let dragIndex;

        for (let index = 0; index < newNotes.length; index++) {
            if (dropIndex != undefined && dragIndex != undefined) break;
            const e = newNotes[index];
            if (e.id == dragId) {
                dragIndex = index;
            }
            if (e.id == dropId) {
                dropIndex = index;
            }
        }

        newNotes.splice(dragIndex, 1);
        newNotes.splice(dropIndex, 0, draggedData);
        dispatch(saveNoteAction(newNotes));
        localStorage.setItem("data", JSON.stringify(newNotes));
    }

    return (
        <div
            id="note"
            idnumber={data.id}
            draggable
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={preventDefault}
            onDragEnd={preventDefault}
            className="p-4 sm:p-6 active:cursor-move hover:cursor-default"
        >
            <Card className={cn("h-fit overflow-hidden border-[px] border-slate-400 text-clip hover:cursor-pointer ", data.bgColor)}>
                <CardHeader>
                    <CardTitle className="text-sm font-bold">{data.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center flex-col items-start gap-4">
                        {data.text ||
                            data.list.map((item) => (
                                <div key={item.id} className="flex gap-4 justify-start items-start border-b-[1px] p-2">
                                    <Checkbox checked={item.checked} className={cn("size-4 rounded-lg bg-white", item.checked && "")} />
                                    <Label className={cn("rounded-lg font-semibold", item.checked && "line-through")}>{item.value}</Label>
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
export default Note;
