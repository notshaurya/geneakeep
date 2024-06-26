"use client";
import searchAction from "@/actions/search-action";
import { useDispatch } from "react-redux";
import { Input } from "./input";

function Search() {
    const dispatch = useDispatch();

    function handleSearch(e) {
        dispatch(searchAction(e.target.value));
    }

    return <Input className="bg-slate-200 w-full" placeholder="Search" onInput={handleSearch} />;
}

export default Search;
