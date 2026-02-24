import "./Header.css";

import Image from 'next/image';
import ZotRoomsIcon from '../../../public/zotrooms_icon.png';

import { useRef, useEffect } from 'react';

import { setSearch } from '../../store/siteSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

function Searchbar() {
  const searchbarRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k' && searchbarRef.current) {
        e.preventDefault();
        searchbarRef.current.focus();
      }
    }

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    }
  }, []);

  const search = useAppSelector((state) => state.siteSlice.search);
  const dispatch = useAppDispatch();

  return (
    <input
      value={search}
      onChange={(e) => dispatch(setSearch({ newSearch: e.target.value }))}
      ref={searchbarRef}
      type="text"
      placeholder="Search AnteaterAPI for rooms (Ctrl+K)..."
    />
  )
}

export default function Header() {
  const dispatch = useAppDispatch();

  const resetSearch = () => {
    dispatch(setSearch({ newSearch: '' }));
  }

  return (
    <div className="header">
      <button onClick={resetSearch}>
        <Image loading="eager" src={ZotRoomsIcon} alt="ZotRooms icon" />
        <h1>ZotRooms</h1>
      </button>
      <Searchbar />
    </div>
  );
}
