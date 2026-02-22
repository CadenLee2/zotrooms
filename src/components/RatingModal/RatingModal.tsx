"use client"

import './RatingModal.css';

import { StudyRoom } from '../../types/types';
import { MdStarOutline, MdStar, MdLocationPin } from 'react-icons/md';
import { MouseEvent } from 'react';
import Button from '../Button/Button';

import { useSelectedRoomId } from '../../hooks/hooks';

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

export default function StudyRoomCard() {
  const room = EXAMPLE_ROOM;

  const { selectedRoomId, setSelectedRoomId } = useSelectedRoomId();

  const handleOuterClick = () => {
    setSelectedRoomId(null);
  }

  const handleInnerClick = (event: MouseEvent) => {
    event.stopPropagation();
  }

  return (
    <div onClick={handleOuterClick} className="backdrop">
      <div onClick={handleInnerClick} className="modal-content">
        <h2>{room.name}</h2>
        <Button>Confirm</Button>
      </div>
    </div>
  );
}
