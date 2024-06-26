import AddNote from "@/components/add-note";
import NotesArea from "@/components/notes-area";

export default function Home() {
    return (
        <>
            <h1 className="text-4xl font-bold text-indigo-600">
                Genea Keep: Track your notes <span className="   font-extrabold text-indigo-600">better !</span>
            </h1>
            <AddNote />
            <NotesArea />
        </>
    );
}
