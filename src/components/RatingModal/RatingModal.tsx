"use client"

import './RatingModal.css';

import { StudyRoom } from '../../types/types';
import { MdPeople, MdMonitor, MdLocationPin, MdLaunch } from 'react-icons/md';
import { MouseEvent, useState, useRef, useEffect } from 'react';
import Button from '../Button/Button';
import { RatingDispInteractive } from '../RatingDisp/RatingDisp';

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
  const { selectedRoomId, setSelectedRoomId } = useSelectedRoomId();

  const room = EXAMPLE_ROOM;

  const handleClose = () => {
    setSelectedRoomId(null);
  }

  const handleInnerClick = (event: MouseEvent) => {
    event.stopPropagation();
  }

  // TODO: add initial value if they've already reviewed it
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();
  }, []);

  return (
    <div onClick={handleClose} className="backdrop">
      <div onClick={handleInnerClick} className="modal-content">
        <div className="row">
          <h2 tabIndex={-1} autoFocus ref={titleRef}>{room.name}</h2>
          <a title="Open room URL" target="_blank" href={room.url}>
            <MdLaunch />
          </a>
        </div>
        <div className="loc-info">
          <i className="sub">
            <MdLocationPin />
            {room.location}
          </i>
          <span title={`Capacity: ${room.capacity} people`} className="pill"><MdPeople />{room.capacity}</span>
          {room.techEnhanced && <span title="Tech Enhanced" className="pill"><MdMonitor />TECH</span>}
        </div>
        <p>{room.description}</p>
        <p className="sub">Directions: {room.directions}</p>
        <div><hr /></div>
        <h3>Leave your rating!</h3>
        <RatingDispInteractive value={rating ?? undefined} setValue={(i) => setRating(i)} />
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Any comments?" />
        <div className="modal-buttons">
          <button onClick={handleClose} className="cancel">Cancel</button>
          <Button>Confirm</Button>
        </div>
      </div>
    </div>
  );
}
