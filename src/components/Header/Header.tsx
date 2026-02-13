import "./Header.css";

import Image from 'next/image';
import ZotRoomsIcon from '../../../public/zotrooms_icon.png';

export default function Header() {
  return (
    <div className="header">
      <Image src={ZotRoomsIcon} alt="ZotRooms icon" />
      <h1>ZotRooms</h1>
    </div>
  );
}
