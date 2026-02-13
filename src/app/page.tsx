import "./page.css";

import Header from '../components/Header/Header';
import StudyRoomCard from '../components/StudyRoomCard/StudyRoomCard';

import { StudyRoom } from '../types/types';

import { Comic_Neue } from 'next/font/google';

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

const font = Comic_Neue({weight:"400"});

export default function Home() {
  return (
    <div className={`page ${font.className}`}>
      <Header />
      <h2>All Rooms</h2>
      <StudyRoomCard studyRoom={EXAMPLE_ROOM} />
    </div>
  );
}
