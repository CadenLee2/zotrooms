"use client";

import './StudyRoomCard.css';

import { StudyRoom } from '../../types/types';
import { MdLocationPin } from 'react-icons/md';
import { RatingDisp } from '../RatingDisp/RatingDisp';

import { useSelectedRoomId } from '../../hooks/hooks';

export default function StudyRoomCard(props: { studyRoom: StudyRoom }) {
  const room = props.studyRoom;

  const { setSelectedRoomId } = useSelectedRoomId();

  return (
    <button className="study-room-card" onClick={() => setSelectedRoomId(room.id)}>
      <h3>{room.name}</h3>
      <i className="sub">
        <MdLocationPin />
        {room.location}
      </i>
      <div>
        <RatingDisp value={3} />
      </div>
    </button>
  );
}
