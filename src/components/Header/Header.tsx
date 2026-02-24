import "./Header.css";

import Image from "next/image";
import ZotRoomsIcon from "../../../public/zotrooms_icon.png";

import { useRef, useEffect, useState, KeyboardEventHandler } from "react";

import { setSearch } from "@/store/siteSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

import { MdSearch } from "react-icons/md";

function Searchbar(props: { input: string, setInput(s: string): void }) {
  const { input, setInput } = props;

  const searchbarRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k" && searchbarRef.current) {
        e.preventDefault();
        searchbarRef.current.focus();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    }
  }, []);

  const dispatch = useAppDispatch();

  const submitSearch = () => {
    dispatch(setSearch({ newSearch: input }));
  }

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      submitSearch();
    }
  }

  const handleChange = (newValue: string) => {
    setInput(newValue);
    if (newValue === "") {
      dispatch(setSearch({ newSearch: newValue }));
    }
  }

  return (
    <div className="searchbar">
      <input
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyUp={handleKeyUp}
        ref={searchbarRef}
        type="text"
        placeholder="Search AnteaterAPI for rooms (Ctrl+K)..."
      />
      {input && <button title="Submit search" onClick={submitSearch}><MdSearch /></button>}
    </div>
  )
}

export default function Header() {
  const dispatch = useAppDispatch();

  const search = useAppSelector((state) => state.siteSlice.search);

  const [input, setInput] = useState(search);

  const resetSearch = () => {
    dispatch(setSearch({ newSearch: "" }));
    setInput("");
  }

  return (
    <div className="header">
      <button className="logo" onClick={resetSearch}>
        <Image loading="eager" src={ZotRoomsIcon} alt="ZotRooms icon" />
        <h1>ZotRooms</h1>
      </button>
      <Searchbar input={input} setInput={setInput} />
    </div>
  );
}
