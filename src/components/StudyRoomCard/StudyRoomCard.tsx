"use client";

import './StudyRoomCard.css';

import { StudyRoom } from '../../types/types';
import { MdLocationPin } from 'react-icons/md';
import { RatingDisp } from '../RatingDisp/RatingDisp';

import { useSelectedRoomId } from '../../helpers/hooks';

import { useAppSelector } from '../../store/hooks';

export default function StudyRoomCard(props: { studyRoom: StudyRoom }) {
  const room = props.studyRoom;

  const correspondingReview = useAppSelector((state) => (
    room.id in state.siteSlice.reviews ? state.siteSlice.reviews[room.id] : undefined
  ));

  const { setSelectedRoomId } = useSelectedRoomId();

  return (
    <button className="study-room-card" onClick={() => setSelectedRoomId(room.id)}>
      <h3>{room.name}</h3>
      <i className="sub">
        <MdLocationPin />
        {room.location}
      </i>
      <div>
        <RatingDisp value={correspondingReview?.rating} />
      </div>
    </button>
  );
}
