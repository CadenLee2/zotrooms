"use client"

import './RatingModal.css';

import { StudyRoom } from '../../types/types';
import { MdStarOutline, MdStar, MdLocationPin } from 'react-icons/md';
import { MouseEvent } from 'react';
import Button from '../Button/Button';

export default function StudyRoomCard(props: { studyRoom: StudyRoom }) {
  const room = props.studyRoom;

  const handleOuterClick = () => {
    // TODO: close
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
