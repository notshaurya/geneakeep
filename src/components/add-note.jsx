import { Input } from "./input";
import Popover from "./popover";

function AddNote() {
    return (
        <div className="flex justify-center items-center flex-col w-full">
            <Popover trigger={<Input className="max-w-xl border-blue-800" placeholder={"Take a note..."} />} className="max-w-xl w-full" />
        </div>
    );
}

export default AddNote;
