import AddNote from "@/components/add-note";
import NotesArea from "@/components/notes-area";

export default function Home() {
    return (
        <>
            <h1 className="text-4xl font-bold text-blue-500">
                Track your notes with <span className="underline underline-offset-8 text-blue-800 font-extrabold">Genea Keep</span>
            </h1>
            <AddNote />
            <NotesArea />
        </>
    );
}
