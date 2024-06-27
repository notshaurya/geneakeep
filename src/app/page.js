import AddNote from "@/components/add-note";
import NotesArea from "@/components/notes-area";
import Search from "@/components/search";
import { ScrollText } from "lucide-react";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <div className="w-full shadow-lg bg-slate-100 flex justify-between items-center h-fit py-3 px-4 rounded-lg gap-4">
                <div className="flex gap-2 justify-center items-center">
                    <ScrollText size={35} className="" stroke="orange" />
                    <h2 className=" text-lg sm:text-2xl font-bold text-indigo-600">Genea Keep</h2>
                </div>
                <div className="w-[45%] sm:w-[65%]">
                    <Search />
                </div>
                <a href="https://shauryasuman.netlify.app/" target="_blank">
                    <div className="rounded-full bg-white overflow-hidden size-10 hover:cursor-pointer">
                        <Image src={"/pic.jpg"} width={50} height={50} alt="myimage" />
                    </div>
                </a>
            </div>
            <h1 className="text-4xl font-bold text-indigo-600 ">
                Track your notes <span className="   font-extrabold text-indigo-600">better!</span>
            </h1>
            <AddNote />
            <NotesArea />
        </>
    );
}
