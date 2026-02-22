import "./Header.css";

import Image from 'next/image';
import ZotRoomsIcon from '../../../public/zotrooms_icon.png';

import { useRef, useEffect } from 'react';

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

  return (
    <input ref={searchbarRef} type="text" placeholder="Search for keywords (Ctrl+K)..." />
  )
}

export default function Header() {
  return (
    <div className="header">
      <Image src={ZotRoomsIcon} alt="ZotRooms icon" />
      <h1>ZotRooms</h1>
      <Searchbar />
    </div>
  );
}
