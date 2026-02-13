import "./page.css";

import Header from '../components/Header/Header';
import StudyRoomList from '../components/StudyRoomList/StudyRoomList';

import { StudyRoom } from '../types/types';

const EXAMPLE_ROOM: StudyRoom = {
  id: "abc",
  name: "Science 400",
  capacity: 4,
  location: "Science Library",
  description: "a room",
  directions: "down the hall and to the left",
  techEnhanced: true,
  url: "https://example.com/",
  slots: []
};

export default function Home() {
  return (
    <div className={`page`}>
      <Header />
      <div className="main-content">
        <h2>All Rooms</h2>
        <StudyRoomList studyRooms={[EXAMPLE_ROOM, EXAMPLE_ROOM]} />
      </div>
    </div>
  );
}
