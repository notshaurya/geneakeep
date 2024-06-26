"use client";
import saveNoteAction from "@/actions/save-note-action";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/dialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

function Popover({ trigger, className, item }) {
    const dispatch = useDispatch();
    const [content, setContent] = useState({});
    const [inputType, setInputType] = useState("text");
    const [bgColor, setBgColor] = useState("bg-white");
    const notes = useSelector((state) => state.saveNoteReducer);

    function allNotEmpty(list) {
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            if (element.value != "") {
                return true;
            }
        }
        return false;
    }

    function handleOpenChange(isOpening) {
        if (!isOpening && content) {
            // If there is content present, save it
            if (content) {
                if (
                    content &&
                    (content.title ||
                        (inputType === "text" && content.text) ||
                        (content.list?.length && inputType === "list" && allNotEmpty(content.list)))
                ) {
                    let newData = [...notes];
                    let newContent = { ...content };
                    newContent.bgColor = bgColor;
                    if (inputType === "text") {
                        newContent.isText = true;
                        newContent.isList = false;
                        newContent.list = [];
                    } else if (inputType === "list") {
                        newContent.isList = true;
                        newContent.isText = false;
                        newContent.text = "";
                    }
                    if (newContent.id) {
                        const index = newData.findIndex((item) => item.id === newContent.id);
                        newData[index] = newContent;
                    } else {
                        newContent.id = Date.now();
                        newData.push(newContent);
                    }

                    newContent.list.sort((a, b) => {
                        if (a.checked === b.checked) {
                            return 0;
                        } else if (a.checked) {
                            return 1;
                        } else {
                            return -1;
                        }
                    });
                    dispatch(saveNoteAction(newData));
                    localStorage.setItem("data", JSON.stringify(newData));
                } else {
                    let newData = [...notes];
                    const index = newData.findIndex((item) => item.id === content.id);
                    newData.splice(index, 1);
                    dispatch(saveNoteAction(newData));
                    localStorage.setItem("data", JSON.stringify(newData));
                }
            }

            // Setting default values on close
            setContent({});
            setInputType("text");
            setBgColor("bg-white");
        }
    }

    function handleRadioChange(value) {
        setInputType(value);
    }

    function handleListValueChange(e, id) {
        let newList = [...content.list];
        let index = newList.findIndex((item) => item.id === id);
        newList[index] = { ...newList[index], value: e.target.value };

        setContent({ ...content, list: newList });
    }

    function handleAddList() {
        let newObj = { ...content };
        newObj.list = [...(newObj.list || []), { checked: false, value: "", id: Date.now() }];
        setContent(newObj);
    }

    function handleCheckChange(checked, id) {
        console.log(checked);
        let newList = [...content.list];
        let index = newList.findIndex((item) => item.id === id);
        newList[index] = { ...newList[index], checked };
        setContent({ ...content, list: newList });
    }

    function handleColorChange(color, id) {
        setBgColor(color);
    }

    useEffect(() => {
        if (!item) setContent({ isText: true, text: "", isList: false, list: [], bgColor: "bg-white" });
        else setContent(item);
        setInputType(item?.isList ? "list" : "text");
        setBgColor(item?.bgColor || "bg-white");
    }, [item]);

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger className={className}>{trigger}</DialogTrigger>
            <DialogContent className={cn("h-fit p-4 sm:p-6 w-[300px] sm:w-full rounded-lg ", bgColor)}>
                <DialogHeader>
                    <Input
                        className="max-w-xl"
                        placeholder={"Title"}
                        onChange={(e) => setContent({ ...content, title: e.target.value })}
                        value={content?.title}
                    />
                </DialogHeader>
                <RadioGroup defaultValue={inputType} onValueChange={handleRadioChange}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="text" id="r1" />
                        <Label htmlFor="r1">Plain Text</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="list" id="r3" />
                        <Label htmlFor="r3">List</Label>
                    </div>
                </RadioGroup>
                {inputType == "text" && (
                    <Textarea className="h-[200px]" onChange={(e) => setContent({ ...content, text: e.target.value })} value={content?.text} />
                )}
                {inputType == "list" && (
                    <div className="flex flex-col gap-2 h-[200px] overflow-auto rounded-md border-2 border-white p-3 bg-white">
                        {content.list && content.list.length ? (
                            content.list.map((item) => (
                                <div key={item.id} className="flex gap-2 justify-center items-center">
                                    <Checkbox
                                        checked={item.checked}
                                        onCheckedChange={(checked) => handleCheckChange(checked, item.id)}
                                        className={cn("size-6 rounded-lg bg-white", item.checked && "")}
                                    />
                                    <Input
                                        value={item.value}
                                        onInput={(e) => handleListValueChange(e, item.id)}
                                        onKeyDown={(e) => e.key == "Enter" && e.target.value != "" && handleAddList()}
                                        className={cn("rounded-lg ", item.checked && "line-through")}
                                    />
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                        <Button
                            variant="outline"
                            className={cn("max-w-40 w-fit flex justify-center items-center px-4 gap-2", bgColor)}
                            onClick={handleAddList}
                        >
                            <Plus className="" />
                            Add List
                        </Button>
                    </div>
                )}

                <DialogFooter className="flex flex-col sm:flex-row sm:gap-4 justify-center sm:justify-between items-center w-full">
                    <div className="flex justify-center sm:justify-start items-center gap-2 w-full">
                        {[
                            "bg-white",
                            "bg-blue-300",
                            "bg-pink-300",
                            "bg-purple-300",
                            "bg-yellow-300",
                            "bg-green-300",
                            "bg-orange-300",
                            "bg-red-300",
                        ].map((color, index) => (
                            <Button
                                key={index}
                                className={cn("size-6 p-0 rounded-full border-2 border-black", color)}
                                onClick={() => handleColorChange(color)}
                            ></Button>
                        ))}
                    </div>
                    <DialogClose className="">
                        <Button variant="outline" className="bg-black text-white mt-4 sm:mt-0">
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export default Popover;
