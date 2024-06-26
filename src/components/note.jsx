import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

function Note({ data }) {
    function handleDragStart(e) {
        e.dataTransfer.setData("note", JSON.stringify(data));
    }
    return (
        <div draggable onDragStart={handleDragStart} className="p-4 sm:p-6 active:cursor-move  ">
            <Card className={cn("h-fit overflow-hidden border-[1px] border-slate-400 text-clip", data.bgColor)}>
                <CardHeader>
                    <CardTitle className="text-sm font-bold">{data.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center flex-col items-start gap-4">
                        {data.text ||
                            data.list.map((item) => (
                                <div key={item.id} className="flex gap-4 justify-start items-center">
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
